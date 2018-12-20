import "@babel/polyfill";
import Vue from "vue";
import "./plugins/axios";
import axios from "axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import firebase from "firebase";

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-0BjHhfxu1siJf34klC3SCtpEtsXTEMU",
  authDomain: "laliga-vue-app.firebaseapp.com",
  databaseURL: "https://laliga-vue-app.firebaseio.com",
  projectId: "laliga-vue-app",
  storageBucket: "",
  messagingSenderId: "642435221857"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch("getInitialData");

    var hours = 1; // Reset when storage is more than 1hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    } else if ("matchesData" in localStorage) {
      var data = JSON.parse(localStorage.getItem("matchesData"));
      axios
        .get(
          `https://api.football-data.org/v2/matches?dateFrom=${
            data.filters.dateFrom
          }&dateTo=${data.filters.dateTo}`,
          {
            headers: {
              "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01",
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          localStorage.setItem("matchesData", JSON.stringify(response.data));
          this.$store.commit("postMatchesData", response.data);
          this.$store.commit("changeMatchesLoading", false);
        })
        .catch(error => {
          this.$store.commit("postMatchesData", error.response.data);
          this.$store.commit("changeMatchesLoading", false);
        });
    }
  }
}).$mount("#app");
