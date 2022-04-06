const fs = require('fs');

const json = fs.readFileSync('TestDaten.json', "utf-8");

const object = JSON.parse(json);


object.customers.sort(function(a, b) {
    return a.ID - b.ID;
});

// console.log(object.customers[0].orders[0].items[0].price);

// console.log(object.customers[0].orders[0].items)

// console.log(object)

const arr = [];
const obj = {
    customers: []
}
object.customers.forEach(value => {

    // console.log(value)
    // console.log(value.orders)

    // console.log('here')
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
    // console.log(pr.toFixed(2))
    // console.log(keks)
    // console.log(quant)

    const getInfo = {
        ID: value.ID,
        firstName: value.firstName,
        lastName: value.lastName,
        customerValue: keks,
        itemsOrdered: quant
    }

    // arr.push(getInfo)

    obj.customers.push(getInfo)
})

// console.log(arr)
// console.log(obj)

const totalCustomerVal = obj.customers.reduce((acc, arrs) => acc + arrs.customerValue, 0);

const totalItemsOrder = obj.customers.reduce((acc, arrs) => acc + arrs.itemsOrdered, 0);

// console.log(totalCustomerValue)
// console.log(totalItemsOrdered)

obj.totalCustomerValue = totalCustomerVal
obj.totalItemsOrdered = totalItemsOrder

// console.log(obj)

const myJson = JSON.stringify(obj)

console.log(myJson)

async (event, steps) => {
axios = require('axios');
const WEBHOOK = 'https://hook.wemakefuture.com/os3sfxnadnww21q9d57hwjuj58vdfok3'; // Webhook to which you send the final data
const customerData = steps.trigger.event.body.customers; // Customer Data Object to modify

// send result to webhook
const result = await axios({ method: 'POST', url: WEBHOOK, data: myJson });
}
