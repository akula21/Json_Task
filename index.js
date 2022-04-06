const fs = require('fs');

const json = fs.readFileSync('TestDaten.json', "utf-8");

const object = JSON.parse(json);

object.customers.sort(function(a, b) {
    return a.ID - b.ID;
});

const obj = {
    customers: []
}

object.customers.forEach(value => {

    let pr = 0
    let keks
    let quant = 0

    value.orders.forEach(val => {
        val.items.forEach(element => {
            let testPrice = (element.quantity * element.price).toFixed(2)
            // console.log(value.ID + ' ' +val.orderID + ' ' +element.quantity + ' ' + element.price + ' ' + testPrice)
            pr += +testPrice
            keks = +pr.toFixed(2)
            quant += element.quantity
        })
    })

    const getInfo = {
        ID: value.ID,
        firstName: value.firstName,
        lastName: value.lastName,
        customerValue: keks,
        itemsOrdered: quant
    }

    obj.customers.push(getInfo)
})

const totalCustomerVal = obj.customers.reduce((acc, arrs) => acc + arrs.customerValue, 0);
const totalItemsOrder = obj.customers.reduce((acc, arrs) => acc + arrs.itemsOrdered, 0);

obj.totalCustomerValue = totalCustomerVal
obj.totalItemsOrdered = totalItemsOrder

const myJson = JSON.stringify(obj)

console.log(myJson)






