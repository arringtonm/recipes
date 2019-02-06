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
li {
  display: inline;
  padding: 0.5em;
  border: 1px solid;
  margin-right: 1em;
}
</style>
