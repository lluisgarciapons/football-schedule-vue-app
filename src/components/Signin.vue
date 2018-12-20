<template>
  <div class="page">
    <template v-if="!isLogin">
    <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <h2>SIGN IN</h2>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Your Name"
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            clearable
          >
          </v-text-field>
          <v-text-field
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.counter]"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            v-model="password"
            value=""
            class="input-group--focused"
            @click:append="show = !show"
            clearable
          ></v-text-field>
          <v-text-field
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.counter]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm Password"
            v-model="password2"
            value=""
            class="input-group--focused"
            @click:append="show2 = !show2"
            clearable
          ></v-text-field>
          <v-alert
          v-if="error"
      :value="true"
      type="error"
    >
      {{test}}
    </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="buttons text-xs-center">
  <v-btn @click="createUser()" color="mb-4 blue lighten-1" dark>create account</v-btn>
  <v-btn @click="loginUser()" class="mb-4"><img class="google-img" src="/images/google_PNG.png"/>Sign In With Google</v-btn>
  <v-spacer></v-spacer>
  <router-link to="/login">Back to Login</router-link>
  </div>
  </v-form>
  </template>
  <template v-else>
    <app-login></app-login> 
  </template>
  </div>
</template>

<script>
import firebase from "firebase";
import Login from "./Login";
export default {
  components: {
    "app-login": Login
  },
  data() {
    return {
      name: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length >= 6 || "Min 6 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      show: false,
      show2: false,
      password: "",
      password2: "",
      test: null,
      error: false
    };
  },
  methods: {
    createUser() {
      if (this.password == this.password2) {
        var that = this;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: that.name
              })
              .then(
                firebase.auth().currentUser.SetUserProperty("team", "lions")
              )
              .then(() => {
                that.$store.commit("changeIsLogin", true);
                that.$store.commit("changeUser", firebase.auth().currentUser);
                console.log(firebase.auth().currentUser);
              });
          })
          .catch(error => {
            // Handle Errors here.
            that.test = error.message;
            that.error = true;
          });
      } else {
        this.test = "Incorrect password validation";
        this.error = true;
      }
    },
    loginUser() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$store.commit("changeIsLogin", true);
          this.$store.commit("changeUser", firebase.auth().currentUser);
          // this.$router.push("/login");
        });
    }
  },

  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    }
  }
};
</script>

<style scoped>
.google-img {
  width: 35px;
}
</style>
