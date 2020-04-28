import {
  productsCollection,
  categoriesCollection,
  ordersCollection,
  orderDetailsCollection
} from '../firebase'

export default {
  getProducts() {
    var categoryList = []
    var products = []
    return categoriesCollection
      .get()
      .then(querySnapshot => {
        categoryList = querySnapshot.docs.map(doc => {
          let newCategoryList = doc.data()
          newCategoryList.categoryID = doc.id
          return newCategoryList
        })
        return categoryList
      })
      .then(categoryList => {
        return productsCollection.get().then(querySnapshot => {
          products = querySnapshot.docs.map(doc => {
            let newdoc
            newdoc = doc.data()
            newdoc.productID = doc.id
            newdoc.inventory = newdoc.quantityPerUnit
            newdoc.ratio = newdoc.quantityPerUnit/newdoc.stockMinimum

            categoryList.forEach(cat => {
              if (newdoc.categoryID == cat.categoryID) {
                newdoc.categoryName = cat.categoryName
              }
            })
            return newdoc
          })
          //   console.log(products);
          return products
        })
      })
    //   .then(p => console.log(p))
    // return products
  },

  buyProducts(products, orderData, cb, errorCb) {
    let ordersCollectionID
    let recieptNumber = 1
    ordersCollection
      .orderBy('recieptNumber', 'desc')
      .limit(1)
      .get()
      .then(q => {
        //TODO FP-61
        recieptNumber = q.docs[0].data().recieptNumber + 1
      })
    /*       // eslint-disable-next-line no-unused-vars
      .catch(err => {
        //*console.log(err);
      }) */
    .then(() => {
    ordersCollection
      .add({
        ...orderData,
        recieptNumber: recieptNumber
      })
      .then(docRef => {
        //*console.log('docRef.id sss of ordersCollectionID', docRef.id)
        ordersCollectionID = docRef.id
        //*console.log('ordersCollectionID sss expected string id : ', ordersCollectionID)
        //*return docRef.id
      })
      // .then(id => {
      .then(() => {
        //*console.log('id issss same id : ', id)
        let orderDetailsID = []
        products.map(product => {
          //*console.log('ok product.quantityPerUnit ss', product.quantityPerUnit)
          //*console.log('ok product.inventory ss', product.inventory)
          //check qty and update product in stock
          let newqty = 0
          if (product.quantityPerUnit <= product.inventory) {
            newqty = product.inventory - product.quantityPerUnit
          }
          productsCollection
            .doc(product.productID)
            .update({
              quantityPerUnit: newqty
            })
            .then(() => {
              orderDetailsCollection
                .add({ ...product })
                .then(docRef => {
                  //*console.log('ok docRef id isssyifff ', docRef.id)
                  //*console.log('ok orderDetailsID beforepush : ', orderDetailsID)
                  orderDetailsID.push(docRef.id)
                  //*console.log('orderDetailsID afterpush : ', orderDetailsID)
                  ordersCollection
                    .doc(ordersCollectionID)
                    .update({ orderDetailID: orderDetailsID })
                })
                .then(() => {
                  //*console.log('orderDetailsID in then : ', orderDetailsID)
                  cb()
                })
                .catch(() => {
                  errorCb()
                })
              // console.log('* late : ', orderDetailsID)
            })
          /*             .then(() => {
              console.log(
                '* late orderDetailsID afterthen of update product in stock : ',
                orderDetailsID
              )
            }) */
        }) /* 
        console.log('//orderDetailsID iss expected array : ', orderDetailsID)
        return orderDetailsID */
      })
    })
    /*       .then(orderDetailsID => {
        console.log(
          '//orderDetailsID iss same expected array : ',
          orderDetailsID
        )
      }) */
    //log
    //*console.log('//products : ', products)
    //*console.log('//orderData : ', orderData)
    //*errorCb()
    //*cb()
  }
}
