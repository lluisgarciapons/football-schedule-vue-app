<template>
  <div>
    <v-navigation-drawer
    app
    dark
    clipped
    :mini-variant="minivariant"
    v-model="drawer"
    mobile-break-point="100"
    width="200"
    class="drawer"
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <template v-if="isLogin">
          <v-list-tile-avatar>
            <img v-if="this.$store.getters.getUser.photoURL" :src=this.$store.getters.getUser.photoURL>
            <v-icon v-else size="50px">tag_faces</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="this.$store.getters.getUser.displayName">{{this.$store.getters.getUser.displayName}}</v-list-tile-title>
            <v-list-tile-title v-else>{{this.$store.getters.getUser.email}}</v-list-tile-title>
          </v-list-tile-content>
          </template>
          <template v-else>
          <v-list-tile-avatar>
            <v-icon size="50px">fingerprint</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content @click="drawer = false">
            <router-link to="/login" class="login-link">Log In</router-link>
          </v-list-tile-content>
          </template>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          @click="drawer = false"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar
    app
    dark
    color="#222333"
    clipped-left>
    <v-toolbar-side-icon
      @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon v-if="drawer" @click="minivariant = !minivariant">
        <v-icon v-if="minivariant">navigate_next</v-icon>
        <v-icon v-else>navigate_before</v-icon>
      </v-btn>
    
    <v-toolbar-title class="main_title">WEB TITLE <br><span class="subtitle">Subtitle</span></v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon to="/login">
      <v-icon v-if="isLogin" color="#7F723B" @click="logout()">account_circle</v-icon>
      <v-icon v-else>account_circle</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-toolbar>
    <!-- <pre>{{ $data }}</pre> -->
    <!-- <pre>{{$store.getters.getData.parents[0].company}}</pre> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      minivariant: false,
      items: [
        { title: "Home", icon: "dashboard", route: "/" },
        { title: "LaLiga", icon: "question_answer", route: "/datepicker" },
        { title: "Next matches", icon: "event", route: "/nextMatches" },
        { title: "Locations", icon: "location_on", route: "/locations" }
      ]
    };
  },
  methods: {
    logout() {
      var confirmLogout = confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.commit("changeIsLogin", false);
            this.$store.commit("changeUser", firebase.auth().currentUser);
          });
      }
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
.drawer {
  background-color: #232323;
  opacity: 0.95;
}

.main_title {
  font-size: 22px;
  line-height: 80%;
  font-weight: bold;
}

.subtitle {
  font-size: 13px;
  font-weight: normal;
}

.login-link {
  font-size: 20px;
  color: white;
}
</style>
