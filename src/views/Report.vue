<template>
  <div id="report">
    <h1>Report</h1>
    <v-form>
      <label>
        New Product:
        <v-text-field v-model="productName" type="text">ชื่อ</v-text-field>
        <v-text-field v-model="productPrice" type="number">ราคา</v-text-field>
        <v-text-field v-model="productQuantity" type="number"
          >ปริมาณ</v-text-field
        >
        <button type="submit" @click.prevent="addProduct()">Add</button>
      </label>
    </v-form>
    <v-label
      v-model="value"
      v-for="product in products"
      :key="product"
      no-action
    >
      {{ product.name }}
    </v-label>
    <v-file-input multiple label="File input" v-model="files"></v-file-input>
    <v-btn color="success" @click="uploadBtn">text</v-btn>
  </div>
</template>

<script>
import { productsCollection } from "../firebase";
import { storage } from "../firebase";
// import axios from "axios";

export default {
  name: "Report",
  data() {
    return {
      products: [],
      productName: "",
      productPrice: "",
      productQuantity: "",
      files: null
    };
  },
  created() {
    productsCollection.get().then(querySnapshot => {
      this.products = querySnapshot.docs.map(doc => doc.data());
    });
  },
  methods: {
    uploadBtn() {
      console.log(this.files);
      console.log(this.files.name);
      const fd = new FormData();
      fd.append("image", this.files[0], this.files[0].name);
      /* axios.post(storage, fd)
      .then(res => {
        console.log(res);
        
      }) */
      storage.put(fd).then(function(snapshot) {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
        
      });
    },
    addProduct() {
      productsCollection
        .add({
          name: this.productName,
          price: this.productPrice,
          quantity: this.productQuantity,
          createdAt: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.productName = "";
      this.productPrice = "";
      this.productQuantity = "";
    }
  }
};
</script>

<style></style>
