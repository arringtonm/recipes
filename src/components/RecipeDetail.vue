<template>
  <div class="md-card-holder">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{ name }}</div>
        <md-card-subheader>{{ description }}</md-card-subheader>
        <md-card-content>
          <md-button v-for="tag in keywords" :key="tag">{{ tag }}</md-button>
        </md-card-content>
        <!-- <img :src="image" class="featured-image" /> -->

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <i class="material-icons favorite" @click="favorite = !favorite">
                {{ favorite ? "favorite" : "favorite_border" }}
              </i>
            </div>

            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content>
            <md-card-content
              ><ul>
                <li v-for="ingredient in ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
              <ol>
                <li v-for="step in instructions" :key="step">{{ step }}</li>
              </ol>
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card-header>
    </md-card md-with-hover>
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
.favorite {
  color: red;
}
.favorite:hover {
  cursor: pointer;
}
.md-card-holder {
  display: flex;
}
.md-card {
  min-width: 250px;
  width: 20vw;
  margin: 1em;
  display: inline;
  vertical-align: top;
}
</style>
