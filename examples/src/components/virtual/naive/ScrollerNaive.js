import Scroller from '../Scroller'

export default class ScrollerNaive extends Scroller {
    constructor(reportData) {
        super(reportData)
    }

    renderRows (scrollTop, init) {

        if (init) {
            super.renderRows(this.scrollTop, true)
            return
        }

        const indexes = this.indexes(scrollTop)
        const diff = indexes.stop - this.prevIndexes.stop
        const offset = this.rowsFitScreen

        if (diff > 0) {
            const from = this.prevIndexes.stop
            const to = from + diff

            for (let y = from; y < to; y++) {
                this.switchRows(y, -offset)
            }

            this.prevIndexes = indexes
        } else if (diff < 0) {
            const from = this.prevIndexes.start - 1
            const to = from + diff

            for (let y = from; y > to; y--) {
                this.switchRows(y, offset)
            }

            this.prevIndexes = indexes
        }

        return false
    }

    switchRows (y, offset) {

        let createFixedRow = function (element, x) {
            const text = this.getRowData(y, x)
            
            let node = document.createElement('div')
            node.classList.add('cell', 'cell--fixed')
            node = this.updateCell(node, text, y, x)
            node = this.positionCell(node, y, x)
            this.DOM.cellsFixed.appendChild(node)
        }

        let createDynamicRow = function (element, index) {
            const x = index + this.headers.fixed.length
            const text = this.getRowData(y, x)
            
            let node = document.createElement('div')
            node.classList.add('cell')
            node = this.updateCell(node, text, y, x)
            node = this.positionCell(node, y, x)
            this.DOM.cellsDynamic.appendChild(node)
        }

        this.headers.fixed.map(createFixedRow.bind(this))
        this.headers.dynamic.map(createDynamicRow.bind(this))

        this.deleteRows(y, offset)
    }

    deleteRows (y, offset) {
        let deleteFixedRow = this.DOM.cellsFixed.querySelectorAll(`[data-row-id="${y + offset}"]`)
        let deleteDynamicRow = this.DOM.cellsDynamic.querySelectorAll(`[data-row-id="${y + offset}"]`)

        let deleteFixedRowFn = function (element) {
            this.DOM.cellsFixed.removeChild(element)
        }

        let deleteDynamicRowFn = function (element) {
            this.DOM.cellsDynamic.removeChild(element)
        }

        deleteFixedRow.forEach(deleteFixedRowFn.bind(this))
        deleteDynamicRow.forEach(deleteDynamicRowFn.bind(this))
    }
}