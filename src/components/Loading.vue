<template>
<div class="body">
  <div class="loading"></div>
  <h1 class="loading_title">LOADING</h1>
  <!-- <h1 class="loading_title2">LOADING</h1> -->
  <h1 class="loading_title3">LOADING</h1>
</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  margin: auto;
  width: 200px;
  height: 200px;
  background: url("../assets/loading.gif");
  background-size: 400%;
  background-repeat: no-repeat;
  background-position: center;
}

.loading_title,
.loading_title2,
.loading_title3 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: rgba(58, 58, 58, 0.863);
  letter-spacing: 10px;
  margin: auto;
  text-align: center;
  line-height: 10px;
}

.loading_title2 {
  letter-spacing: 15px;
  font-size: 40px;
  color: rgba(127, 131, 134, 0.493);
}

.loading_title3 {
  letter-spacing: 20px;
  font-size: 50px;
  color: rgba(127, 131, 134, 0.171);
}
</style>
