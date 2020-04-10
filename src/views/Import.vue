<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="imports"
      class="elevation-1"
      loading="true"
      no-data="no data"
      @click:row="rowClick"
    >
      <template v-slot:top>
        <v-toolbar class="mb-1" flat>
          <v-toolbar-title>รายการใบสั่งซื้อ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- search box start -->
          <!--  <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field> -->
          <!-- search box end -->
          <v-spacer />
          <v-btn
            class="ma-2"
            tile
            outlined
            color="primary"
            to="/stock/import/create"
          >
            <v-icon left>add</v-icon> สร้างใบสั่งซื้อ
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.iron="props">
        <v-edit-dialog
          :return-value.sync="props.item.iron"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.iron }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Iron</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.iron"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">
          delete
        </v-icon>
      </template>
      <template v-slot:item.importSum="{ item }">
        ฿ {{item.importSum}}
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import moment from "moment";
import { importsCollection } from "../firebase";
import { employeesCollection } from "../firebase";
import { suppliersCollection } from "../firebase";
import { importDetailsCollection } from "../firebase";

export default {
  data() {
    return {
      headers: [
        {
          text: "เลขที่ใบสั่งซื้อ",
          align: "end",
          value: "importNumber"
        },
        { text: "วันที่", value: "dispDate", align: "center" },
        { text: "ยอดรวม", value: "importSum" },
        { text: "ผู้ผลิต", value: "supplierName", align: "start" },
        { text: "", value: "action", sortable: false }
      ],
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      imports: [],
      suppliers: [],
      employees: []
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      //* console.log("Dialog closed");
    },
    rowClick(item){
      // console.log(item.importID);
      this.$router.push('/stock/details/'+item.importID)
    },
    deleteItem(item) {
      const index = this.imports.indexOf(item);
      var result = confirm("Are you sure you want to delete this item?");
      if (result) {
        this.imports.splice(index, 1);
        importsCollection.doc(item.importID).delete();
        item.importDetailIDs.map( i => {
          importDetailsCollection.doc(i).delete();
        })
      }
    },
    initialize() {
      employeesCollection.get().then(querySnapshot => {
        this.employees = querySnapshot.docs.map(doc => {
          let tmp;
          tmp = doc.data();
          tmp.ID = doc.id;
          return tmp;
        });
      });
      suppliersCollection.get().then(querySnapshot => {
        this.suppliers = querySnapshot.docs.map(doc => {
          let tmp;
          tmp = doc.data();
          tmp.ID = doc.id;
          return tmp;
        });
      });
      importsCollection
        .orderBy("importNumber", "desc")
        .get()
        .then(querySnapshot => {
          this.imports = querySnapshot.docs.map(doc => {
            let tmpimport;
            tmpimport = doc.data();
            tmpimport.importID = doc.id;
            this.employees.forEach(emp => {
              // console.log(emp);
              if (tmpimport.employeeID == emp.ID) {
                tmpimport.employeeName = emp.employeeName;
              }
            });
            this.suppliers.forEach(sup => {
              if (tmpimport.supplierID == sup.ID)
                tmpimport.supplierName = sup.supplierName;
            });
            tmpimport.dispDate = moment(tmpimport.importDate.toDate())
              .locale("th")
              .format("LLLL");
            return tmpimport;
          });
        });
    }
  },
  destroyed() {
    // this.initialize();
  },
};
</script>

<style></style>
