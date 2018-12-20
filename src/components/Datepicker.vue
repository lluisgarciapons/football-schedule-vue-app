<template>
<div class="page">
  <img src="..\..\public\images\laliga-logo.png" class="laliga-logo" alt="laliga">
   <v-flex xs10 offset-xs1 sm8 offset-sm2 md4>
      <v-dialog
        ref="dialog1"
        v-model="modal1"
        :return-value.sync="date1"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date1"
          label="Choose starting date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" color="green lighten-1" scrollable first-day-of-week="1" min="2018-08-17" max="2019-05-26">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="date2"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date2"
          label="Choose ending date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" color="green lighten-1" scrollable first-day-of-week="1" :min="date1">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog2.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <div class="text-xs-center">
      <v-btn
        color="green"
        dark
        @click="info = true, searchMatches()"
      >
        Search Matches
      </v-btn>
      <v-btn
        color="#7F723B"
        dark
        @click="info = true, searchTodayMatches()"
      >
        Today's
      </v-btn>
      <v-spacer></v-spacer>
    <template v-if="info">
      <v-progress-circular
      v-if="matchesLoading"
      indeterminate
      color="#456789"
      :size="150"
      :width="9"
      class="mt-10"
    ></v-progress-circular>
    <!-- <pre v-else-if="SpainMatches != undefined && SpainMatches.length > 0" v-for="match in SpainMatches" :key="match.id">{{match.homeTeam.name}} vs {{match.awayTeam.name}}</pre> -->

    <v-layout v-else-if="SpainMatches != undefined && SpainMatches.length > 0">
    <v-flex xs12 sm8 offset-sm2>
      <v-card v-for="match in SpainMatches" :key="match.id" class="card ma-4" color="#222444d4" dark :to="`/match/${match.id}`">
        <v-card-title primary-title class="align-center">
          <div class="match">
            <div class="logo"><img :src="`/images/LFPteamLogo/${match.homeTeam.id}.png`" :alt=match.homeTeam.name></div>
            <h3 class="team">{{match.homeTeam.name}}</h3> 
            <div class="vs">vs.</div>  
            <h3 class="team">{{match.awayTeam.name}}</h3>
            <div class="logo"><img :src="`/images/LFPteamLogo/${match.awayTeam.id}.png`" :alt=match.awayTeam.name></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>



    <v-alert
      v-else-if="SpainMatches != undefined"
      :value="true"
      type="warning"
    >
      No matches found.
    </v-alert>
    <v-alert
      v-else
      :value="true"
      type="error"
    >
      {{getError}}
    </v-alert>
    </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      date1: null,
      date2: null,
      modal1: false,
      modal2: false,
      info: false
    };
  },
  methods: {
    searchMatches: function() {
      this.$store.commit("changeMatchesLoading", true);
      this.$store.commit("changeDates", { start: this.date1, end: this.date2 });
      this.$store.dispatch("getMatches");
    },
    searchTodayMatches: function() {
      this.$store.commit("changeMatchesLoading", true);
      this.$store.commit("changeDates", {
        start: new Date().toISOString().substr(0, 10),
        end: new Date().toISOString().substr(0, 10)
      });
      this.$store.dispatch("getMatches");
    }
  },
  computed: {
    SpainMatches() {
      // return this.$store.getters.getMatchesData.matches;
      if (
        this.$store.getters.getMatchesData != null &&
        this.$store.getters.getMatchesData.hasOwnProperty("matches")
      ) {
        return this.$store.getters.getMatchesData.matches.filter(match => {
          return match.competition.id == "2014";
        });
      } else {
        return undefined;
      }
    },
    getError() {
      if (
        this.$store.getters.getMatchesData != null &&
        !this.$store.getters.getMatchesData.hasOwnProperty("matches")
      ) {
        return this.$store.getters.getMatchesData.message;
      } else {
        return undefined;
      }
    },
    matchesLoading() {
      return this.$store.getters.getMatchesLoading;
    }
  },
  created() {
    if ("matchesData" in localStorage) {
      this.info = true;
    }
  }
};
</script>

<style scoped>
.laliga-logo {
  width: 70%;
  display: block;
  margin: 10px auto;
}

.align-center {
  display: flex;
  justify-content: center;
}

.card {
  box-shadow: inset 0 0 5px #3a3a3a;
}

.match {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.vs {
  font-size: 10px;
  /* width: 10%;
  height: 100%;
  background-image: url("/images/vs.png");
  background-size: 100%;
  background-position: center; */
}

.team,
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  font-size: 14px;
  font-weight: 700;
}

.logo {
  width: 10%;
}

.logo img {
  width: 100%;
}
</style>
