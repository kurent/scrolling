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

        if (diff > 0) {
            const from = this.prevIndexes.stop
            const to = from + diff
            const offset = this.rowsFitScreen

            for (let y = from; y < to; y++) {
                let fragmentFixed = document.createDocumentFragment()
                let fragmentDynamic = document.createDocumentFragment()

                let createFixedRow = function (element, x) {
                    let elem = this.cloneCell(x, y, 'cell--fixed')
                    elem.textContent = this.rows[y][x]
                    elem = this.positionCell(elem, x, y)
                    fragmentFixed.appendChild(elem)
                }

                let createDynamicRow = function (element, index) {
                    const x = index + this.headers.fixed.length
                    let elem = this.cloneCell(x, y)
                    elem.textContent = this.rows[y][x]
                    elem = this.positionCell(elem, x, y)
                    fragmentDynamic.appendChild(elem)
                }

                this.headers.fixed.map(createFixedRow.bind(this))
                this.headers.dynamic.map(createDynamicRow.bind(this))

                this.DOM.cellsFixed.appendChild(fragmentFixed)
                this.DOM.cellsDynamic.appendChild(fragmentDynamic)

                let deleteFixedRow = this.DOM.cellsFixed.querySelectorAll(`[data-row-id="${y - offset}"]`)
                let deleteDynamicRow = this.DOM.cellsDynamic.querySelectorAll(`[data-row-id="${y - offset}"]`)

                let deleteFixedRowFn = function (element) {
                    this.DOM.cellsFixed.removeChild(element)
                }

                let deleteDynamicRowFn = function (element) {
                    this.DOM.cellsDynamic.removeChild(element)
                }

                deleteFixedRow.forEach(deleteFixedRowFn.bind(this))
                deleteDynamicRow.forEach(deleteDynamicRowFn.bind(this))
            }

            this.prevIndexes = indexes
        } else if (diff < 0) {
            // const start = this.prevIndexes.stop - 1
            // const end = indexes.stop - 1
            // const offset = this.rowsFitScreen

            // for (let y = start; y > end; y--) {

            //     const row = this.rowNodes[y]
            //     row.map((node, x) => {
            //         node.textContent = this.rows[y - offset][x]
            //         node.setAttribute('data-row-id', y)
            //         node.setAttribute('data-col-id', x)

            //         if (super.USE_TRANSFORM) {
            //             node.style.transform = `translate(${x * super.CELL_WIDTH}px, ${(y - offset) * super.CELL_HEIGHT}px)`
            //         } else {
            //             node.style.left = `${x * super.CELL_WIDTH}px`;
            //             node.style.top = `${(y - offset) * super.CELL_HEIGHT}px`;
            //         }
            //         return node
            //     })

            //     this.rowNodes[y - offset] = row
            //     this.rowNodes[y] = null

            // }

            // this.prevIndexes = indexes
        }

        return false
    }
}