<template>
  <div id="drawer">
    <v-app-bar app dense flat dark hide-on-scroll color="primary" class="">
      <v-btn text @click.stop="drawer = !drawer" class="">
        <i class="material-icons">menu</i>
      </v-btn>
      <v-toolbar-title>ร้านมุมินการค้า</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      width="200"
      id="drawer"
      app
      absolute
      dark
      color="info"
      style="position:fixed; top:0; left:0;"
    >
      <v-img :aspect-ratio="1 / 1" src="">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <!-- <div class="subheading">ระบบจัดการร้านวัสดุก่อสร้าง</div> -->
            <div class="body-1"></div>
          </v-col>
        </v-row>
      </v-img>
      <!-- <hr> -->
      <v-list>
        <v-list-item-group color="white">
        <!-- <v-list-item-group mandatory color="white"> -->
          <div>
            <v-list-item
              v-for="([icon, text, url], i) in items"
              :key="i"
              link
              @click="onClickMenu(url)"
              shaped
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item @click="onClickSignOut()">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>ออกจากระบบ</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Drawer",
  mounted() {
 
    // this.$store.dispatch("doLogin");
    // console.log("hello from drawer mounted");
    
  },
  created(){
    // console.log("hello from drawer created");
/*    if(firebase.auth().currentUser){
      this.loggedIn = true;

    } */
  },
  data: () => ({
    drawer: null,
    items: [
      ["view_comfortable", "คลังสินค้า", "/stock"],
      ["add_box", "นำเข้า", "/stock/import"],
      ["shopping_cart", "หน้าร้าน", "/shop"],
      ["show_chart", "รายงาน", "/report"],
      ["history", "ประวัติ", "/transaction"],
      ["people", "ลูกค้า", "/customer"],
      ["business", "ผู้ผลิต", "/supplier"],
    ],
    loggedIn: false
  }),
  methods: {
    onClickMenu(url) {
      this.$router.push(url).catch(err => err);
    },
    onClickSignOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
          this.$store.dispatch("user/doLogout");
        });
    }
  },
/*   setupFirebase() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("signed in");
        this.loggedIn = true;
        this.$store.dispatch("doLogin");
      } else {
        // No user is signed in.
        this.loggedIn = false;
        console.log("signed out", this.loggedIn);
        this.$router.replace("/login");
      }
    });
  } */
};
</script>

<style></style>
