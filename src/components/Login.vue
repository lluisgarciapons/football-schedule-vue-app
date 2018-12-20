<template>
  <div class="page">
    <v-form v-if="!isLogin">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <h2>LOGIN</h2>
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
      <v-btn @click="loginEmail()" class="mb-4" color="green lighten-1" dark>Log In</v-btn>
      <v-btn @click="loginUser()" class="mb-4"><img class="google-img" src="/images/google_PNG.png"/>Sign In With Google</v-btn>
  <v-spacer></v-spacer>
  <router-link to="/Signin">create an account</router-link>
    </div>
  </v-form>
  
  <div v-else class="text-xs-center">
    <div class="loggedin" :class="{heart_rain : isIngrid}">
    <h4>YOU ARE LOGGED IN!</h4>
  <h4>as:</h4>
  <h2 v-if="this.$store.getters.getUser.displayName">{{this.$store.getters.getUser.displayName}}</h2>
    <h2 v-else>{{this.$store.getters.getUser.email}}</h2>
  <div v-if="this.$store.getters.getUser.photoURL" class="mb-5 mt-5">
  <img class="avatar" :src="this.$store.getters.getUser.photoURL">
  </div>
  <div v-else class="mb-5 mt-5">
  <v-icon size="185px">tag_faces</v-icon>
  </div>
  <v-btn @click="logout()">LOG OUT</v-btn>
  </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
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
      password: "",
      password2: "",
      test: null,
      error: false
    };
  },
  methods: {
    loginUser() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$store.commit("changeIsLogin", true);
          this.$store.commit("changeUser", firebase.auth().currentUser);
        });
    },
    loginEmail() {
      var that = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit("changeIsLogin", true);
          this.$store.commit("changeUser", firebase.auth().currentUser);
        })
        .catch(function(error) {
          that.test = error.message;
          that.error = true;
        });
    },
    logout() {
      var confirmLogout = confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.commit("changeIsLogin", false);
            this.$store.commit("changeUser", firebase.auth().currentUser);
            this.error = false;
          });
      }
    }
  },

  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
    isIngrid() {
      if (
        this.$store.getters.getUser.email == "ingridmatamala2001@gmail.com" ||
        this.$store.getters.getUser.email == "ingridmatamala14@icloud.com" ||
        this.$store.getters.getUser.email == "eparrello@gmail.com"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.google-img {
  width: 35px;
}

.avatar {
  border-radius: 50%;
  width: 50%;
}

.heart_rain {
  height: 100vh;
  background-image: url("/images/heart.gif");
  background-position: center 0;
}
</style>
