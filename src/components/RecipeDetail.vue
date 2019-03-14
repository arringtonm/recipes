<template>
  <div>
    <div class="hero-header">
      <!-- <div class="title-pic md-medium-size-50" :style="{ backgroundImage: `url(${this.recipe.image})`, backgroundSize: 'cover' }"> -->
      <div class="info-tags">
        <h2 class="md-display-1 md-title">
          {{ recipe.name }}
          <i class="material-icons favorite" @click="favoriteSwap">
            {{ recipe.favorite ? "favorite" : "favorite_border" }}
          </i>


        </h2>
        <p class="md-subheading">{{ recipe.description }}</p>
        <p class="tags">Tags:</p>
        <md-button v-for="tag in recipe.keywords" :key="tag" class="keyword" >{{
          tag
        }}</md-button>
      </div>

      <div>
        <img :src="recipe.image" :alt="recipe.name" class="md-medium-size-30 md-small-size-50" />
      </div>
    </div>

    <!-- <img :src="recipe.image" class="md-layout-item md-large-size-50" /> -->

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
  },
  methods: {
    favoriteSwap() {
      console.log('from detailview');
      this.$emit("favoriteUpdated", this.recipe);
    }
  }
  // computed: {
  //   randomId() {
  //     return '_' + Math.random().toString(36).substr(2, 9);
  //   }
  // watched: {
  //   heroHeaderStyle: function() {
  //     return {
  //       backgroundImage: 'url(' + this.recipe.image + ')',
  //       backgroundSize: 'cover'
  //     }
  //   }
  // }
};
</script>

<style scoped>
.hero-header {
  display: flex;
  flex-direction: row;
}
.title-pic {
  /* min-width: 400px;
  height: 400px; */
}
.info-tags {
  margin-right: 2em;
}
.steps-holder {
  padding: 5em;
  line-height: 2em;
  justify-content: space-around;
}
.tags {
  transform: translateY(1em);
  margin-top: 0.5em;
  /* font-weight: bold; */
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
ol,
ul {
  padding-left: 0px;
  list-style: none;
}
ol li {
  padding-bottom: 1em;
}
</style>
