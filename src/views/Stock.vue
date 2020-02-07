<template>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1"
  >
    <!-- sort-by="name" -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>คลังสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >เพิ่มสินค้า</v-btn
            >
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

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "สินค้า",
        align: "left",
        sortable: true,
        value: "name"
      },
      { text: "ราคา", value: "price" },
      { text: "ปริมาณ", value: "quantity" },
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
      name: "",
      quantity: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มสินค้า" : "แก้ไข";
    }
  },

  watch: {
    dialog(val) {
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
        this.products2 = querySnapshot.docs.map(doc => doc.data());
      });
      this.products = [
        {
          name: "กระเบื้องคอนกรีต",
          price: 100,
          qty: 3
        },
        {
          name: "ปูนซีเมนต์",
          price: 210,
          qty: 4
        },
        {
          name: "ไม้อัด",
          price: 150,
          qty: 5
        },
        {
          name: "ปลั๊กไฟ",
          price: 50,
          qty: 4
        },
        {
          name: "หมวกนิรภัย",
          price: 170,
          qty: 7
        },
        {
          name: "กระดาษทรายแผ่น",
          price: 15,
          qty: 9
        },
        {
          name: "ค้อน",
          price: 60,
          qty: 14
        },
        {
          name: "ประตูไม้อัด",
          price: 208,
          qty: 10
        },
        {
          name: "สีทาอาคาร",
          price: 250,
          qty: 8
        },
        {
          name: "กาวตะปู",
          price: 55,
          qty: 1
        }
      ];
      // this.products.push = this.products2.map(item => item)

/*       this.products2.map( item => {
        this.products.push = item
      }) */

    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.products.splice(index, 1);
    },

    close() {
      this.dialog = false;
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
