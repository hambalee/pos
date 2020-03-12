<template>
  <v-app>
    <!--     <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <Drawer v-if="$store.state.isLogged" />
    <Views />
  </v-app>
</template>

<script>
import Drawer from "@/components/core/Drawer";
import Views from "@/components/core/Views";
// import firebase from "firebase";

export default {
  name: "App",

  components: {
    Drawer,
    Views
  },

  created() {
    // this.$store.dispatch({ type: "restoreLogin" });
    console.log("hello from app created");
    // console.log(this.$store.getters.isLogin);

//check login
/*     firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User is logined from app created");
        // update data or vuex state
        this.$store.dispatch("doLogin");
      } else {
        console.log("User is not logged in. from app created");
      }
    }); */
    // console.log(firebase.auth().currentUser?"hello":"worl");
  },
  mounted() {
    console.log("hello from app mouted");
    // console.log("in app mouted",this.$store.getters.isLogin);
    // console.log(firebase.auth().currentUser);
    // this.$store.dispatch({ type: "restoreLogin" });
  },

  data: () => ({
    //
  })
};
</script>
