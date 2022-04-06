const fs = require('fs');
const axios = require('axios');

const json = fs.readFileSync('TestDaten.json', "utf-8");

const object = JSON.parse(json);

object.customers.sort(function(a, b) {
    return a.ID - b.ID;
});

const obj = {
    customers: []
}

object.customers.forEach(value => {

    let prices = 0
    let pricesFixed
    let quantities = 0

    value.orders.forEach(val => {
        val.items.forEach(element => {
            let testPrice = (element.quantity * element.price).toFixed(2)
            prices += +testPrice
            pricesFixed = +prices.toFixed(2)
            quantities += element.quantity
        })
    })

    const getInfo = {
        ID: value.ID,
        firstName: value.firstName,
        lastName: value.lastName,
        customerValue: pricesFixed,
        itemsOrdered: quantities
    }

    obj.customers.push(getInfo)
})

const totalCustomerVal = obj.customers.reduce((acc, arrs) => acc + arrs.customerValue, 0);
const totalItemsOrder = obj.customers.reduce((acc, arrs) => acc + arrs.itemsOrdered, 0);

obj.totalCustomerValue = totalCustomerVal
obj.totalItemsOrdered = totalItemsOrder

const myJson = JSON.stringify(obj)

console.log(obj)
console.log(myJson)

axios.post('https://hook.wemakefuture.com/os3sfxnadnww21q9d57hwjuj58vdfok3', obj)
    .then((response) => {
        console.log(response.data);
    }, (error) => {
        console.log(error);
    });




