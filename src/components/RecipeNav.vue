<template>
  <div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecipeNav",
  props: {
    recipes: Array
  }
};
</script>

<style scoped>
ul {
  line-height: 1.5em;
}
li {
  display: inline-block;
  /* padding: 0.5em; */
  /* border: 1px solid; */
  /* line-height: 1.5em; */
  margin-right: 1em;
}
</style>
