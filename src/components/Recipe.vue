<template>
  <div class="recipe">
    <div class="header">
      <div class="header-text">
        <h1>
          {{ name }}
          <i class="material-icons favorite" @click="favorite = !favorite">
            {{ favorite ? "favorite" : "favorite_border" }}
          </i>
        </h1>
        <p class="description">{{ description }}</p>
        <p>
          Tags:
          <md-button v-for="tag in keywords" :key="tag" class="md-raised">{{
            tag
          }}</md-button>
        </p>
        <md-button class="md-raised">Show more...</md-button>
      </div>
      <img :src="image" class="featured-image" />
    </div>
    <div class="ingredients-instructions-holder">
      <div class="ingredients">
        <p>Ingredients:</p>
        <ul>
          <li v-for="ingredient in ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="instructions">
        <p>Instructions:</p>
        <ol>
          <li v-for="step in instructions" :key="step">{{ step }}</li>
        </ol>
      </div>
    </div>
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
    totalTime: Number,
    image: String,
    instructions: Array
  }
};
</script>

<style scoped>
.recipe {
  display: flex;
  flex-direction: column;
  margin: 5em 5em auto;
  min-width: 21em;
  box-sizing: border-box;
  padding: 2em;
  padding-top: 5em;
  border: 1px solid #ddd;
  background-color: rgba(255, 253, 208, 0.2);
}
h1 {
  margin-top: 0px;
}
.ingredients-instructions-holder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.ingredients,
.instructions {
  min-width: 30em;
  max-width: 40em;
  /* flex-grow: 1.5; */
}
.header {
  display: flex;
  flex-direction: row;
  margin-bottom: 3em;
  /* border-top: 1px solid red; */
}
.header-text {
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
}
ul {
  /* display: inline; */
  list-style-type: none;
}
li {
  /* padding: 0.25em; */
  /* border: 1px solid #DDD; */
  /* display: inline; */
  margin-right: 0.5em;
  line-height: 1.5em;
  padding-bottom: 0.75em;
}
p.description {
  font-style: italic;
  font-size: 1.1em;
  font-weight: 300;
  width: 35em;
  line-height: 1.25em;
}
.favorite {
  color: red;
}
.favorite:hover {
  cursor: pointer;
}
.featured-image {
  /* display: none; */
  width: 500px;
  height: 300px;
}
</style>
