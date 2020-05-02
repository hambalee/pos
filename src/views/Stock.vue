<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1"
      :search="search"
      loading="true"
    >
      <!-- sort-desc="editedAt" -->
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
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogAddProdcut">
            <!--           <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-toolbar-items>
            <v-menu
              bottom
              right
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="() => {}"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            </v-toolbar>-->

            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                <v-icon>add</v-icon>เพิ่มสินค้า
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
                      <v-text-field v-model="editedItem.productName" label="ชื่อสินค้า"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productDetail" label="รายละเอียด"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productPrice" label="ราคาขาย"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productCost" label="ราคาต้นทุน"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.quantityPerUnit" label="ปริมาณ"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.stockMinimum" label="จำนวนสินค้าขั้นต่ำ"></v-text-field>
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
                    <v-col cols="12" sm="6" md="4">
                      <v-file-input
                        accept="image/*"
                        label="รูปภาพ"
                        prepend-icon="mdi-camera"
                        filled
                        @change="onFilePicked"
                      ></v-file-input>
                      <!-- v-model="editedItem.imageUrl" -->
                      <!-- <input type="file" @change="previewImage" accept="image/*" > -->
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
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:item.productImageUrl="{ item }">
        <v-img
          :src="item.productImageUrl"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-width="50"
          max-height="50"
          class="grey lighten-2"
          aspect-ratio="1"
        ></v-img>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  productsCollection,
  categoriesCollection,
  storageRef
} from '../firebase'
import moment from 'moment'

export default {
  data: () => ({
    image: null,
    imageUrl: '',
    // date: moment(Date()).format("MMMM Do YYYY, h:mm:ss a"),
    // date: this.$options.filters.moment(new Date()),
    selectcategoryID: '',
    selectcategoryName: '',
    search: '',
    dialogAddProdcut: false,
    headers: [
      {
        text: 'รูป',
        align: 'center',
        value: 'productImageUrl',
        sortable: false
      },
      {
        text: 'ชื่อสินค้า',
        align: 'left',
        sortable: true,
        value: 'productName'
      },
      { text: 'ราคาขาย', align: 'center', value: 'productPrice' },
      { text: 'ราคาต้นทุนเฉลี่ย', align: 'center', value: 'productCost' },
      { text: 'ปริมาณ', align: 'center', value: 'quantityPerUnit' },
      { text: 'หมวดหมู่', align: 'left', value: 'categoryName' },
      {
        text: 'แก้ไขล่าสุด',
        align: 'center',
        value: 'lastEdit',
        sortable: false
      },
      { text: 'วันที่', align: ' d-none', value: 'editedAt' },
      { text: '', value: 'action', sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      productName: '',
      productPrice: '',
      quantityPerUnit: '',
      categoryID: '',
      categoryName: '',
      productCost: '',
      productDetail: '',
      stockMinimum: 0,
      imageUrl: ''
      /*       category: {
        id: "",
        name: ""
      } */
      /*       defaultSelectedCategory: {
      } */
    },
    defaultItem: {
      productName: '',
      productPrice: '',
      quantityPerUnit: '',
      categoryID: '',
      categoryName: '',
      productCost: '',
      productDetail: '',
      stockMinimum: 0,
      imageUrl: ''
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
      return this.editedIndex === -1 ? 'เพิ่มสินค้า' : 'แก้ไข'
    }
    // TODO: add condition for validate form
    /*     formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      }, */
  },

  watch: {
    dialogAddProdcut(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },
  //*Method
  methods: {
    onFilePicked(File) {
      let filename = File.name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      /* fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      }); */
      fileReader.readAsDataURL(File)
      this.image = File
    },
    /*     previewImage(event) {
      let imageData = event.target.files[0];
      console.log(imageData.name);
    }, */
    moment: () => {
      return moment()
    },
    // moment: () => moment(),
    addProduct() {
      //*console.log("this.categoryID " + this.selectcategoryID);
      /*       console.log("this.defaultSelectedCategory  " + this.defaultSelectedCategory);
      console.log("this.defaultSelectedCategory.categoryID  " + this.defaultSelectedCategory.categoryID);
      console.log("this.defaultSelectedCategory.categoryname  " + this.defaultSelectedCategory.categoryname); */
      let id
      productsCollection
        .add({
          productName: this.editedItem.productName,
          productPrice: parseFloat(this.editedItem.productPrice),
          quantityPerUnit: parseFloat(this.editedItem.quantityPerUnit),
          categoryID: this.selectcategoryID,
          createdAt: new Date(),
          editedAt: new Date(),
          productCost: parseFloat(this.editedItem.productCost),
          productDetail: this.editedItem.productDetail,
          stockMinimum: this.editedItem.stockMinimum,
          productImageUrl: this.imageUrl
        })
        // eslint-disable-next-line no-unused-vars
        .then(function(docRef) {
          //*console.log("Document written with ID: ", docRef.id);
          id = docRef.id
          return id
        })
        .then(id => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          // console.log("products/" + id + ext);
          return storageRef.ref('products/' + id + ext).put(this.image)
        })
        .then(fileData => {
          storageRef
            .ref(fileData.metadata.fullPath)
            .getDownloadURL()
            .then(tmp => {
              this.imageUrl = tmp
            })
            .then(() => {
              productsCollection
                .doc(id)
                .update({ productImageUrl: this.imageUrl })
            })
            .then(() => {
              this.imageUrl = ''
              this.image = null
              this.initialize()
            })
        })

        // eslint-disable-next-line no-unused-vars
        .catch(function(error) {
          //*console.error("Error adding document: ", error);
        })
      this.productName = ''
      this.productPrice = ''
      this.productQuantity = ''
      this.categoryName = ''
      this.selectcategoryID = ''
      this.productCost = ''
      this.productDetail = ''
    },
    editProduct() {
      let id = this.editedItem.productID
      productsCollection
        .doc(this.editedItem.productID)
        .update({
          productName: this.editedItem.productName,
          productPrice: parseFloat(this.editedItem.productPrice),
          quantityPerUnit: parseFloat(this.editedItem.quantityPerUnit),
          categoryID: this.selectcategoryID,
          editedAt: new Date(),
          productCost: parseFloat(this.editedItem.productCost),
          productDetail: this.editedItem.productDetail,
          stockMinimum: this.editedItem.stockMinimum,
          productImageUrl: this.imageUrl
        })
        .then(() => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          // console.log("products/" + id + ext);
          return storageRef.ref('products/' + id + ext).put(this.image)
        })
        .then(fileData => {
          storageRef
            .ref(fileData.metadata.fullPath)
            .getDownloadURL()
            .then(tmp => {
              this.imageUrl = tmp
            })
            .then(() => {
              productsCollection
                .doc(id)
                .update({ productImageUrl: this.imageUrl })
            })
            .then(() => {
              this.imageUrl = ''
              this.image = ''
              this.initialize()
            })
        })
        // console.log("update");
        /*           this.products.forEach( product => {
            if(product.categoryID == this.selectcategoryID){
              product.push({
                ...product,
                hello = "world"
              })
              product.unshift({categoryName = editedItem.categoryName})
              product.unshift({categoryID = editedItem.categoryID})
            }
          }) */
        // this.products.put(this.editedItem);
        /*         .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        }) */
        // eslint-disable-next-line no-unused-vars
        .catch(function(error) {
          //*console.error("Error adding document: ", error);
        })
      this.productName = ''
      this.productPrice = ''
      this.productQuantity = ''
      this.categoryName = ''
      this.selectcategoryID = ''
      this.productCost = ''
      this.productDetail = ''
    },
    initialize() {
      // category list for add new product
      categoriesCollection.get().then(querySnapshot => {
        this.categoryList = querySnapshot.docs.map(doc => {
          let newCategoryList = doc.data()
          newCategoryList.categoryID = doc.id
          return newCategoryList
        })
      })
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
      productsCollection
        .orderBy('editedAt', 'desc')
        .get()
        .then(querySnapshot => {
          this.products = querySnapshot.docs.map(doc => {
            let newdoc
            newdoc = doc.data()
            newdoc.productID = doc.id
            /*           categoriesCollection
            .doc(newdoc.categoryID)
            .get()
            .then(querySnapshot => {
              newdoc.categoryName = querySnapshot.data().categoryName;
            }); */
            // set category to each product
            this.categoryList.forEach(cat => {
              if (newdoc.categoryID == cat.categoryID) {
                newdoc.categoryName = cat.categoryName
              }
            })
            // newdoc.editedAt = `${newdoc.editedAt}`
            newdoc.lastEdit = moment(newdoc.editedAt.toDate()).locale('th').format('L') + ' ' + moment(newdoc.editedAt.toDate()).locale('th').format('LTS')
            // newdoc.lastEdit = newdoc.editedAt.toDate()
            /* newdoc.lastEdit = moment(newdoc.editedAt.toDate())
              .locale('th')
              .format('LLLL') */
            return newdoc
          })
        })

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
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectcategoryID = item.categoryID
      this.selectcategoryName = item.categoryName
      this.dialogAddProdcut = true
    },

    deleteItem(item) {
      const index = this.products.indexOf(item)
      var result = confirm('Are you sure you want to delete this item?')
      if (result) {
        this.products.splice(index, 1)
        productsCollection.doc(item.productID).delete()
      }
    },

    close() {
      this.dialogAddProdcut = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
        this.products[this.editedIndex].categoryID = this.selectcategoryID
        this.products[this.editedIndex].categoryName = this.selectcategoryName

        this.editProduct()
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
        this.products.push(this.editedItem)

        this.addProduct()
      }
      this.close()
    },
    async uploadToFirebase() {
      const fileUpload = this.state.img
      const storage = storageRef.ref().child(`newsimg/${fileUpload.name}`)
      storage.put(fileUpload)
      const downloadURLx = await storage.getDownloadURL()
      this.setState({
        img: downloadURLx
      })
      this.props.createNews(this.state)
      this.props.history.push('/')
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>

<style></style>
