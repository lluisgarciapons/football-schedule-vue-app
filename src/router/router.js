import Vue from "vue";
import Router from "vue-router";
import NextMatches from "../components/NextMatches.vue";
import Home from "../components/Home.vue";
import Datepicker from "../components/Datepicker.vue";
import Locations from "../components/Locations.vue";
import Match from "../components/Match.vue";
import Login from "../components/Login.vue";
import Signin from "../components/Signin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/datepicker",
      name: "datepicker",
      component: Datepicker
    },
    {
      path: "/nextMatches",
      name: "nextMatches",
      component: NextMatches
    },
    {
      path: "/locations",
      name: "locations",
      component: Locations
    },
    {
      path: "/match/:id",
      name: "match",
      props: true,
      component: Match
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/Signin",
      name: "Signin",
      component: Signin
    }
  ]
});
