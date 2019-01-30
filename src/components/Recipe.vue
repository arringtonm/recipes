<template>
  <div class="recipe">
    <h3>{{ name }}
      <i
        class="material-icons shift-down"
        @click="favorite = !favorite">
          {{ favorite ? "favorite" : "favorite_border" }}
      </i>
    </h3>
    <p class="description">{{ description }}</p>
    <p>
      Tags:
      <md-button v-for="tag in keywords" :key="tag" class="md-raised">{{
        tag
      }}</md-button>
    </p>
    <p>Ingredients:</p>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Recipe",
  props: {
    favorite: Boolean,
    id: Number,
    name: String,
    description: String,
    keywords: Array,
    cookTime: String,
    cookingMethod: String,
    ingredients: Array,
    nutrition: String,
    prepTime: Number,
    recipeCategory: String,
    recipeCusine: String,
    recipeInstructions: Array,
    recipeYield: Number,
    totalTime: Number
  }
};
</script>

<style scoped>
.recipe {
  margin: 5em;

}
ul {
  /* display: inline; */
  list-style-type: none;
}
ul li {
  padding: 0.25em;
  /* border: 1px solid #DDD; */
  /* display: inline; */
  margin-right: 0.5em;
}
p.description {
  font-style: italic;
}
.shift-down {
  transform: translate(0.25em, 0.25em);
}
.shift-down:hover {
  cursor: pointer;
}
</style>
