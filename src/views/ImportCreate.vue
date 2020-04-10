<template>
  <div id="import-create">
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
        :items="suppliers"
        label="ผู้ผลิต"
        item-text="supplierName"
        item-value="ID"
        v-model="supplierID"
      ></v-select>
      <v-btn to="/supplier" class="ma-2" tile outlined color="primary"
        >เพิ่มผู้ผลิต</v-btn
      >
    </v-col>
    <v-btn color="info" outlined @click="dialog = true">เพิ่มสินค้า</v-btn>
    <v-dialog v-model="dialog" scrollable transition="dialog-transition">
      <v-card>
        <v-card>
          <v-card-title primary-title>
            เพิ่มสินค้า
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card> </v-card>

          <v-data-table
            :headers="headersProduct"
            :items="products"
            class="elevation-1"
            pagination.sync="pagination"
            item-key="ID"
            loading="true"
            :search="search"
            @click:row="clickRow"
          >
            <!-- v-model="selected"
            single-select
            show-select -->
          </v-data-table>
          <v-card-actions>
            <!--             <v-btn
              color="success"
              outlined
              @click="addSelectedProductInStockToImportProductList"
              >ตกลง</v-btn
            > -->
            <v-btn color="error" outlined @click="closeDialogProductList"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headersSelected"
      :items="selectedProducts"
      class="elevation-1"
      pagination.sync="pagination"
      item-key="ID"
      :search="search"
    >
      <!-- v-model="selected" -->
      <!-- show-select -->

      <!-- edit price -->
      <template v-slot:item.productCost="props">
        <v-edit-dialog
          :return-value.sync="props.item.productCost"
          large
          persistent
          @save="sumImport()"
          @cancel="sumImport()"
        >
          <!-- @open="props.item.productCost = ''" -->
          <div>฿ {{ props.item.productCost }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update productCost</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.productCost"
              label="ราคา"
              single-line
              counter
              autofocus
              prefix="฿"
              @focus="$event.target.select()"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- edit quantity -->
      <template v-slot:item.importDetailQuantity="props">
        <v-edit-dialog
          :return-value.sync="props.item.importDetailQuantity"
          large
          persistent
          @save="sumImport()"
          @cancel="sumImport()"
        >
          <!-- @open="props.item.importDetailQuantity = ''" -->
          <div>{{ props.item.importDetailQuantity }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update importDetailQuantity</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.importDetailQuantity"
              label="ปริมาณ"
              single-line
              counter
              autofocus
              @focus="$event.target.select()"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- sum -->
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <div><b>ยอดรวม</b> ฿ {{ importSum }}</div>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
    <v-btn class="ma-2" tile outlined color="success" @click="importNow"
      >นำเข้า</v-btn
    >
  </div>
</template>

<script>
import { suppliersCollection } from "../firebase";
import { importsCollection } from "../firebase";
import { importDetailsCollection } from "../firebase";
import { productsCollection } from "../firebase";

export default {
  name: "ImportCreate",
  data() {
    return {
      importID: "",
      importDetailID: "",
      importNumber: 1,
      importSum: 0,
      employeeID: "GZGkQYOMg8sOz214WEdO",
      supplierID: "fT7VGgqjciSLLb5g0meC",
      importDetails: [],
      importDetailCost: 0,
      importDetailQuantity: 0,
      suppliers: [],
      dialog: true,
      products: [],
      headersProduct: [
        { text: "ชื่อสินค้า", value: "productName" },
        { text: "ราคาต้นทุน", value: "productCost" },
        { text: "คงเหลือ", value: "quantityPerUnit" }
      ],
      headersSelected: [
        { text: "ชื่อสินค้า", value: "productName" },
        { text: "ราคา", value: "productCost" },
        { text: "ปริมาณ", value: "importDetailQuantity" }
      ],
      search: "",
      selectedProducts: [],
      selectedProducts2: [],
      selected: [],
      dispSum: 0
    };
  },
  methods: {
    clickRow(item) {
      this.selectedProducts.push({
        ...item,
        importDetailQuantity: 1
      });
      // console.log(this.selectedProducts);
      this.sumImport();

      this.closeDialogProductList();
    },
    importNow() {
      this.preImport();
    },
    addSelectedProductInStockToImportProductList() {
      // this.selectedProducts = []
      // this.selected.map( s => {
      /*       this.selected.map(s => {
        let st = false;
        st = this.selectedProducts.map(sp => {
          if(sp.ID !== s.ID){
            st = true
          }
        })
        if(st){
          this.selectedProducts.push(s);
        }


      }); */
      /*    let count = 0;
      this.selected.map(f => {
        if(this.selectedProducts.length > 0){
        for(let i = count; i<=this.selectedProducts.length; i++){
          if(this.selected.length > this.selectedProducts.length && count+1 > this.selectedProducts.length){
            this.selectedProducts.push(f);
          }
          else if (f.ID == this.selectedProducts[i].ID) {
            // else {
            count+=1;
            console.log(count)
            break;
          }
        }
        }else{
          this.selectedProducts.push(f);
        } */
      // });

      // this.selectedProducts = this.selected
      this.closeDialogProductList();
    },
    closeDialogProductList() {
      this.dialog = false;
      /*       setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300); */
    },
    addDetails() {
      this.selectedProducts.map(product => {
        importDetailsCollection
          .add({
            productID: product.ID,
            productName: product.productName,
            importDetailCost: product.productCost,
            importDetailQuantity: product.importDetailQuantity
          })
          .then(docRef => {
            // console.log(docRef.id);
            let tmp = docRef.id;
            this.importDetails.push(tmp);
          });
      });
    },
    async preImport() {
      /*       this.selectedProducts.map(product => {
        importDetailsCollection
          .add({
            productID: product.ID,
            importDetailCost: product.productCost,
            importDetailQuantity: product.importDetailQuantity
          })
          .then(docRef => {
            console.log(docRef.id);
            let tmp = docRef.id;
            this.importDetails.push(tmp);

          });
      }) */
      // var result = confirm("Are you sure you want to delete this item?");
      // if (result)
      // console.log(this.importDetails);
      // console.log(this.importDetails);

      await this.addDetails();
      await this.addImport();

      await this.addToStock();

      // this.$router.replace("/stock/");
      this.$router.back();
    },
    sumImport() {
      this.importSum = 0;
      this.selectedProducts.map(p => {
        this.importSum += p.productCost * p.importDetailQuantity;
      });
    },
    numberImport() {
      importsCollection
        .orderBy("importNumber", "desc")
        .limit(1)
        .get()
        .then(q => {
          this.importNumber = q.docs[0].data().importNumber + 1;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          //*console.log(err);
        });
    },
    addImport() {
      importsCollection
        .add({
          importDate: new Date(),
          importNumber: parseInt(this.importNumber),
          importSum: parseFloat(this.importSum),
          employeeID: this.employeeID,
          supplierID: this.supplierID,
          editedAt: new Date(),
          importDetailIDs: this.importDetails
        })
        .then(docRef => {
          let tmp = importsCollection.doc(docRef.id);
          tmp.update({ importDetailIDs: this.importDetails });
          // console.log(tmp);
        });
    },
    addToStock() {
      this.selectedProducts.map(product => {
        productsCollection
          .doc(product.ID)
          .get()
          .then(querySnapshot => {
            return querySnapshot.data();
          })
          .then(data => {
            let oldCost = data.productCost * data.quantityPerUnit;
            // console.log(oldCost);
            let lastCost = product.productCost * product.importDetailQuantity;
            // console.log(lastCost);
            let allQuantity =
              Number(data.quantityPerUnit) +
              Number(product.importDetailQuantity);
            // console.log(allQuantity);

            let newCost =
              (Number(oldCost) + Number(lastCost)) / Number(allQuantity);
            let ready = parseFloat(newCost.toFixed());
            // console.log(ready);
            /*             let forAdd = null
            forAdd.productCost= ready */
            return [ready, allQuantity];
          })
          .then(([ready, allQuantity]) => {
            // console.log("ready",ready);
            // console.log("allQuantity",allQuantity);
            productsCollection.doc(product.ID).update({ productCost: ready });
            productsCollection
              .doc(product.ID)
              .update({ quantityPerUnit: allQuantity });
          });
      });
    },
    initialize() {
      // get suppliers
      suppliersCollection
        .orderBy("createdAt", "desc")
        .get()
        .then(q => {
          this.suppliers = q.docs.map(doc => {
            let tmp;
            tmp = doc.data();
            tmp.ID = doc.id;
            return tmp;
          });
        });
      // get products
      productsCollection
        .orderBy("quantityPerUnit", "asc")
        .get()
        .then(q => {
          this.products = q.docs.map(doc => {
            let tmp;
            tmp = doc.data();
            tmp.ID = doc.id;
            return tmp;
          });
        });
      this.numberImport();
    },
    updateProductsCollection() {}
  },
  computed: {
    /*     importSums: () => {
      let sum = this.importDetails.reduce((accumulate, data) => {
        return accumulate + Number(data.importDetailCost);
      }, 0);
      return sum.toFixed(2);
    //   this.importSum = 9999;
    } */
    compSum: () => {
      /*      if (this.selectedProducts !== null) {
        var sum = this.selectedProducts.reduce((accumulate, data) => {
          return accumulate + Number(data.productCost);
        });
        return sum.toFixed(2);
      }
      else {
        return 0
      } */
      return 0;
    }
  },
  created() {
    this.initialize();
  },
  mounted() {}
};
</script>

<style></style>
