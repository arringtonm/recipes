<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
// import Recipe from "./components/Recipe.vue";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style>
body {
  /* background-color: #efede5; */
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
