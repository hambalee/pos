import { ordersCollection } from '../firebase'

export default {
  getOrders() {
    var orders = []
    return ordersCollection.orderBy('orderDate', 'desc').get().then(querySnapshot => {
      orders = querySnapshot.docs.map(doc => {
        let newdoc
        newdoc = doc.data()
        newdoc.id = doc.id
        newdoc.date = newdoc.orderDate.toDate()
        newdoc.dateISO = newdoc.date.toISOString().substr(0,10)
        newdoc.dateISOFull = newdoc.date.toISOString()
        newdoc.dateYear = newdoc.date.getUTCFullYear()
        newdoc.dateMonth = newdoc.date.getUTCMonth() + 1 //start with 0
        newdoc.dateDate = newdoc.date.getUTCDate()
        newdoc.showDate = newdoc.date.toLocaleString('th-TH').substr(0,9)
        newdoc.showTime = newdoc.date.toLocaleString('th-TH').substr(10)
        return newdoc
      })
      return orders
    })
  }
}
