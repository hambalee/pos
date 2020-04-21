import { productsCollection, categoriesCollection } from '../firebase'

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

  buyProducts(products, cb, errorCb) {
    console.log('buy product : ', products)
    errorCb()
    cb()
  }
}
