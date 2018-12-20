<template>
<div class="page">
  <!-- <h1>HOME PAGE</h1>  -->
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="(item, index) in news"  
          :key="index"
          md4
          xs12
          elevation-3
          mb-2
          @click="changeShow(index); show = !show; key = index"
          >
            <v-card color="grey lighten-3" class="white--text card">
              
              <v-img
              class="half image"
              :src="`images/news/${item.photo}`"
              height="100%"
              
        >
        <v-card-actions>
                Click for more info<v-icon size="15px" color="#7F723B">info</v-icon>
              </v-card-actions>
         </v-img>
         <v-spacer></v-spacer>
                <div class="news_title half">{{item.title}}
                </div>
              <v-slide-y-transition>
          <v-card-text v-show="show && (key==index)" class="black--text">
            {{item.description}}
          </v-card-text>
        </v-slide-y-transition>
        
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      key: null
    };
  },
  methods: {
    changeShow(index) {
      if (index != this.key) {
        this.show = false;
      }
    }
  },
  computed: {
    news() {
      return this.$store.getters.getData.news;
    }
  }
};
</script>
<style scoped>
.card {
  display: flex;
  flex-flow: row wrap;
}

.news_title {
  color: #232323;
  font-weight: thin;
  font-size: 16px;
  background-color: rgba(250, 250, 250, 0.8);
  padding: 5px;
  /* border-radius: 10px; */
}

.half {
  width: 50%;
}
</style>
