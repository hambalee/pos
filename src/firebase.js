import firebase from 'firebase'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

const firebaseInit = firebase.initializeApp(config)

export const db = firebaseInit.firestore()
export const productsCollection = db.collection('products');
export const storageRef = firebase.storage();
export const categoriesCollection = db.collection('categories');
export const suppliersCollection = db.collection('suppliers');
export const customersCollection = db.collection('customers');
