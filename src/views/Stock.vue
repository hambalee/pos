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
                      v-model="editedItem.productName"
                      label="ชื่อสินค้า"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.productPrice"
                      label="ราคา"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.quantityPerUnit"
                      label="ปริมาณ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="categoryList"
                      label="หมวดหมู่"
                      item-text="categoryName"
                      item-value="categoryID"
                      v-model="selectcategoryID"
                      dense
                      solo
                    ></v-select>
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
import { categoriesCollection } from "../firebase";

export default {
  data: () => ({
    selectcategoryID: "",
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
      { text: "หมวดหมู่", align: "left", value: "categoryName" },
      { text: "", value: "action", sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      productName: "",
      productPrice: "",
      quantityPerUnit: "",
      categoryID: "",
      categoryName: "",
/*       category: {
        id: "",
        name: ""
      } */
      /*       defaultSelectedCategory: {
      } */
    },
    defaultItem: {
      productName: "",
      productPrice: "",
      quantityPerUnit: "",
      categoryID: "",
      categoryName: "",
/*       category: {
        id: "",
        name: ""
      } */
      /*       defaultSelectedCategory: {
      categoryIDdefault: "",
      } */
    },
    categoryList: []
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
      console.log("this.categoryID " + this.selectcategoryID);
      /*       console.log("this.defaultSelectedCategory  " + this.defaultSelectedCategory);
      console.log("this.defaultSelectedCategory.categoryID  " + this.defaultSelectedCategory.categoryID);
      console.log("this.defaultSelectedCategory.categoryname  " + this.defaultSelectedCategory.categoryname); */

      productsCollection
        .add({
          productName: this.editedItem.productName,
          productPrice: parseFloat(this.editedItem.productPrice),
          quantityPerUnit: parseFloat(this.editedItem.quantityPerUnit),
          categoryID: this.selectcategoryID,
          createdAt: new Date(),
          editedAt: new Date()
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
      this.categoryName = "";
      this.selectcategoryID = "";
    },
    editProduct() {
      productsCollection
        .doc(this.editedItem.productID)
        .update({
          productName: this.editedItem.productName,
          productPrice: parseFloat(this.editedItem.productPrice),
          quantityPerUnit: parseFloat(this.editedItem.quantityPerUnit),
          categoryID: this.selectcategoryID,
          editedAt: new Date()
        })
/*         .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        }) */
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.productName = "";
      this.productPrice = "";
      this.productQuantity = "";
      this.categoryName = "";
      this.selectcategoryID = "";
    },
    initialize() {
      // category list for add new product
      categoriesCollection.get().then(querySnapshot => {
        this.categoryList = querySnapshot.docs.map(doc => {
          let newCategoryList = doc.data();
          newCategoryList.categoryID = doc.id;
          return newCategoryList;
        });
      });
      // test set category to product
      /*       this.categoryList.forEach(cat => {
        console.log(cat);
      });
      setTimeout(() => {
        this.categoryList.forEach(cat => {
          console.log(cat.categoryID + " " + cat.categoryName);
        });
      }, 3000); */
      // product list
      productsCollection.get().then(querySnapshot => {
        this.products = querySnapshot.docs.map(doc => {
          let newdoc;
          newdoc = doc.data();
          newdoc.productID = doc.id;
          /*           categoriesCollection
            .doc(newdoc.categoryID)
            .get()
            .then(querySnapshot => {
              newdoc.categoryName = querySnapshot.data().categoryName;
            }); */
          // set category to each product
          this.categoryList.forEach(cat => {
            if (newdoc.categoryID == cat.categoryID) {
              newdoc.categoryName = cat.categoryName;
            }
          });
          return newdoc;
        });
      });

      /*  this.products.forEach(product => {
        this.categoryList.forEach(category => {
          if (product.categoryID == category.categoryID) {
            product.categoryName = category.categoryName;
          }
        });
      }); */
      /*       for (let i = 0; i < this.products.length; i++) {
        const element = this.products[i];
        console.log(i + element);
      }
      setTimeout(function() {

        const clothing = ["shoes", "shirts", "socks", "sweaters"];
        alert("Hello " + this.products.length);

        console.log(clothing.length);
      }, 3000); */
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddProdcut = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      var result = confirm("Are you sure you want to delete this item?");
      if (result) {
        this.products.splice(index, 1);
        productsCollection.doc(item.productID).delete();
      }
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
        this.editProduct();
      } else {
        // console.log("before set = " + this.editItem.categoryName);
        /*         this.categoryList.forEach(cat => {
          if (this.selectcategoryID == cat.categoryID) {
            this.editItem.categoryName = cat.categoryName;
            this.products.push(this.editedItem);
          }
        }); */
/*         for (let cat of this.categoryList) {
          if (this.selectcategoryID == cat.categoryID) {
            this.editItem.categoryName = this.selectcategoryID;
            console.log("after set = " + this.editItem.categoryName);
            console.log("after set = " + this.editItem);
            break;
          }
        } */
        this.products.push(this.editedItem);

        this.addProduct();
      }
      this.close();
    }
  }
};
</script>

<style></style>
