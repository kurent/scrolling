import Scroller from '../Scroller'

export default class ScrollerFinal extends Scroller {
    constructor(reportData, options) {
        super(reportData, options)
        this.scrollLeft = 0
    }

    listenOn () {
        this.DOM.reportTable.addEventListener('wheel', this.onScroll.bind(this), true)
    }

    onWheel (event) {
        this.scrollTop = this.scrollTop + Math.min(event.deltaY, 1000)
        this.scrollLeft = this.scrollLeft + event.deltaX

        if (!this.rAF) {
            this.rAF = window.requestAnimationFrame(() => {

                const indexes = this.indexes(this.scrollTop)

                if (indexes.start !== this.previousIndexes.start) {
                    this.renderRows.call(this, this.scrollTop)
                }

                this.scroll(this.scrollLeft, this.scrollTop)
                this.rAF = false
            })
        }
    }

    scroll (x, y) {
        this.DOM.cellsFixed.style.transform = `translate3D(0, ${-y}px, 0)`
        this.DOM.cellsDynamic.style.transform = `translate3D(${-x}px, ${-y}px, 0)`
    }
}