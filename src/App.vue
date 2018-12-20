<template>
<v-app>
  <div id="app" :class="{loading_stage: loading}">
    <template v-if="loading">
      <app-loading></app-loading>
    </template>
    <template v-else>
    <app-header></app-header>
    <router-view>
    </router-view>
    </template>
  </div>
  </v-app>
</template>
<script>
/* eslint-disable */
import Header from "./components/Header";
import Loading from "./components/Loading";
export default {
  components: {
    "app-header": Header,
    "app-loading": Loading
  },
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
      // return true;
    }
  }
};
</script>


<style>
#app {
  font-family: "Nunito", sans-serif;
  background-color: white;
}

.loading_stage {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  margin-top: 56px;
}
</style>
