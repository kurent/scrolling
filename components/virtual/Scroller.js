const CELL_HEIGHT = 30
const CELL_WIDTH = 200
const USE_TRANSFORM = false

/* eslint-disable */

export default class Scroller {
    constructor (reportData) {
        this.headers = reportData.headers
        this.rows = reportData.data
        
        this.prevIndexes = { start: null, stop: null}
        this.scrollTop = 0

        this.headerNodes = []
        this.rowNodes = [...Array(this.rows.length).keys()].map(i => [...Array(this.columns)])
        
        this.screenHeight = screen.height
        this.screenWidth = screen.width

        this.DOM = getDOM()

        this.init()
        this.renderRows(this.scrollTop, true)

        // window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('wheel', this.onScroll.bind(this))
    }

    onScroll (event) {
        if (event.deltaY) {
            this.scrollTop = Math.min(Math.max(this.scrollTop + event.deltaY, 0), this.tableHeight)
        } else {
            this.scrollTop = window.scrollY
        }

        let indexes = this.indexes(this.scrollTop)

        if (indexes.start === this.prevIndexes.start || indexes.stop > this.rows.length) {
            return
        }
        
        if (!this.rAF) {
            this.rAF = window.requestAnimationFrame(() => {
                this.renderRows.call(this, this.scrollTop)
                this.rAF = false
            })
        }
        
    }

    init () {
        for (let y = 0; y < this.rowsFitScreen; y++) {
            
            this.headers.fixed.forEach((element, x) => {
                const elem = this.DOM.cell.cloneNode(false)

                this.rowNodes[y][x] = elem
                this.DOM.cellsFixed.appendChild(elem)
            });

            this.headers.dynamic.forEach((element, x) => {
                const elem = this.DOM.cell.cloneNode(false)
                
                this.rowNodes[y][this.headers.fixed.length + x] = elem
                this.DOM.cellsDynamic.appendChild(elem)
            });
        }

        const indexes = this.indexes(this.scrollTop)

        this.prevIndexes = JSON.parse(JSON.stringify({ start: -indexes.stop, stop: indexes.start }))
        
        this.DOM.reportTable.style.height = `${this.tableHeight}px`
    }

    renderRows (scrollTop, init) {
        const indexes = this.indexes(scrollTop)
        const diff = indexes.start - this.prevIndexes.start
        
        if (diff > 0) {
            const start = init ? indexes.start : this.prevIndexes.start
            const end = init ? start + diff : indexes.start
            const offset = init ? 0 : this.rowsFitScreen

            for (let y = start; y < end; y++) {
                const row = this.rowNodes[y]

                row.map((node, x) => {                    
                    node.textContent = this.rows[y + offset][x]

                    if (USE_TRANSFORM) {
                        node.style.transform = `translate(${ x * CELL_WIDTH }px, ${ (y + offset) * CELL_HEIGHT }px)`
                    } else {
                        node.style.left = `${ x * CELL_WIDTH }px`;
                        node.style.top = `${ (y + offset) * CELL_HEIGHT }px`;
                    }
                    return node
                })

                if (!init) {
                    this.rowNodes[y + offset] = row
                    this.rowNodes[y] = null
                }
            }

            this.prevIndexes = indexes
        } else if (diff < 0) {
            const start = this.prevIndexes.stop - 1
            const end = indexes.stop - 1
            const offset = this.rowsFitScreen

            for (let y = start; y > end; y--) {

                const row = this.rowNodes[y]
                row.map((node, x) => {
                    node.textContent = this.rows[y - offset][x]

                    if (USE_TRANSFORM) {
                        node.style.transform = `translate(${ x * CELL_WIDTH }px, ${ (y - offset) * CELL_HEIGHT }px)`
                    } else {
                        node.style.left = `${ x * CELL_WIDTH }px`;
                        node.style.top = `${ (y - offset) * CELL_HEIGHT }px`;
                    }
                    return node
                })

                if (!init) {
                    this.rowNodes[y - offset] = row
                    this.rowNodes[y] = null
                }
            }

            this.prevIndexes = indexes
        }

        return false
    }

    setupTable () {
        
    }

    get fixedTableWidth () {
        return this.headers.fixed.length * CELL_WIDTH
    }

    get dynamicTableWidth () {
        return this.headers.dynamic.length * CELL_WIDTH
    }

    get tableHeight () {
        return (this.rows.length) * CELL_HEIGHT
    }

    get tableWidth () {
        return this.fixedTableWidth + this.dynamicTableWidth
    }
    
    get rowsFitScreen () {
        return Math.ceil(this.screenHeight / CELL_HEIGHT) + 100
    }

    indexes (scrollTop) {
        const start = Math.floor(scrollTop / CELL_HEIGHT)

        return {
            start,
            stop: start + this.rowsFitScreen 
        }
    }

    get columns () {
        return this.headers.fixed.length + this.headers.dynamic.length
    }
}

function getDOM () {
    return {
        'cell' : document.querySelector('#templates > .cell'),
        'reportTable' : document.querySelector('#report-table'),
        'headersFixed' : document.querySelector('#headers-fixed'),
        'headersDynamic' : document.querySelector('#headers-dynamic'),
        'cellsFixed' : document.querySelector('#cells-fixed'),
        'cellsDynamicWrapper' : document.querySelector('#cells-dynamic__wrapper'),
        'cellsDynamic' : document.querySelector('#cells-dynamic'),
    }
}

