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
        let fragmentFixed = document.createDocumentFragment()
        let fragmentDynamic = document.createDocumentFragment()
        let rowFixed = this.cloneRow(y)
        let rowDynamic = this.cloneRow(y)

        let createFixedRow = function (element, x) {
            const text = this.getRowData(y, x)
            let node = this.cloneCell(y, x, 'cell--fixed')
            node = this.updateCell(node, text, y, x)
            node = this.positionCell(node, y, x)
            rowFixed.appendChild(node)
        }
        

        let createDynamicRow = function (element, index) {
            const x = index + this.headers.fixed.length
            const text = this.getRowData(y, x)
            let node = this.cloneCell(y, x)
            node = this.updateCell(node, text, y, x)
            node = this.positionCell(node, y, x)
            rowDynamic.appendChild(node)
        }

        this.headers.fixed.map(createFixedRow.bind(this))
        this.headers.dynamic.map(createDynamicRow.bind(this))

        fragmentFixed.appendChild(rowFixed)
        fragmentDynamic.appendChild(rowDynamic)

        this.DOM.cellsFixed.appendChild(fragmentFixed)
        this.DOM.cellsDynamic.appendChild(fragmentDynamic)

        const deleteFixedRow = this.DOM.cellsFixed.querySelector(`.row[data-row-id="${y + offset}"]`)
        const deleteDynamicRow = this.DOM.cellsDynamic.querySelector(`.row[data-row-id="${y + offset}"]`)

        this.DOM.cellsFixed.removeChild(deleteFixedRow)
        this.DOM.cellsDynamic.removeChild(deleteDynamicRow)
    }

    init () {
        for (let y = 0; y < this.rowsFitScreen; y++) {
            let rowFixed = this.cloneRow(y)
            let rowDynamic = this.cloneRow(y)

            this.headers.fixed.forEach((element, x) => {
                const elem = this.cloneCell(y,x , 'cell--fixed')
                this.rowNodes[y][x] = elem
                rowFixed.appendChild(elem)
                this.DOM.cellsFixed.appendChild(rowFixed)
            });

            this.headers.dynamic.forEach((element, x) => {
                const elem = this.cloneCell(y, this.headers.fixed.length + x)
                this.rowNodes[y][this.headers.fixed.length + x] = elem
                rowDynamic.appendChild(elem)
                this.DOM.cellsDynamic.appendChild(rowDynamic)
            });
        }

        const indexes = this.indexes(this.scrollTop)
        this.prevIndexes = JSON.parse(JSON.stringify({ start: -indexes.stop, stop: indexes.start }))
    }
}