<template>
  <div id="stock-list">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ชื่อสินค้า</th>
            <th class="text-left">ราคา</th>
            <th class="text-left">จำนวน</th>
            <th class="text-left">รวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in showProducts" :key="item.productID">
            <td>{{ item.productName }}</td>
            <td>{{ item.importDetailCost }}</td>
            <td>{{ item.importDetailQuantity }}</td>
            <td>{{ item.importDetailQuantity * item.importDetailCost }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card>
      <v-card-title primary-title>
        <div>  ยอดรวม {{imports.importSum}} บาท</div>
      </v-card-title>
<!--       <v-card-text>
        <div>รวมเป็นเงิน {{imports}}</div>
      </v-card-text> -->
      
      
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { importsCollection } from "../firebase";
import { importDetailsCollection } from "../firebase";
import { productsCollection } from "../firebase";
import { suppliersCollection } from "../firebase";
import moment from "moment";
export default {
  name: "StockList",
  created() {
    this.initialize();
  },
  data() {
    return {
      headers: [
        { text: "productID", value: "productID" },
        { text: "productName", value: "productName" },
        { text: "importDetailCost", value: "importDetailCost" }
      ],
      importID: this.$route.params.id,
      imports: [],
      products: [],
      importDetails: [],
      suppliers: [],
      showProducts: [],
      showProducts_id: []
    };
  },
  methods: {
    async initialize1() {
      // console.log(this.importID);
      await this.getImport();
      // await console.log(this.idList);
      // this.idList.forEach( id => console.log(id))

      /*      this.imports = await importsCollection
        .doc(this.importID)
        .get()
        .then(q => q.data())
        /* {
          // console.log(q.data());
          // this.imports = q.data();
          // this.imports = q.data();
          this.imoprts.importDetailIDs.forEach(id => {
            console.log("id is", id);
          });
        } */
      //.catch(err => console.log(err)) */
      /*         .then(() => {
          // console.log("hello");
        }); */

      // console.log(this.imports.importDetailIDs);
      /*       await this.imports.importDetailIDs.map(id => {
        importDetailsCollection
          .doc(id)
          .get()
          .then(q => {
            // console.log("q is", q.data());
            this.products.push(q.data());
          });
        // console.log("tmp is", tmp);
      }); */
      // console.log("this.imports is", this.imports);
      /*       await this.products.map(product => {
        let name = productsCollection.doc(product.productID).get().then(q => q.data())
        console.log("name is ",name);

      }) */
    },
    //get imports
    getImport() {
      importsCollection
        .doc(this.importID)
        .get()
        .then(q => {
          this.imports = q.data();
          return this.imports;
        })
        // .then(q => this.imports = q.data())
        .then(i => {
          //*console.log("i", i.imoprtDetailIDs);
          let l = [];
          l.push({
            id: i.imoprtDetailIDs,
            name: i.i
          });
          //*console.log("l", l);

          // // console.log(this.imports)----****
          // this.imports.importDetailIDs.map(id => {
          //   console.log(id);

          //   this.idList.push(id);
          //   //
          //   productsCollection
          //     .doc(id)
          //     .get()
          //     .then(querySnapshot => {
          //       // this.products.push(querySnapshot.docs.data())
          //       querySnapshot.docs.map(doc => {
          //         let newdoc;
          //         newdoc = doc.data();
          //         newdoc.productID = doc.id;
          //         /*           categoriesCollection
          //   .doc(newdoc.categoryID)
          //   .get()
          //   .then(querySnapshot => {
          //     newdoc.categoryName = querySnapshot.data().categoryName;
          //   }); */
          //         return newdoc
          //       });
          //     });
          //   //
          //   return this.idList
          // }).then(id => {
          //   console.log(id);

          // })
          // console.log(this.idList);
          /*           productsCollection
              .doc(id)
              .get()
              .then(query => {
                query.map(doc => {
                  console.log(doc.data());

                }) */
          /*                 let tmp = query.docs.data()
                console.log(tmp) */
          // })
          // })***
        });
    },
    initialize2() {
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
      //get imports
      importsCollection
        .orderBy("importNumber", "desc")
        .get()
        .then(querySnapshot => {
          this.imports = querySnapshot.docs.map(doc => {
            let tmpimport;
            tmpimport = doc.data();
            tmpimport.importID = doc.id;

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
      //get imoprtDetails
      importDetailsCollection.get().then(querySnapshot => {
        this.importDetails = querySnapshot.docs.map(doc => {
          let tmp;
          tmp = doc.data();
          tmp.id = doc.id;
          return tmp;
        });
      });
    },
    initialize() {
      importsCollection
        .doc(this.$route.params.id)
        .get()
        .then(querySnapshot => {
          //*console.log(querySnapshot.data());
          this.imports = querySnapshot.data()
          let id = [];
          querySnapshot.data().importDetailIDs.forEach(importid => {
            id.push(importid);
          });
          return id;
        })
        .then(id => {
          id.forEach(id => {
            importDetailsCollection
              .doc(id)
              .get()
              .then(querySnapshot => {
                this.showProducts.push(querySnapshot.data());
                // console.log(this.showProducts);
              });
          });
        });
      // get detail
/*       importsCollection.get().then(querySnapshot => {
        this.importDetails = querySnapshot.docs.map(doc => {
          let tmp;
          tmp = doc.data();
          tmp.id = doc.id;
          return tmp;
        });
      }); */
    }
  }
};
</script>

<style></style>
