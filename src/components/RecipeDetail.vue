<template>
  <div>
    <h2 class="md-display-3">
      {{ recipe.name }}
      <i class="material-icons favorite" @click="favorite = !favorite">
        {{ favorite ? "favorite" : "favorite_border" }}
      </i>
    </h2>
    

    <p class="md-subheading">{{ recipe.description }}</p>
      <md-button v-for="tag in recipe.keywords" :key="tag">{{ tag }}</md-button>
    <img :src="recipe.image" class="md-layout-item md-large-size-50" />
    
    <div class="md-layout md-gutter steps-holder">
      <div class="md-layout-item md-medium-size-50 md-small-size-100">
        <h4 class="md-title">Ingredients</h4>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <div class="md-layout-item md-medium-size-50 md-small-size-100">
        <h4 class="md-title">Instructions</h4>
        <ol>
          <li v-for="step in recipe.instructions" :key="step">{{ step }}</li>
        </ol>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "RecipeDetail",
  props: {
    recipe: Object
  }
};
</script>

<style scoped>
.featured-image {
  padding: 0px;
  width: 50%;
}
.steps-holder {
  padding: 5em;
  line-height: 2em;
  justify-content: space-around;
}
.favorite {
  color: red;
}
.favorite:hover {
  cursor: pointer;
}
.md-card-holder {
  display: flex;
}
ol, ul {
  padding-left: 0px;
  list-style: none;
}
ol li {
  padding-bottom: 1em;
}
</style>
