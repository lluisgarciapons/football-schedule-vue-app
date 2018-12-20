import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    matchesData: null,
    loading: true,
    matchesLoading: true,
    startingDate: null,
    endingDate: null,
    isLogin: false,
    user: null
  },
  getters: {
    getData: state => {
      return state.data;
    },
    getLoading: state => {
      return state.loading;
    },
    getMatchesLoading: state => {
      return state.matchesLoading;
    },
    getMatchesData: state => {
      return state.matchesData;
    },
    getIsLogin: state => {
      return state.isLogin;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    postData(state, payload) {
      state.data = payload;
    },
    postMatchesData(state, payload) {
      state.matchesData = payload;
    },
    changeLoading(state, payload) {
      state.loading = payload;
    },
    changeMatchesLoading(state, payload) {
      state.matchesLoading = payload;
    },
    changeDates(state, payload) {
      state.startingDate = payload.start;
      state.endingDate = payload.end;
    },
    changeIsLogin(state, payload) {
      state.isLogin = payload;
    },
    changeUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    getInitialData({ commit }) {
      axios.get("https://api.myjson.com/bins/18u6wk").then(response => {
        commit("postData", response.data);
        commit("changeLoading", false);
      });

      // axios
      //   .get(
      //     "https://api.football-data.org/v2/matches?dateFrom=2018-10-19&dateTo=2018-10-29",
      //     {
      //       headers: {
      //         "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01",
      //         "Content-Type": "application/json"
      //       }
      //     }
      //   )
      //   .then(response => {
      //     commit("postMatchesData", response);
      //     commit("changeLoading", false);
      //   });
    },

    getMatches({ commit }) {
      axios
        .get(
          `https://api.football-data.org/v2/matches?dateFrom=${
            this.state.startingDate
          }&dateTo=${this.state.endingDate}`,
          {
            headers: {
              "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01",
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          localStorage.setItem("matchesData", JSON.stringify(response.data));
          commit("postMatchesData", response.data);
          commit("changeMatchesLoading", false);
        })
        .catch(error => {
          commit("postMatchesData", error.response.data);
          commit("changeMatchesLoading", false);
        });
    }
  }
});
