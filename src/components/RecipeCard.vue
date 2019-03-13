<template>
  <md-card>
    <md-card-media-cover md-text-scrim>
      <md-card-media md-ratio="1:1">
        <img :src="image" />
      </md-card-media>

      <md-card-area class="custom-card">
        <md-card-header>
          <span class="md-title">{{ name }}</span>
          <!-- <span class="md-subhead">
            <ul>
              <li v-for="tag in keywords"
                :key="tag"
                class="">{{ tag }}</li>
            </ul>
          </span> -->
        </md-card-header>

        <md-card-actions md-alignment="space-between">
          <md-button @click="favoriteSwap" class="md-icon-button">
            <i class="material-icons favorite">
              {{ favorite ? "favorite" : "favorite_border" }}
              <!-- {{ favorite_border }} -->
            </i>
          </md-button>

          <md-button>Read Recipe<md-icon class="icon-right">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-actions>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
export default {
  name: "RecipeCard",
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
    prepTime: String,
    recipeCategory: String,
    recipeCusine: String,
    recipeInstructions: Array,
    recipeYield: String,
    totalTime: String,
    image: String,
    instructions: Array
  },
  methods: {
    favoriteSwap() {
      // this.favorite = !this.favorite
      this.$emit("favoriteUpdated", this.recipe);
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
  min-width: 300px;
  max-width: 600px;
  /* width: 20vw; */
  flex-grow: 1;
  margin: 1em;
  display: inline;
  vertical-align: top;
}
.custom-card {
  background: linear-gradient(
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.3) 66%,
    rgba(0, 0, 0, 0.5) 100%);
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
