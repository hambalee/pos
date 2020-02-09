import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

export const db = firebase.initializeApp(config).firestore()
export const productsCollection = db.collection('products');
export const storageRef = firebase.storage();
export const categoriesCollection = db.collection('categories');
export const suppliersCollection = db.collection('suppliers');
