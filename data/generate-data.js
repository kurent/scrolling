import dataFixed from './data-fixed.json'
import dataDynamic from './data-dynamic.json'

/* eslint-disable */
export function generateData (fixedCols, dynamicCols, rows) {
    let fixedColsArray = Array.apply(null, { length: fixedCols })
    let dynamicColsArray = Array.apply(null, { length: dynamicCols })

    let obj = {
        headers: {
            fixed: fixedColsArray.map((item, index) => 'Fixed header: ' + index),
            dynamic: dynamicColsArray.map((item, index) => 'Dynamic Header: ' + index),
        },
        data: multiplyArray(dataDynamic, rows / 100)
    }

    obj.headers.fixed = [''].concat(obj.headers.fixed)
    obj.data = obj.data.map((row, index) => {
        return [index + 1].concat(dataFixed[index], row)
    })

    return obj
}


function multiplyArray (array, multiplyBy) {
    let newArray = []

    for (let i = 0; i < multiplyBy; i++) {
        newArray = newArray.concat(array.slice())
    }

    return newArray
}