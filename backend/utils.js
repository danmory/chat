function objDeepCompare(o1, o2){
    return JSON.stringify(o1) === JSON.stringify(o2)
}

module.exports = { objDeepCompare }