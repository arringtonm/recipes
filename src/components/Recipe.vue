<template>
  <div class="md-card-holder">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{ name }}</div>
      </md-card-header>
      <md-card-content>
        <md-button
        v-for="tag in keywords"
        :key="tag"
        class="very-dense">{{ tag }}</md-button>
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
          <md-card-content>
          {{ description }}  
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
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
.md-card-content {
  text-align: left;
}
.very-dense {
  height: 1.5em;
  min-width: 0px;
  font-size: 12px;
  padding: 0.25em;
}
</style>
