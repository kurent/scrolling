import config from '../examples-config.js'

const CELL_HEIGHT = config.cellHeight
const CELL_WIDTH = config.cellWidth

/* eslint-disable */

export default class Scroller {
    constructor(reportData, options) {
        this.config = Object.assign({}, config, options)
        this.headers = reportData.headers
        this.rows = reportData.data

        this.prevIndexes = { start: null, stop: null }
        this.scrollTop = 0

        this.headerNodes = []
        this.rowNodes = [...Array(this.rows.length).keys()].map(i => [...Array(this.columns)])

        this.screenHeight = screen.height
        this.screenWidth = screen.width

        this.DOM = getDOM()

        this.init()
        this.setupDOM()
        this.renderRows(this.scrollTop, true)
        this.onScrollFn = this.onScroll.bind(this)
        this.listenOn('scroll')
    }

    listenOn (event) {
        if ('scroll') {
            this.onScrollFnType = 'scroll'
            window.addEventListener('scroll', this.onScrollFn)
        } else if ('reportTable') {
            this.onScrollFnType = 'reportTable'
            this.DOM.reportTable.addEventListener('wheel', this.onScrollFn)
        } else if ('cellsDynamicWrapper') {
            this.onScrollFnType = 'cellsDynamicWrapper'
            this.DOM.cellsDynamicWrapper.addEventListener('wheel', this.onScrollFn)
        }
    }

    onScroll (event) {
        if (event) {
            event.preventDefault()
        }

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
                const elem = this.cloneCell(y,x , 'cell--fixed')
                this.rowNodes[y][x] = elem
                this.DOM.cellsFixed.appendChild(elem)
            });

            this.headers.dynamic.forEach((element, x) => {
                const elem = this.cloneCell(y, this.headers.fixed.length + x)
                this.rowNodes[y][this.headers.fixed.length + x] = elem
                this.DOM.cellsDynamic.appendChild(elem)
            });
        }

        const indexes = this.indexes(this.scrollTop)
        this.prevIndexes = JSON.parse(JSON.stringify({ start: -indexes.stop, stop: indexes.start }))
    }

    setupDOM () {
        this.DOM.cellsFixed.style.height = `${this.tableHeight}px`
        this.DOM.cellsFixed.style.width = `${this.fixedTableWidth}px`

        this.DOM.cellsDynamicWrapper.style.height = `${this.tableHeight}px`

        this.DOM.cellsDynamic.style.height = `${this.tableHeight}px`
        this.DOM.cellsDynamic.style.width = `${this.dynamicTableWidth}px`
    }

    renderRows (scrollTop, init) {
        const indexes = this.indexes(scrollTop)
        const diff = indexes.start - this.prevIndexes.start

        if (diff > 0) {
            const start = init ? indexes.start : this.prevIndexes.start
            const end = init ? start + diff : indexes.start
            const offset = init ? 0 : this.rowsFitScreen

            for (let y = start; y < end; y++) {
                const row = this.getRow(y)

                row.map((node, x) => {
                    const text = this.getRowData(y + offset, x)
                    node = this.positionCell(node, y + offset, x)
                    node = this.updateCell(node, text, y + offset, x)
                    return node
                })

                if (!init) {
                    this.switchRows(y, y + offset, row)
                }
            }

            this.prevIndexes = indexes
        } else if (diff < 0) {
            const start = this.prevIndexes.stop - 1
            const end = indexes.stop - 1
            const offset = this.rowsFitScreen

            for (let y = start; y > end; y--) {
                const row = this.getRow(y)

                row.map((node, x) => {
                    const text = this.getRowData(y - offset, x)
                    node = this.positionCell(node, y - offset, x)
                    node = this.updateCell(node, text, y - offset, x)
                    return node
                })

                this.switchRows(y, y - offset, row)
            }

            this.prevIndexes = indexes
        }

        return false
    }

    getRow (y) {
        return this.rowNodes[y]
    }

    switchRows (fromY, toY, row) {
        this.rowNodes[toY] = row
        this.rowNodes[fromY] = null
    }

    getRowData (y, x) {
        return this.rows[y][x]
    }

    cloneCell (y, x, classes) {
        const elem = this.DOM.cell.cloneNode(false)
        elem.setAttribute('data-row-id', y)
        elem.setAttribute('data-col-id', x)

        if (classes) {
            elem.classList.add(classes)
        }

        return elem
    }

    cloneRow (y, classes) {
        const elem = this.DOM.row.cloneNode(false)
        elem.setAttribute('data-row-id', y)

        if (classes) {
            elem.classList.add(classes)
        }

        return elem
    }

    positionCell (node, y, x) {
        if (this.config.useTransform) {
            node.style.transform = `translate3D(${x * CELL_WIDTH}px, ${y * CELL_HEIGHT}px, 0)`
        } else {
            node.style.top = `${y * CELL_HEIGHT}px`;
            node.style.left = `${x * CELL_WIDTH}px`;
        }

        return node
    }

    updateCell (node, text, y, x) {
        node.textContent = text
        node.setAttribute('data-row-id', y)
        node.setAttribute('data-col-id', x)

        return node
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
        return Math.ceil(this.screenHeight / CELL_HEIGHT)
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

    destroy () {

    }
}

function getDOM () {
    return {
        'cell': document.querySelector('#templates > .cell'),
        'row': document.querySelector('#templates > .row'),
        'reportTableWrapper': document.querySelector('.report-table-wrapper'),
        'reportTable': document.querySelector('#report-table'),
        'headersFixed': document.querySelector('#headers-fixed'),
        'headersDynamic': document.querySelector('#headers-dynamic'),
        'cellsFixed': document.querySelector('#cells-fixed'),
        'cellsDynamicWrapper': document.querySelector('#cells-dynamic__wrapper'),
        'cellsDynamic': document.querySelector('#cells-dynamic'),
    }
}

