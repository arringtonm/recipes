<template>
  <div>
    <SearchBar
      :searchTerm="searchTerm"
      @searchTermUpdated="searchTerm = $event"
      @searchReset="searchTerm = null"
    />
    <!-- <RecipeNav :recipes="searchFiltered" /> -->
    <div class="recipe-holder">
      <Recipe
        v-for="(recipe, index) in searchFiltered"
        v-bind="recipes[index]"
        :key="recipe.id"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  components: {
    Recipe,
    RecipeNav,
    SearchBar
  },
  methods: {
    // method to grab all
    getRecipes: function() {
      axios({
        method: "get",
        url: "https://recipe-f536.restdb.io/rest/recipes",
        headers: {
          // eslint-disable-next-line
          "x-apikey": API_KEY
        }
      })
        .then(response => {
          // eslint-disable-next-line
          const { data, status } = response;
          this.recipes = [...data];
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log({ error });
        });
    },
    // method for uploading a recipe
    pushRecipe: function(recipe) {
      axios({
        method: "post",
        url: `https://recipe-f536.restdb.io/rest/recipes`,
        headers: {
          // eslint-disable-next-line
          "x-apikey": API_KEY
        },
        data: recipe
      })
        .then(function(response) {
          this.recipes.push(response);
        })
        .catch(function(error) {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    bigPush: function() {
      this.recipes.forEach(recipe => {
        this.pushRecipe(recipe);
      });
    }
  },
  mounted: function() {
    this.getRecipes();
  },
  computed: {
    searchFiltered: function() {
      if (this.searchTerm) {
        const results = this.recipes.filter(searched => {
          if (
            searched.description.includes(this.searchTerm) ||
            searched.ingredients.includes(this.searchTerm) ||
            searched.name.includes(this.searchTerm) ||
            searched.keywords.includes(this.searchTerm)
          ) {
            return true;
          }
        });
        return results;
      } else {
        return this.recipes;
      }
    }
  },
  data: function() {
    return {
      searchTerm: "",
      recipes: [
        // {
        //   id: 0,
        //   name: "Pressure Cooker Mushroom Risotto Recipe",
        //   keywords: ["Vegetarian", "Pressure Cooker"],
        //   description:
        //     "The pressure cooker is the fastest and most reliable way to cook perfect risotto. This version comes out creamy and intensely flavored with fresh mushrooms and dried porcini. A touch of miso paste gives it savory depth.",
        //   image: "http://lorempixel.com/500/300/food",
        //   ingredients: [
        //     "1 quart (950ml) homemade or store-bought low-sodium chicken stock or vegetable stock",
        //     "1 ounce (30g) dried porcini mushrooms (optional)",
        //     "1 1/2 pounds (700g) mixed mushrooms, such as shiitake, cremini, oyster, and chanterelle, trimmed and thinly sliced, stems reserved",
        //     "4 tablespoons (60ml) extra-virgin olive oil",
        //     "4 tablespoons (50g) unsalted butter",
        //     "Kosher salt and freshly ground black pepper",
        //     "1 medium yellow onion, finely chopped (about 6 ounces; 170g)",
        //     "2 medium cloves garlic, finely minced",
        //     "1 1/2 cups (about 300g) risotto rice, such as arborio or vialone nano",
        //     "2 teaspoons (10ml) soy sauce",
        //     "1 tablespoon (15ml) light miso paste",
        //     "3/4 cup (175ml) dry white wine",
        //     "1/4 cup (60ml) heavy cream (optional; see note)",
        //     "1 ounce (30g) finely grated Parmigiano-Reggiano cheese, plus more for serving",
        //     "Handful finely minced mixed fresh herbs, such as parsley, chervil, tarragon, and/or chives"
        //   ],
        //   instructions: [
        //     "Place chicken stock and dried mushrooms (if using) in a microwave-safe container and microwave on high power until simmering, about 5 minutes. Remove from microwave. Using a slotted spoon, transfer porcini to a cutting board and roughly chop. Add fresh mushroom scraps to container with porcini-infused stock and set aside.",
        //     "Heat olive oil and butter in the base of a pressure cooker over high heat, swirling, until foaming subsides. Add fresh mushrooms, season with salt and pepper, and cook, stirring occasionally, until excess moisture has evaporated and mushrooms are well browned, about 8 minutes.",
        //     "Add onion, garlic, and chopped porcini (if using) and cook, stirring frequently, until onions are softened and aromatic, about 4 minutes. Add rice and cook, stirring, until rice is evenly coated in oil and toasted but not browned, 3 to 4 minutes. (Rice grains should start to look like tiny ice cubes: translucent around the edges and cloudy in the center.) Stir in soy sauce and miso paste until evenly incorporated.",
        //     "Add wine and cook, stirring, until raw alcohol smell has cooked off and wine has almost fully evaporated, about 2 minutes.",
        //     "Pour stock into pot through a fine-mesh strainer, discarding mushroom stems. Scrape any grains of rice or pieces of onion from side of pressure cooker so that they are fully submerged. Close pressure cooker and bring up to low pressure (10 psi on most units). Cook at low pressure for 5 minutes, then depressurize cooker either by running it under cold water if it is not electric or using the steam-release valve if it is electric.",
        //     "Open pressure cooker and stir to combine rice and cooking liquid; a creamy consistency should begin to develop. Stir in cream (if using), cheese, and herbs. If risotto is too soupy, cook for a few minutes longer, stirring, until it begins to thicken more. If it is too thick, stir in some hot water. It should flow slowly when you drag a trail through it with a spoon. Season to taste with salt and pepper and serve immediately on hot plates, passing extra cheese at the table."
        //   ]
        // },
        // {
        //   id: 1,
        //   name: "Easy Pressure Cooker Pork Chile Verde Recipe",
        //   keywords: ["Pressure Cooker"],
        //   description:
        //     "There's a reason that this Easy Pressure Cooker Green Chili With Chicken is one of my most popular pressure cooker recipes. The flavor-to-work ratio is simply off the charts. Here's the gist of it: Dump some ingredients into a pressure cooker. Turn it on and cook. Blend, season, and enjoy. No pre-searing meat, no charring vegetables, and barely any advance prep at all. Today, I'm bringing the technique to a classic pork-based chile verde, and it couldn't be simpler.",
        //   image: "http://lorempixel.com/500/300/food",
        //   ingredients: [
        //     "4 pounds (1.9kg) boneless pork shoulder, cut into 2-inch chunks",
        //     "3/4 pound tomatillos (about 4 tomatillos; 350g), quartered, husks discarded",
        //     "2/3 pound Poblano peppers (about 2 peppers; 300g), roughly chopped, seeds and stems discarded (see note)",
        //     "6 ounces Anaheim or Cubanelle peppers (about 2 peppers; 170g), roughly chopped, seeds and stems discarded (see note)",
        //     "2 serrano or jalapeño chilies, roughly chopped, stems discarded (see note)",
        //     "8 ounces white onion (about 1 medium; 225g), roughly chopped",
        //     "6 medium cloves garlic, peeled",
        //     "1 tablespoon (15g) whole cumin seed, toasted and ground",
        //     "Kosher salt",
        //     "1/2 cup loosely packed fresh cilantro leaves and fine stems (about 1/2 ounce; 15g), plus more for garnish",
        //     "1 tablespoon (15ml) Asian fish sauce, such as Red Boat",
        //     "Fresh corn tortillas and lime wedges, for serving"
        //   ],
        //   instructions: [
        //     "In a pressure cooker, combine pork, tomatillos, Poblano peppers, Anaheim peppers, serrano peppers, onion, garlic, cumin, and a big pinch of salt. Heat over high heat until gently sizzling, then seal pressure cooker, bring to high pressure, and cook for 30 minutes. Release pressure.",
        //     "Using tongs, transfer pork pieces to a bowl and set aside. Add cilantro and fish sauce to remaining contents of pressure cooker. Blend with an immersion blender or in a countertop blender, then season to taste with salt. Return pork to sauce and stir gently to combine. Serve immediately with tortillas and lime wedges."
        //   ]
        // },
        // {
        //   id: 2,
        //   name:
        //     "30-Minute Pressure Cooker Pho Ga (Vietnamese Chicken Noodle Soup) Recipe",
        //   keywords: ["Vietnamese", "Pressure Cooker"],
        //   description:
        //     "Pho bo—Vietnamese beef noodle soup—may be more popular in the states, but its cousin pho ga, made with chicken, is easier to make, and in my book, just as tasty. What if I told you that you could make a superb bowl of Vietnamese chicken noodle soup with rich, aromatic broth and fall-off-the-bone tender chicken, all in under half an hour? The pressure cooker comes to the rescue.",
        //   image: "http://lorempixel.com/500/300/food",
        //   ingredients: [
        //     "2 medium yellow onions, split in half",
        //     "1 small hand of ginger, roughly sliced",
        //     "1 small bunch cilantro",
        //     "3 star anise pods",
        //     "1 cinnamon stick",
        //     "4 cloves",
        //     "1 teaspoon fennel seeds",
        //     "1 teaspoon coriander seeds",
        //     "6 to 8 chicken drumsticks",
        //     "1/4 cup fish sauce, plus more to taste",
        //     "2 tablespoons rock sugar or raw sugar, plus more to taste",
        //     "4 servings pho noodles, prepared according to package directions",
        //     "1 small white or yellow onion, thinly sliced",
        //     "1/2 cup thinly sliced scallions",
        //     "2 cups mixed herbs (cilantro, basil, and mint)",
        //     "2 cups trimmed bean sprouts",
        //     "Thinly sliced Thai chilis",
        //     "2 limes, each cut into 4 wedges",
        //     "Hoisin sauce and Sriracha"
        //   ],
        //   instructions: [
        //     "Heat oil in a pressure cooker over high heat until smoking. Add halved onions and ginger, cut side down. Cook without moving, reducing heat if smoking excessively, until onion and ginger are well charred, about 5 minutes.",
        //     "Add cilantro, star anise, cinnamon, cloves, fennel seed, coriander, and chicken to the pot. Add 2 quarts of water, the fish sauce, and the sugar to the pot. Seal the pressure cooker and bring it to high pressure over high heat. Cook on high pressure for 20 minutes, then shock under cold running water in the sink (or release pressure valve if using an electric pressure cooker).",
        //     "Open pressure cooker. Transfer chicken legs to a plate. Pour broth through a fine mesh strainer into a clean pot and discard solids. Skim any scum off the surface of the broth using a ladle, but leave the small bubbles of fat intact. Season broth to taste with more fish sauce and sugar if desired.",
        //     "To serve, place re-hydrated pho noodles in individual noodle bowls. Top with chicken legs, sliced onions, and scallions. Pour hot broth over chicken and noodles. Serve immediately, allowing guests to add herbs, bean sprouts, chilis, lime, and sauces as they wish."
        //   ]
        // }
      ]
    };
  }
};

import Recipe from "./Recipe.vue";
import RecipeNav from "./RecipeNav.vue";
import SearchBar from "./SearchBar.vue";
</script>

<style>
.recipe-holder {
  display: flex;
  flex-wrap: wrap;
  margin: auto auto;
}
</style>
