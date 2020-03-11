<template>
  <v-data-table
    :headers="headers"
    :items="suppliers"
    class="elevation-1"
    :search="search"
    loading="true"
    :sort-by="['supplierName']"
    :sort-desc="false"
  >
    <!-- sort-by="name" -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>ผู้ผลิต</v-toolbar-title>
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
              เพิ่มผู้ผลิต
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
                      v-model="editedItem.supplierName"
                      label="ชื่อผู้ผลิต"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.supplierPhone"
                      label="เบอร์โทร"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.supplierEmail"
                      label="อีเมล์"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.supplierAddress"
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
import { suppliersCollection } from "../firebase";

export default {
  data: () => ({
    search: "",
    dialogAddProdcut: false,
    headers: [
      {
        text: "ชื่อผู้ผลิต",
        value: "supplierName",
        sortable: false
      },
      {
        text: "เบอร์โทร",
        value: "supplierPhone",
        sortable: false
      },
      {
        text: "อีเมล์",
        value: "supplierEmail",
        sortable: false
      },
      {
        text: "ที่อยู่",
        value: "supplierAddress",
        sortable: false
      },
      { text: "", value: "action", sortable: false }
    ],
    suppliers: [],
    editedIndex: -1,
    editedItem: {
      supplierName: "",
      supplierPhone: "",
      supplierEmail: "",
      supplierAddress: "",
      createdAt: "",
    },
    defaultItem: {
      supplierName: "",
      supplierPhone: "",
      supplierEmail: "",
      supplierAddress: "",
      createdAt: "",
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มผู้ผลิต" : "แก้ไข";
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
      suppliersCollection
        .add({
          supplierName: this.editedItem.supplierName,
          supplierPhone: this.editedItem.supplierPhone,
          supplierEmail: this.editedItem.supplierEmail,
          supplierAddress: this.editedItem.supplierAddress,
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
      this.supplierID = "";
      this.supplierName = "";
      this.supplierPhone = "";
      this.supplierEmail = "";
      this.supplierAddress = "";
      this.createdAt = "";
    },
    initialize() {
      suppliersCollection.get().then(querySnapshot => {
        this.suppliers = querySnapshot.docs.map(doc => {
          let newdoc
          newdoc = doc.data()
          newdoc.supplierID = doc.id
          return newdoc
        
        });
      });
    },
    editItem(item) {
      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAddProdcut = true;
    },

    deleteItem(item) {
      const index = this.suppliers.indexOf(item);
      var result = confirm("Are you sure you want to delete this item?")
      if(result){
        this.suppliers.splice(index, 1)
        suppliersCollection.doc(item.supplierID).delete()
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
        Object.assign(this.suppliers[this.editedIndex], this.editedItem);
      } else {
        this.suppliers.push(this.editedItem);
        this.addProduct();
      }
      this.close();
    }
  }
};
</script>

<style></style>
