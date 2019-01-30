<template>
  <div>
    <!-- <Recipe
      name="Pressure Cooker Stew"
      description="So tasty you'll want to eat it a lot"
      :keywords="this.myTags" /> -->
    <Recipe v-bind="this.recipeToPass" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  // props: {
  //   msg: String
  // },
  components: {
    Recipe
  },
  data: function() {
    return {
      // myTags: ["Spicy", "Vegetarian"],
      recipeToPass: {
        name: "Delicious recipe",
        keywords: ["Spicy", "Vegetarian"],
        description:
          "So tasty you'll want to eat it all day and then some more!",
        ingredients: ["1lb chicken thighs", "1 yellow onion"]
      }
    };
  }
};

import Recipe from "./Recipe.vue";
</script>
