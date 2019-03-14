<template>
  <md-card>
    <md-card-media-cover md-text-scrim>
      <md-card-media md-ratio="16:9">
        <img :src="recipe.image" />
      </md-card-media>

      <md-card-area class="custom-card">
        <md-card-header class="custom-header">
          <!-- <span class="md-subheading">Featured Recipe</span> -->
          <p class="md-display-2 custom-fake-button" role="button" @click="recipeSelectEmit" aria-role md-alignment="top">{{ recipe.name }}</p>
          <span class="md-title custom-description">{{ recipe.description }}</span>
          <br><br>
        </md-card-header>
        <md-card-actions md-alignment="space-between">
          <md-button @click="favoriteSwap" class="md-icon-button">
            <i class="material-icons favorite">
              {{ recipe.favorite ? "favorite" : "favorite_border" }}
            </i>
          </md-button>
          <md-button @click="recipeSelectEmit">Read Recipe<md-icon class="icon-right">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-actions>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
export default {
  name: "RecipeCardFeatured",
  props: {
    recipe: Object
  },
  // props: {
  //   favorite: Boolean,
  //   id: Number,
  //   name: String,
  //   description: String,
  //   keywords: Array,
  //   cookTime: String,
  //   cookingMethod: String,
  //   ingredients: Array,
  //   nutrition: String,
  //   prepTime: String,
  //   recipeCategory: String,
  //   recipeCusine: String,
  //   recipeInstructions: Array,
  //   recipeYield: String,
  //   totalTime: String,
  //   image: String,
  //   instructions: Array
  // },
  methods: {
    favoriteSwap() {
      this.$emit("favoriteUpdated", this.recipe);
    },
    recipeSelectEmit() {
      this.$emit("recipeSelected", this.recipes);
    }
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
.icon-right {
  color: white !important;
  transform: translateY(-0.075em);
}
.md-card {
  min-width: 260px;
  max-width: 600px;
  flex-grow: 1;
  margin: 1em;
  display: inline;
  vertical-align: top;
}
.custom-header {
  /* position: absol  ute; */
}
.custom-card {
  background: linear-gradient(
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.3) 66%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.custom-button {
  text-transform: none;
  white-space: pre-wrap;
  height: 100%;
  text-align: left;
}
.custom-fake-button {
  line-height: 1.15em !important;
  color: white !important;
  /*
  /* move text to top somehow
  /*
  /* margin-top: 0 !important; */
  /* position: relative; */
  /* top: -10em; */
}
.custom-fake-button:hover {
  cursor: pointer;
  text-decoration: underline;
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
