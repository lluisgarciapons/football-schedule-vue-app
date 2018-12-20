<template>
  <div class="page">
    <div class="badges">
      <div class="team homeTeam" :class="{ winner: winnerHome}">
      <img :src="`/images/LFPteamLogo/${match.homeTeam.id}.png`" :alt="`${match.homeTeam.name}`" class="logo">
      <p class="name">{{match.homeTeam.name}}</p>
      </div>
      <div class="team awayTeam" :class="{ winner: winnerAway}">
      <img :src="`/images/LFPteamLogo/${match.awayTeam.id}.png`" :alt="`${match.awayTeam.name}`" class="logo">
      <p class="name">{{match.awayTeam.name}}</p>
      </div>
    </div>
    <template v-if="match.status == 'FINISHED'">
    <div class="result" >
        <div class="score">{{match.score.fullTime.homeTeam}}</div>
        <div class="score">{{match.score.fullTime.awayTeam}}</div>
    </div>
        <div class="text-xs-center">FINISHED</div>
        <div class="date text-xs-center">{{date}}</div>
        </template>
        <template  v-else-if="match.status == 'IN_PLAY' || match.status == 'PAUSED'">
    <div class="result in_play">
        <div class="score">{{match.score.fullTime.homeTeam}}</div>
        <div class="score">{{match.score.fullTime.awayTeam}}</div>
    </div>
        <div class="text-xs-center" v-if="match.status == 'IN_PLAY'">IN PLAY</div>
        <div class="text-xs-center" v-if="match.status == 'PAUSED'">PAUSED ('45)</div>
        <div class="date text-xs-center">{{date}}</div>
        </template>
        <template  v-else>
    <div class="result scheduled">
        <div class="score">-</div>
        <div class="score">-</div>
    </div>
        <div class="text-xs-center">SCHEDULED</div>
        <div class="date text-xs-center">{{date}}</div>
        </template>
        <div class="buttons">
        <v-btn
            fab
            dark
            color="#222333d4"
            to="/datepicker"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
        <v-btn
        v-if="winner"
        class="mt-4"
        :class="{pink : celebrate}"
            :dark="celebrate"
            flat
            small
            absolute
            right
            @click="celebrate = !celebrate"
          >
            CELEBRATE
          </v-btn>
          </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      celebrate: false
    };
  },
  computed: {
    match() {
      return this.$store.getters.getMatchesData.matches
        .filter(match => {
          return match.competition.id == "2014";
        })
        .find(el => {
          return el.id == this.id;
        });
    },
    winner() {
      if (
        this.match.status == "FINISHED" &&
        (this.match.score.fullTime.homeTeam >
          this.match.score.fullTime.awayTeam ||
          this.match.score.fullTime.homeTeam <
            this.match.score.fullTime.awayTeam)
      ) {
        return true;
      } else {
        return false;
      }
    },
    winnerHome() {
      if (
        this.celebrate &&
        this.match.status == "FINISHED" &&
        this.match.score.fullTime.homeTeam > this.match.score.fullTime.awayTeam
      ) {
        return true;
      } else {
        return false;
      }
    },
    winnerAway() {
      if (
        this.celebrate &&
        this.match.status == "FINISHED" &&
        this.match.score.fullTime.homeTeam < this.match.score.fullTime.awayTeam
      ) {
        return true;
      } else {
        return false;
      }
    },
    date() {
      var date = new Date(this.match.utcDate);
      var h = date.getHours();
      var m = date.getMinutes();

      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      m = checkTime(m);

      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";

      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      return `${weekday[date.getDay()].slice(0, 3)} ${date.getDate()} ${
        month[date.getMonth()]
      }
              ${h}:${m} h.`;
    }
  }
};
</script>

<style scoped>
.badges {
  display: flex;
  justify-content: space-around;
}

.logo {
  width: 120px;
  margin: 10px;
}

.name {
  font-size: 25px;
  box-sizing: border-box;
  width: 100%;
}

.team {
  width: 50%;
  height: 230px;
  /* border: 1px solid black; */
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.result {
  background-color: rgb(230, 230, 230);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  box-shadow: inset 0 0 5px #a8a6a6;
}

.score {
  font-size: 50px;
  margin: 5px 0;
  color: rgb(102, 102, 102);
}

.in_play {
  background-color: rgb(144, 231, 144);
}

.date {
  font-size: 20px;
}

.winner {
  background-image: url("/images/confetti.gif");
  background-size: 150%;
  background-position: center;
}
</style>
