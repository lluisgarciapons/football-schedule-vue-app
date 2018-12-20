<template>
<div class="page">
<div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn
        slot="activator"
        color="#7F723B"
        dark
      >
        Choose jornada
      </v-btn>

      <v-list>
        <!-- <v-subheader>choose:</v-subheader> -->
        <v-list-tile
          v-for="jornada in jornadas"
          :key="jornada"
          @click="sheet = false, number = jornada"
        >
          <v-list-tile-title>jornada: {{ jornada }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>

  <h1>{{ number }}</h1>

  <pre v-for="match in nextMatchesJor" :key="match.num">{{match}}</pre>




  <!-- <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="(match, index) in jornadas"  
          :key="index"
          md4
          xs12
          elevation-3
          mb-2
          >
            <v-parallax
              dark
              src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
              height="100"
            >
              <v-layout
                align-center
                column
                justify-center
              >
                <h1 class="display-2 font-weight-thin mb-3">jornada {{ match }}</h1>
                <h4 class="subheading">Build your application today!</h4>
              </v-layout>
            </v-parallax>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card> -->
</div>
</template>
<script>
export default {
  data() {
    return {
      sheet: false,
      number: null,
      nextMatches: this.$store.getters.getData.nextmatches
    };
  },

  computed: {
    jornadas: function() {
      return [...new Set(this.nextMatches.map(match => match.jornada))];
    },

    nextMatchesJor: function() {
      return this.nextMatches.filter(match => match.jornada === this.number);
    }
  }
};
</script>
<style>
</style>
