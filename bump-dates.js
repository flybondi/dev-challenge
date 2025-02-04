'use strict'
const  fs = require('fs')
const dataSet = JSON.parse(fs.readFileSync("./dataset.json", "utf8"));

dataSet.map(item => {
    const hour = Math.round(Math.random() * 24)
    const min = Math.round(Math.random() * 60) 
    const date = new Date(item.date)

    date.setMonth(date.getMonth() + 1);
    date.setHours(hour, min)
    item.date = date.toISOString()

})

fs.writeFileSync("./dataset.json", JSON.stringify(dataSet, null, 2));
