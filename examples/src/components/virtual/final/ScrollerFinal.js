import Scroller from '../Scroller'
import config from '../../examples-config'

export default class ScrollerFinal extends Scroller {
    constructor(reportData) {
        super(reportData)
        this.scrollLeft = 0
    }

    listenOn () {
        this.DOM.reportTable.addEventListener('wheel', this.onScroll.bind(this))
    }

    onScroll (event) {
        if (event) {
            event.preventDefault()
        }

        let deltaY = config.capScrolling ? Math.min(event.deltaY, 500) : event.deltaY

        this.scrollTop = Math.min(Math.max(this.scrollTop + deltaY, 0), this.tableHeight - this.screenHeight)
        this.scrollLeft = Math.min(Math.max(this.scrollLeft + event.deltaX, 0), this.dynamicTableWidth - 2 * this.fixedTableWidth)

        if (!this.rAF) {
            this.rAF = window.requestAnimationFrame(() => {

                let indexes = this.indexes(this.scrollTop)

                if (indexes.start !== this.prevIndexes.start) {
                    this.renderRows.call(this, this.scrollTop)
                }

                this.doScroll(this.scrollLeft, this.scrollTop)
                this.rAF = false
            })
        }
    }

    doScroll (x, y) {
        this.DOM.cellsFixed.style.transform = `translate3D(0, ${-y}px, 0)`
        this.DOM.cellsDynamic.style.transform = `translate3D(${-x}px, ${-y}px, 0)`
    }

    setupDOM () {
        // this.DOM.cellsFixed.style.height = `${this.tableHeight}px`
        // this.DOM.cellsFixed.style.width = `${this.fixedTableWidth}px`

        // this.DOM.cellsDynamicWrapper.style.height = `${this.tableHeight}px`
        // this.DOM.cellsDynamicWrapper.style.width = `${this.tableWidth}px`

        // this.DOM.cellsDynamic.style.height = `${this.tableHeight}px`
        // this.DOM.cellsDynamic.style.width = `${this.dynamicTableWidth}px`
    }
}