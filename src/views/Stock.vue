<template>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1"
    :search="search"
    loading="true"
  >
    <!-- sort-by="name" -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>คลังสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <!-- <v-spacer></v-spacer> -->
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogAddProdcut" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              <v-icon>add</v-icon>
              เพิ่มสินค้า
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row @keypress.enter="save">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="ชื่อสินค้า"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.price"
                      label="ราคา"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="ปริมาณ"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
              <v-btn color="blue darken-1" text @click="save">บันทึก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        edit
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { productsCollection } from "../firebase";
// eslint-disable-next-line no-unused-vars
import { categoriesCollection } from "../firebase";

export default {
  data: () => ({
    search: "",
    dialogAddProdcut: false,
    headers: [
      {
        text: "ชื่อสินค้า",
        align: "left",
        sortable: false,
        value: "productName"
      },
      { text: "ราคา", align: "right", value: "productPrice" },
      { text: "ปริมาณ", align: "center", value: "quantityPerUnit" },
      { text: "หมวดหมู่", value: "categoryName" },
      { text: "", value: "action", sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: "",
      quantity: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มสินค้า" : "แก้ไข";
    }
  },

  watch: {
    dialogAddProdcut(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    addProduct() {
      productsCollection
        .add({
          name: this.editedItem.name,
          price: this.editedItem.price,
          quantity: this.editedItem.quantity,
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
    },
    initialize() {
      productsCollection.get().then(querySnapshot => {
        this.products = querySnapshot.docs.map(doc => doc.data());
      });
      /*       this.products.forEach(product => {
        console.log(product);
        categoriesCollection
          .doc(product.categoryID)
          .get()
          .then(querySnapshot => {
            product.categoryName = querySnapshot.data().categoryName
          });
        
      }); */

      /*       categoriesCollection
        .doc(this.product.categoryID)
        .get()
        .then(doc => {
          console.log(doc.data().categoryName);
          product.categoryName = doc.data().categoryName;
          return doc.data().categoryName;
        });
      console.log(JSON.stringify(product));
      console.log(product.categoryID);

      return product; */
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddProdcut = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.products.splice(index, 1);
    },

    close() {
      this.dialogAddProdcut = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
        this.addProduct();
      }
      this.close();
    }
  }
};
</script>

<style></style>
