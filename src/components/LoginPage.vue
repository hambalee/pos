<template>
  <div id="login" class="main-box">
    <v-row class="justify-center">
      <v-card style="width:400px;">
        <!--        <v-img
          class="white--text align-end"
          src="https://picsum.photos/500/300"
          height="200px"
        >
          <v-card-title primary-title>
            Login
          </v-card-title>
        </v-img> -->

        <!-- 
 <form @submit="loginWithEmail">
      <h1>Login</h1>
      <div class="title">
        <h3>Email</h3>
        <input v-model="email" type="text" class="input"       placeholder="Email">
      </div>
      <div class="title">
         <h3>Password</h3>
         <input v-model="password" type="password" class="input" placeholder="Password">
      </div>
      <button type="submit" value="submit" class="btn">Login</button>
    </form> -->

        <v-card-text>
          <v-form @submit.prevent="loginWithEmail">
            <!-- Username -->
            <v-text-field
              name="email"
              label="Email"
              id="email"
              v-model="email"
            />

            <!-- Password -->
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
            />

            <v-row class="justify-space-between px-3 pt-5">
              <!-- <v-btn text @click.prevent="$router.push('/register')"
                >Register</v-btn
              > -->
              <v-btn type="submit" color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "LoginPage",
  mounted() {
    // var user = firebase.auth().currentUser;
/*     if (this.$store.getters.isLogin) {
      console.log("logggggggedin");
      
      this.$router.replace("/stock");
    }  */
  },
  data: function() {
    return { email: "", password: "", isShowPassword: false };
  },
  methods: {
    loginWithEmail(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$store.dispatch("doLogin");
            this.$router.replace("/stock");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  },
  computed: {
    alreadyLogin(){
      return this.$store.getters.isLogin
    }
  },
  watch: {
    alreadyLogin(value){
      if (value) {
            this.$router.replace("/stock");
      }
    }
  }
};
</script>
