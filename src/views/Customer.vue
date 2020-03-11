<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    class="elevation-1"
    :search="search"
    loading="true"
    :sort-by="['customerName']"
    :sort-desc="false"
  >
    <!-- sort-by="name" -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>ลูกค้า</v-toolbar-title>
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
              เพิ่มลูกค้า
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
                      v-model="editedItem.customerName"
                      label="ชื่อลูกค้า"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customerPhone"
                      label="เบอร์โทร"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customerEmail"
                      label="อีเมล์"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customerAddress"
                      label="ที่อยู่"
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
import { customersCollection } from "../firebase";

export default {
  data: () => ({
    search: "",
    dialogAddProdcut: false,
    headers: [
      {
        text: "ชื่อลูกค้า",
        value: "customerName",
        sortable: false
      },
      {
        text: "เบอร์โทร",
        value: "customerPhone",
        sortable: false
      },
      {
        text: "อีเมล์",
        value: "customerEmail",
        sortable: false
      },
      {
        text: "ที่อยู่",
        value: "customerAddress",
        sortable: false
      },
      { text: "", value: "action", sortable: false }
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      createdAt: "",
    },
    defaultItem: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      createdAt: "",
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มลูกค้า" : "แก้ไข";
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
      customersCollection
        .add({
          customerName: this.editedItem.customerName,
          customerPhone: this.editedItem.customerPhone,
          customerEmail: this.editedItem.customerEmail,
          customerAddress: this.editedItem.customerAddress,
          createdAt: new Date()
        })
        // eslint-disable-next-line no-unused-vars
        .then(function(docRef) {
          //console.log("Document written with ID: ", docRef.id);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(function(error) {
          //console.error("Error adding document: ", error);
        });
      this.customerID = "";
      this.customerName = "";
      this.customerPhone = "";
      this.customerEmail = "";
      this.customerAddress = "";
      this.createdAt = "";
    },
    initialize() {
      customersCollection.get().then(querySnapshot => {
        this.customers = querySnapshot.docs.map(doc => {
          let newdoc
          newdoc = doc.data()
          newdoc.customerID = doc.id
          return newdoc
        
        });
      });
    },
    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddProdcut = true;
    },

    deleteItem(item) {
      const index = this.customers.indexOf(item);
      var result = confirm("Are you sure you want to delete this item?")
      if(result){
        this.customers.splice(index, 1)
        customersCollection.doc(item.customerID).delete()
/*         .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
          });
        }) */
        //console.log("hhh");
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
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
        this.addProduct();
      }
      this.close();
    }
  }
};
</script>

<style></style>
