<template>
  <div class="center-panel md-elevation-20">
    <Header
      :searchTerm="searchTerm"
      @searchTermUpdated="searchTerm = $event"
      @searchReset="searchTerm = null"
      @goHome="goHome"
    />
    <!-- <RecipeNav :recipes="searchFiltered" /> -->


    <div v-if="!detailView && !searchTerm" class="featured">
      <RecipeCardFeatured :recipe="recipes[showRandom()]"/>
      <hr>
    </div>

    <div v-if="!detailView" class="card-holder">
      <RecipeCard
        v-for="recipe in searchFiltered"
        :key="recipe._id" :recipe="recipe"
        @favoriteUpdated="updateFavorite(recipe)"
        @recipeSelected="selectRecipe(recipe)"
      />
    </div>
    <div v-if="detailView" class="recipe-holder">
      <RecipeDetail
      :recipe="activeRecipe"
      @favoriteUpdated='updateDetailFavorite()'
      @keywordPicked="sortByKeyword"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {
    Recipe,
    RecipeCard,
    RecipeDetail,
    RecipeCardFeatured,
    // RecipeNav,
    Header
},
  methods: {
    //
    // method to grab all
    //
    showRandom() {
      const randomIndex = (Math.floor(Math.random()*this.recipes.length));
      return randomIndex;
    },
    getRecipes: function() {
      axios({
        method: "get",
        url: "https://recipe-f536.restdb.io/rest/recipes",
        headers: {
          "x-apikey": API_KEY
        }
      })
        .then(response => {
          const { data } = response;
          this.recipes = [...data];
        })
        .catch(function(error) {
          console.log({ error });
        });
    },
    //
    // method for uploading a recipe
    //
    pushRecipe: function(recipe) {
      axios({
        method: "post",
        url: `https://recipe-f536.restdb.io/rest/recipes`,
        headers: {
          "x-apikey": API_KEY
        },
        data: recipe
      })
        .then(function(response) {
          this.recipes.push(response);
        })
        .catch(function(error) {
        });
    },
    updateDetailFavorite: function() {
      console.log('from home');
      this.updateFavorite(this.activeRecipe);
    },
    updateFavorite: function(recipe) {
      recipe.favorite = !recipe.favorite;
      axios({
        method: "patch",
        url: `https://recipe-f536.restdb.io/rest/recipes/${recipe._id}`,
        headers: {
          "x-apikey": API_KEY
        },
        data: { favorite: recipe.favorite }
      })
        .then(function(response) {
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectRecipe: function(recipe) {
      // update internal state:
      this.detailView = true;
      this.activeRecipe = recipe;
      // manipulate navbar
      const recipeName = recipe.name.replace(/\s+/g, '-').toLowerCase();
      history.pushState(null, "/", recipeName);
      // force browser to scroll to top of page:
      window.scrollTo(0,0);
    },
    sortByKeyword: function(keyword) {
      // console.log(keyword)
      this.goHome();
      this.searchTerm = keyword;
    },
    goHome: function() {
      const recipeName = this.activeRecipe.name.replace(/\s+/g, '-').toLowerCase();
      history.pushState(null, recipeName, '/');
      this.detailView = false;
    }
    // maintnence function for uploading original dataset to online host:
    //
    // bigPush: function() {
    //   this.recipes.forEach(recipe => {
    //     this.pushRecipe(recipe);
    //   });
    // }
  },
  mounted: function() {
    this.getRecipes();
    this.detailView = false;
    this.showRandom();
  },
  computed: {
    searchFiltered: function() {
      if (this.searchTerm) {
        // const query = this.searchTerm.toLowerCase();
        const results = this.recipes.filter(searched => {
          if (
            searched.description.includes(this.searchTerm) ||
            searched.ingredients.includes(this.searchTerm) ||
            searched.name.includes(this.searchTerm) ||
            searched.keywords.includes(this.searchTerm) ||
            searched.instructions.includes(this.searchTerm)
          ) {
            console.log(searched);
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
      detailView: false,
      activeRecipe: "",
      recipes:
      [{"_id":"5c894307307bb30000028d8c","name":"Oyster Po Boys","id":40,"keywords":["Cajun","Spicey","New Orleans","Southern","Oyster"],"description":"Fried seafood po' boys are classic New Orleans street food. These \"dressed\" sandwiches are spread with a zesty rémoulade sauce and filled with crunchy shredded lettuce, pickles, and sliced tomatoes, before being topped with crisp, golden fried seafood.","favorite":false,"image":"img/oysterpoboy.jpg","ingredients":["3/4 cup (175ml) mayonnaise","1/4 cup (45g) minced dill pickles","2 tablespoons (10g) drained prepared horseradish","1 tablespoon (15ml) hot sauce","1 tablespoon (15ml) Dijon mustard","1 tablespoon (15ml) Worcestershire sauce","1 tablespoon (15ml) fresh lemon juice","1 garlic clove, minced","Kosher salt and freshly ground pepper","2 cups (10 ounces; 280g) all-purpose flour","1/2 cup (2 1/2 ounces; 140g) cornmeal","2 tablespoons (10g) homemade or store-bought Creole seasoning","4 large eggs","24 freshly shucked oysters, liquid reserved and shells discarded","2 quarts (1900ml) vegetable oil, for frying","Kosher salt","4 (10-inch) French or sub-style rolls, lightly toasted","1 small head iceberg lettuce, shredded","2 medium tomatoes, thinly sliced","3/4 cup dill pickle chips"],"instructions":["For the Rémoulade: In a small bowl, stir together mayonnaise, minced pickles, horseradish, hot sauce, mustard, Worcestershire sauce, lemon juice, and garlic until thoroughly combined. Season to taste with salt and pepper. Set aside.","For the Oysters: In a medium bowl or shallow baking dish, whisk together flour, cornmeal, and Creole seasoning. In a second medium bowl or shallow baking dish, whisk together eggs and 1/3 cup flour mixture. The mixture should have the consistency of a thick pancake batter. Adjust consistency with additional flour mixture if necessary.","Working in batches, place oysters in flour mixture and toss to evenly coat. Shake off excess flour. Transfer oysters to egg mixture and turn to thoroughly coat. Allow excess batter to drip back into bowl. Return oysters to flour mixture. Toss gently in flour mixture to fully coat. Repeat dredging process with remaining oysters.","In a large Dutch oven, heat oil over medium-high heat to 375°F (190°C). Carefully add the oysters to the oil and cook, stirring occasionally with a spider skimmer, until golden brown, 2 to 3 minutes. Transfer cooked oysters to wire rack set inside a rimmed baking sheet. Season with salt to taste.","For Serving: Open rolls and spread cut sides with rémoulade. Divide lettuce, tomatoes, pickle chips, and oysters evenly among rolls. Serve immediately."],"recipeYield":"","cookTime":"","totalTime":""},{"_id":"5c87f66d307bb300000263f5","name":"Easy Pressure Cooker Pork Chile Verde","keywords":["Pressure Cooker","Pork","Healthy","Quick","Mexican"],"id":1,"description":"There's a reason that this Easy Pressure Cooker Green Chili With Chicken is one of my most popular pressure cooker recipes. The flavor-to-work ratio is simply off the charts. Here's the gist of it: Dump some ingredients into a pressure cooker. Turn it on and cook. Blend, season, and enjoy. No pre-searing meat, no charring vegetables, and barely any advance prep at all. Today, I'm bringing the technique to a classic pork-based chile verde, and it couldn't be simpler.","image":"img/chiliverde.jpg","ingredients":["4 pounds (1.9kg) boneless pork shoulder, cut into 2-inch chunks","3/4 pound tomatillos (about 4 tomatillos; 350g), quartered, husks discarded","2/3 pound Poblano peppers (about 2 peppers; 300g), roughly chopped, seeds and stems discarded (see note)","6 ounces Anaheim or Cubanelle peppers (about 2 peppers; 170g), roughly chopped, seeds and stems discarded (see note)","2 serrano or jalapeño chilies, roughly chopped, stems discarded (see note)","8 ounces white onion (about 1 medium; 225g), roughly chopped","6 medium cloves garlic, peeled","1 tablespoon (15g) whole cumin seed, toasted and ground","Kosher salt","1/2 cup loosely packed fresh cilantro leaves and fine stems (about 1/2 ounce; 15g), plus more for garnish","1 tablespoon (15ml) Asian fish sauce, such as Red Boat","Fresh corn tortillas and lime wedges, for serving"],"instructions":["In a pressure cooker, combine pork, tomatillos, Poblano peppers, Anaheim peppers, serrano peppers, onion, garlic, cumin, and a big pinch of salt. Heat over high heat until gently sizzling, then seal pressure cooker, bring to high pressure, and cook for 30 minutes. Release pressure.","Using tongs, transfer pork pieces to a bowl and set aside. Add cilantro and fish sauce to remaining contents of pressure cooker. Blend with an immersion blender or in a countertop blender, then season to taste with salt. Return pork to sauce and stir gently to combine. Serve immediately with tortillas and lime wedges."],"favorite":true},{"_id":"5c894c21307bb30000028e17","name":"Toro Bravo's Radicchio Salad","keywords":["Salad","John Gorham","Toro Bravo","Radicchio"],"id":2340,"description":"Austere as this salad may seem, it's got 2 secret tricks that will make you better at making salads, during the holidays and forever after. 1. You infuse the vinegar with chopped red onion for an hour, then quietly remove it. The vinegar is left with a richer, more complex flavor, without the oppressive oniony kickback. 2. You toss the dressed leaves with a dusting of finely grated Manchego to help the coating stick. ","favorite":false,"ingredients":["3 heads radicchio","1/4 cup good-quality balsamic vinegar","1/4 cup good-quality sherry vinegar","1 red onion, chopped","1 tablespoon honey","3/4 cup olive oil","1 1/2 cups Machego, finely grated and divided","1 pinch salt, plus more to taste"],"instructions":["Remove the cores from the radicchio and discard. Chop into 1-inch pieces. Take 1 gallon of water in a large bowl and add enough ice to make the water icy cold. Once cold, strain out the ice and add the radicchio to the water. Let it sit for 15 minutes to remove some of its bitterness, strain and then spin in a salad spinner until dry. Fluff the dried radicchio. (Note: If you don't strain the ice out before adding the radicchio you'll be pulling out ice pieces for half an hour so that you don't have wet radicchio.)","In a large bowl, add the balsamic vinegar, sherry vinegar, and chopped red onion. Break the onion up into pieces so that all of that oniony flavor gets into the vinegar. (Note: If you want to quick pickle and eat the onions themselves, Food52er hardlikearmour suggests adding the honey now too.) Let it sit for 1 hour and then strain out the onions.","Add the honey and olive oil to the strained vinegars and whisk.","Using your hands, toss the radicchio with the dressing until evenly coated. Add 1 cup of finely grated Manchego, salt, and toss again.","To serve, top the salad in a serving bowl with the remaining 1/2 cup grated Manchego or distribute salad and Manchego among 4 to 8 bowls or plates."],"recipeYield":"4","cookTime":"30 minutes","totalTime":"30 minutes","image":"img/tororiddichio.jpg"},{"_id":"5c87f66e307bb300000263f6","name":"30-Minute Pressure Cooker Pho Ga (Vietnamese Chicken Noodle Soup)","keywords":["Vietnamese","Pressure Cooker","Chicken","Soup","Quick"],"id":2,"description":"Pho bo—Vietnamese beef noodle soup—may be more popular in the states, but its cousin pho ga, made with chicken, is easier to make, and in my book, just as tasty. What if I told you that you could make a superb bowl of Vietnamese chicken noodle soup with rich, aromatic broth and fall-off-the-bone tender chicken, all in under half an hour? The pressure cooker comes to the rescue.","image":"img/chicken-pho.jpg","ingredients":["2 medium yellow onions, split in half","1 small hand of ginger, roughly sliced","1 small bunch cilantro","3 star anise pods","1 cinnamon stick","4 cloves","1 teaspoon fennel seeds","1 teaspoon coriander seeds","6 to 8 chicken drumsticks","1/4 cup fish sauce, plus more to taste","2 tablespoons rock sugar or raw sugar, plus more to taste","4 servings pho noodles, prepared according to package directions","1 small white or yellow onion, thinly sliced","1/2 cup thinly sliced scallions","2 cups mixed herbs (cilantro, basil, and mint)","2 cups trimmed bean sprouts","Thinly sliced Thai chilis","2 limes, each cut into 4 wedges","Hoisin sauce and Sriracha"],"instructions":["Heat oil in a pressure cooker over high heat until smoking. Add halved onions and ginger, cut side down. Cook without moving, reducing heat if smoking excessively, until onion and ginger are well charred, about 5 minutes.","Add cilantro, star anise, cinnamon, cloves, fennel seed, coriander, and chicken to the pot. Add 2 quarts of water, the fish sauce, and the sugar to the pot. Seal the pressure cooker and bring it to high pressure over high heat. Cook on high pressure for 20 minutes, then shock under cold running water in the sink (or release pressure valve if using an electric pressure cooker).","Open pressure cooker. Transfer chicken legs to a plate. Pour broth through a fine mesh strainer into a clean pot and discard solids. Skim any scum off the surface of the broth using a ladle, but leave the small bubbles of fat intact. Season broth to taste with more fish sauce and sugar if desired.","To serve, place re-hydrated pho noodles in individual noodle bowls. Top with chicken legs, sliced onions, and scallions. Pour hot broth over chicken and noodles. Serve immediately, allowing guests to add herbs, bean sprouts, chilis, lime, and sauces as they wish."],"favorite":false},{"_id":"5c87f66c307bb300000263f4","name":"Pressure Cooker Mushroom Risotto","keywords":["Vegetarian","Pressure Cooker"],"id":0,"description":"The pressure cooker is the fastest and most reliable way to cook perfect risotto. This version comes out creamy and intensely flavored with fresh mushrooms and dried porcini. A touch of miso paste gives it savory depth.","image":"img/mushroomrisoto.jpg","ingredients":["1 quart (950ml) homemade or store-bought low-sodium chicken stock or vegetable stock","1 ounce (30g) dried porcini mushrooms (optional)","1 1/2 pounds (700g) mixed mushrooms, such as shiitake, cremini, oyster, and chanterelle, trimmed and thinly sliced, stems reserved","4 tablespoons (60ml) extra-virgin olive oil","4 tablespoons (50g) unsalted butter","Kosher salt and freshly ground black pepper","1 medium yellow onion, finely chopped (about 6 ounces; 170g)","2 medium cloves garlic, finely minced","1 1/2 cups (about 300g) risotto rice, such as arborio or vialone nano","2 teaspoons (10ml) soy sauce","1 tablespoon (15ml) light miso paste","3/4 cup (175ml) dry white wine","1/4 cup (60ml) heavy cream (optional; see note)","1 ounce (30g) finely grated Parmigiano-Reggiano cheese, plus more for serving","Handful finely minced mixed fresh herbs, such as parsley, chervil, tarragon, and/or chives"],"instructions":["Place chicken stock and dried mushrooms (if using) in a microwave-safe container and microwave on high power until simmering, about 5 minutes. Remove from microwave. Using a slotted spoon, transfer porcini to a cutting board and roughly chop. Add fresh mushroom scraps to container with porcini-infused stock and set aside.","Heat olive oil and butter in the base of a pressure cooker over high heat, swirling, until foaming subsides. Add fresh mushrooms, season with salt and pepper, and cook, stirring occasionally, until excess moisture has evaporated and mushrooms are well browned, about 8 minutes.","Add onion, garlic, and chopped porcini (if using) and cook, stirring frequently, until onions are softened and aromatic, about 4 minutes. Add rice and cook, stirring, until rice is evenly coated in oil and toasted but not browned, 3 to 4 minutes. (Rice grains should start to look like tiny ice cubes: translucent around the edges and cloudy in the center.) Stir in soy sauce and miso paste until evenly incorporated.","Add wine and cook, stirring, until raw alcohol smell has cooked off and wine has almost fully evaporated, about 2 minutes.","Pour stock into pot through a fine-mesh strainer, discarding mushroom stems. Scrape any grains of rice or pieces of onion from side of pressure cooker so that they are fully submerged. Close pressure cooker and bring up to low pressure (10 psi on most units). Cook at low pressure for 5 minutes, then depressurize cooker either by running it under cold water if it is not electric or using the steam-release valve if it is electric.","Open pressure cooker and stir to combine rice and cooking liquid; a creamy consistency should begin to develop. Stir in cream (if using), cheese, and herbs. If risotto is too soupy, cook for a few minutes longer, stirring, until it begins to thicken more. If it is too thick, stir in some hot water. It should flow slowly when you drag a trail through it with a spoon. Season to taste with salt and pepper and serve immediately on hot plates, passing extra cheese at the table."],"favorite":false},{"_id":"5c897d6a307bb30000029112","name":"Ultra-Smashed Cheeseburgers","keywords":["Serious Eats","Cheeseburger","BBQ","Grill"],"id":53450,"description":"Classic smashed burgers are all about maximizing that deep, brown crust. But I found myself wondering: What if I were to take this to the extreme? Was there a way I could pack even more flavor into a burger? And thus, the ultra-smashed burger was born. Same burger size, but twice the amount of crisp, browned crust.","image":"img/smashedburger.jpg","favorite":true,"ingredients":["1 soft hamburger roll, buttered and toasted","Condiments and toppings as desired, such as mayonnaise, mustard, shredded lettuce, onions, tomatoes, and pickles","4 ounces (110g) freshly ground beef chuck, divided into two 2-ounce (55g) balls","Kosher salt and freshly ground black pepper","1 slice good melting cheese, such as American, cheddar, or homemade melting cheese"],"instructions":["Prepare burger bun by laying toppings on bottom half of bun. Have it nearby and ready for when your burger is cooked.","Preheat a large stainless steel sauté pan or skillet over high heat for 2 minutes. Place balls of beef in pan and smash down with a stiff metal spatula, using a second spatula to add pressure. Smashed patties should be slightly wider than burger bun.","Season generously with salt and pepper and allow to cook until patties are well browned and tops are beginning to turn pale pink/gray in spots, about 45 seconds. Using a bench scraper or the back side of a stiff metal spatula, carefully scrape patties from pan, making sure to get all of the browned bits.","Flip patties and immediately place a slice of cheese over 1 patty, then stack the second directly on top. Immediately remove from pan and transfer to waiting burger bun. Serve."],"cookTime":"5 minutes","totalTime":"5 minutes","recipeYield":"Makes one burger"},{"_id":"5c899d0f307bb30000029290","name":"The Best Slow-Cooked Bolognese Sauce","keywords":["Italian","Hearty","Pasta"],"id":42340,"description":"When it comes to meat sauces, ragù bolognese is the undisputed heavyweight champion of the world. To arrive at this version, I started with Barbara Lynch's great recipe, adding a few tweaks here and there to enhance meatiness and texture (hello, pancetta, gelatin, and fish sauce!) and employing a unique oven-based cooking technique that develops rich browned flavors, all while maintaining the tender, silky texture that the best sauces have. This is the kind of sauce that will leave you and your loved ones weak in the knees.","image":"img/bolognese.jpg","favorite":false,"ingredients":["1 quart (1L) homemade or store-bought low-sodium chicken stock","1 to 1 1/2 ounces powdered gelatin (4 to 6 packets; 30 to 45g), such as Knox","1 (28-ounce; 800g) can peeled whole tomatoes, preferably San Marzano","1/2 pound (225g) finely minced chicken livers","1/4 cup (60ml) extra-virgin olive oil","1 pound (450g) ground beef chuck (about 20% fat)","1 pound (450g) ground pork shoulder (about 20% fat)","1 pound (450g) ground lamb shoulder (about 20% fat)","Kosher salt and freshly ground black pepper","4 tablespoons (60g) unsalted butter","1/2 pound (225g) finely diced pancetta","1 large onion, finely minced (about 8 ounces; 225g)","2 carrots, finely chopped (about 8 ounces; 225g)","4 ribs celery, finely chopped (about 8 ounces; 225g)","4 medium cloves garlic, minced","1/4 cup (about 25g) minced fresh sage leaves","1/2 cup (about 50g) minced fresh parsley leaves, divided","2 cups (475ml) dry white or red wine","1 cup (235ml) whole milk","2 bay leaves","1 cup (235ml) heavy cream","3 ounces (85g) finely grated Parmesan cheese","2 tablespoons (30ml) Vietnamese or Thai fish sauce, such as Red Boat"],"instructions":["Adjust oven rack to lower-middle position and preheat oven to 300°F (150°C). Place stock in a medium bowl or 1-quart liquid measure and sprinkle with gelatin. Set aside. Purée tomatoes in the can using an immersion blender or transfer to the bowl of a countertop blender and purée until smooth. Transfer chicken livers to a cup that just fits head of immersion blender and purée until smooth.","Heat olive oil in a large Dutch oven over high heat until shimmering. Add ground beef, pork, and lamb; season with salt and pepper; and cook, stirring and breaking up with a wooden spoon or potato masher, until no longer pink, about 10 minutes. Remove from heat and stir in puréed chicken livers.”, “Meanwhile, heat butter and pancetta in a large skillet over medium-high heat and cook, stirring frequently, until fat has mostly rendered but butter and pancetta have not yet started to brown, about 8 minutes. Add onion, carrots, celery, garlic, sage, and half of parsley and cook, stirring and tossing, until vegetables are completely softened but not browned, about 8 minutes. Transfer mixture to Dutch oven with meat mixture.","Return Dutch oven to high heat and cook, stirring, until most of the liquid has evaporated from the pan, about 10 minutes longer.","Add wine and cook, stirring, until mostly evaporated. Add reserved stock, tomatoes, milk, and bay leaves. Season gently with salt and pepper.","Bring sauce to a simmer, then transfer to oven, uncovered. Cook, stirring and scraping down sides of pot occasionally, until liquid has almost completely reduced and sauce is rich and thick underneath a heavy layer of fat, 3 to 4 hours. If sauce still looks liquid or fat has not separated and formed a thick layer after 4 hours, transfer to stovetop and finish cooking at a brisk simmer, stirring frequently.","Carefully skim off most of the fat, leaving behind about 1 cup total. (For more precise measurement, skim completely, then add back 1 cup of fat.)","Stir in heavy cream, Parmesan, fish sauce, and remaining parsley. Bring to a boil on stovetop, stirring constantly to emulsify. Season to taste with salt and pepper. Bolognese can be cooled and stored in sealed containers in the refrigerator for up to 1 week.","To Serve: Heat sauce in a large pot until just simmering. Set aside. Cook pasta in a large pot of well-salted water until just barely al dente. Drain, reserving 1/2 cup cooking liquid. Return pasta to pot and add just enough sauce to coat, along with some of the cooking liquid. Cook over high heat, tossing and stirring gently, until sauce is thick and pasta is coated, about 30 seconds. Transfer to a serving bowl and serve immediately, passing Parmesan at the table"],"cookTime":"60 minutes","totalTime":"4 to 5 hours","recipeYield":"8-10 servings"},{"_id":"5c89d025307bb30000029715","name":"Jalapeño Cheddar Cornbread","keywords":["Sides","Mexican","Bread","Spicey"],"id":6350,"description":"Cornbread with a kick of heat! This easy to make cornbread is more interesting than your typical sweet and often dry cornbread. The cheesy, salty and spicy twist on your typical cornbread is dense, moist and ridiculously addicting. ","image":"img/cornbread.jpg","favorite":false,"ingredients":["3 cups all-purpose flour","1 cup yellow cornmeal","1/4 cup sugar","2 tablespoons baking powder","2 teaspoons kosher salt","2 cups milk","3 extra-large eggs, lightly beaten","1/2 pound (2 sticks) unsalted butter, melted, plus extra to grease the pan","8 ounces aged extra-sharp Cheddar, grated, divided","1/3 cup chopped scallions, white and green parts, plus extra for garnish, 3 scallions","3 tablespoons seeded and minced fresh jalapeno peppers"],"instructions":["Combine the flour, cornmeal, sugar, baking powder, and salt in a large bowl. In a separate bowl, combine the milk, eggs, and butter. With a wooden spoon, stir the wet ingredients into the dry until most of the lumps are dissolved. Don't overmix! Mix in 2 cups of the grated Cheddar, the scallions and jalapenos, and allow the mixture to sit at room temperature for 20 minutes.","Meanwhile, preheat the oven to 350 degrees F. Grease a 9 by 13 by 2-inch baking pan.","Pour the batter into the prepared pan, smooth the top, and sprinkle with the remaining grated Cheddar and extra chopped scallions. Bake for 30 to 35 minutes, or until a toothpick comes out clean. Cool and cut into large squares. Serve warm or at room temperature."],"cookTime":"30 minutes","totalTime":"75 minutes","recipeYield":"12 large pieces"},{"_id":"5c89d0f4307bb30000029727","name":"Sous Vide Carrots","keywords":["Sous Vide","Vegetables","Carrots","Healthy"],"id":6450,"description":"This basic technique retains the natural sweetness, bright color, and firm bite that are often lost when cooking carrots in traditional ways.","image":"img/sousvidecarrots.jpg","favorite":false,"ingredients":["500 g Carrots","Vegetable oil or butter as needed","Plastic bag"],"instructions":["Fill heat proof container with water","Heat water to 194 degrees Fahrenheit","Peel carrots and put into plastic bag","Put a little oil or butter in the plastic bag to keep the carrots from sticking to one another","Cook Sous Vide at 194 degrees Fahrenheit for about 15 to 25 minutes","Slice and season the carrots","Serve"],"cookTime":"15-25 minutes","totalTime":"30 minutes","recipeYield":"3 servings"},{"_id":"5c89d27c307bb3000002973d","name":"Molten Chocolate Cakes with Raspberries and Cream","keywords":["Dessert","Chocolate","Date night","Cake"],"id":7650,"description":"The magic of chocolate-oozing molten cakes will never not be impressive, romantic or special. Impress your date. Impress your guests. Impress yourself with how easy it is to make a spectacular desert in less than 30 minutes. ","image":"img/moltencake.jpg","favorite":false,"ingredients":["1 1/2 teaspoons unsalted butter, plus 1/4 pound (1 stick)","4 teaspoons flour, plus 2 tablespoons","6 ounces bittersweet or semisweet chocolate, chopped","2 tablespoons cold heavy cream","2 tablespoons confectioners' sugar","2 large eggs","2 large egg yolks","1/4 cup sugar","1 teaspoon vanilla extract","Pinch salt","1/2 cup cold heavy cream","2 tablespoons confectioners' sugar","1 tablespoon nut-flavored liqueur","1/2 pint fresh raspberries","4 sprigs mint","Sweetened cocoa, as garnish"],"instructions":["Preheat the oven to 450 degrees F. Grease and flour 4 (6-ounce) ramekins or baking dishes with the 1 1/2 teaspoons of butter and 1 teaspoon of flour in each, tapping out the excess flour. Set on a baking sheet.","In a double boiler, or a metal bowl set over a pan of simmering water, melt the remaining 1/4 pound of butter with the chocolate, cream, and powdered sugar, stirring until smooth. Remove from the heat.","In a bowl, whisk together the eggs, egg yolks, sugar, vanilla, and salt until thick ribbons form, about 3 minutes. Sift 2 tablespoons flour into the egg mixture and fold together. Fold the chocolate into the egg mixture. Divide among the prepared dishes and bake until the sides of the cake are set and the tops are puffed but still soft, about 12 minutes.","Remove from the oven and let cool in the ramekins for 2 minutes, then unmold onto dessert plates.","Meanwhile, in a bowl whip the cream until beginning to form soft peaks. Add the sugar and nut liqueur and beat until stiff peaks start to form. Spoon a dollop of the whipped cream on each unmolded cake, and garnish each plate with raspberries and a sprig of mint. Sprinkle cocoa over the cakes, and serve."],"cookTime":"14 minutes","totalTime":"30 minutes","recipeYield":"4 servings"},{"_id":"5c89d462307bb30000029755","name":"Mini Animal Crackers","keywords":["Dessert","Cookie"],"id":48304,"description":"Adorable and beloved animal crackers without any nasty preservatives. This basic sugar cookie recipe is simple and straightforward and will take you back to childhood. ","image":"img/animalcrackers.jpg","favorite":false,"ingredients":["2 and 1/4 cups (280g) all-purpose flour (spoon & leveled)","1 teaspoon ground cinnamon","1/2 teaspoon baking powder","1/4 teaspoon salt","3/4 cup (1 and 1/2 sticks; 180g) unsalted butter, softened to room temperature","3/4 cup (150g) granulated sugar","1 large egg, at room temperature","1 and 1/2 teaspoons pure vanilla extract","traditional royal icing","rainbow sprinkles"],"instructions":["Whisk the flour, cinnamon, baking powder, and salt together in a medium bowl. Set aside.","In a large bowl using a hand mixer or a stand mixer fitted with a paddle attachment, beat the butter and sugar together on high speed until completely smooth and creamy, about 2 minutes. Add the egg and vanilla extract and beat on high speed until combined, about 1 minute. Scrape down the sides and up the bottom of the bowl and beat again as needed to combine.","Add the dry ingredients to the wet ingredients and mix on low until combined. If the dough seems too soft, you can add 1 Tablespoon more flour until it is a better consistency for rolling.","Divide the dough into 2 equal parts. Roll each portion out onto a piece of parchment paper or a lightly floured silicone baking mat (I prefer the nonstick silicone mat) to about 1/4-inch thickness. The rolled-out dough can be any shape, as long as it is evenly 1/4-inch thick.","Stack the pieces, with parchment paper between the two, onto a baking sheet and refrigerate for at least 1-2 hours and up to 2 days. If chilling for more than a couple hours, cover the top dough piece with a single piece of parchment paper.","Once chilled, preheat oven to 350°F (177°C). Line 2 large baking sheets with parchment paper or silicone baking mats. Remove one of the dough pieces from the refrigerator and cut into shapes with animal cookie cutters. Re-roll the remaining dough and continue cutting until all is used. Repeat with 2nd dough piece.","Arrange cookies on baking sheets 1-2 inches apart. Bake for 9-10 minutes, until lightly browned around the edges. Rotate the baking sheet halfway through bake time. Allow cookies to cool on the baking sheet for 5 minutes then transfer to a wire rack to cool completely before decorating. I like to decorate cookies directly on baking sheets so I can stick the entire baking sheet in the refrigerator to help set the icing. So place the cooled cookies back on baking sheets.","Decorate with traditional royal icing and sprinkles"],"cookTime":"2 hours, 15 minutes","totalTime":"4 hours, 30 minutes","recipeYield":"85 mini cookies"},{"_id":"5c89dd10307bb300000297da","name":"Wifey's Salad Rolls","keywords":["Healthy","Vietnamese","Appetizer"],"id":94533,"description":"Don't pay $7 for someone else to roll your Vietnamese cravings. Empower yourself to make your own satisfying crunchy, refreshing and healthy salad rolls. You've got this.","image":"img/saladrolls.jpg","favorite":false,"ingredients":["Two large romaine lettuce leaves","12 basil leaves","1 cup of bean sprouts","1/3 cup of mint","12 pieces of cooked shrimp","Four rice paper wraps"],"instructions":["Wash and thoroughly dry all of your veggies","Pluck the mint and basil leaves from their stems and put each in separate prep bowls","Cut lettuce into three separate pieces with the spine in the middle","Remove the tail from cooked shrimp","Bring water to steaming temperature but not boiling","Pour hot water into heat proof bowl with a 10\" diameter","Arrange the prepared vegetables and shrimp on a cutting board in the following order: lettuce, basil, bean sprouts, mint, shrimp","Soften wraps in hot water","Gently stretch softened wrap onto a cutting board","For each wrap ayer 1 slice of lettuce, 3 leaves of basil, quarter cup of bean sprouts and three mint leaves onto bottom third of the wrap","Roll the wrap but leave last third unclosed","Place three shrimp in a vertical line on the remaining unfolded wrap","Fold final portion of the wrap and tuck in the sides like a burrito","Serve with peanut dipping sauce","Garnish with remaining mint","Serve smugly"],"cookTime":"9 minutes","totalTime":"30 minutes","recipeYield":"4 rolls"},{"_id":"5c89f285307bb30000029930","name":"Easy Oven-Cooked Pulled Pork","keywords":["Meat","Pork","Dinner","Slow Cook"],"id":7650,"description":"This recipe produces pulled pork that shreds into large, tender chunks that are moist but not wet, with a flavor that balances sweet molasses, bright vinegar, heat, and just a hint of smoke. Oh, and it's darn easy, to boot.","image":"img/pulledpork.jpg","favorite":false,"ingredients":["1 tablespoon (6g) kosher salt","5 tablespoons dark brown sugar (2 1/4 ounces; 65g)","Large pinch cayenne pepper","1 teaspoon (2g) ground coriander","1/2 teaspoon (1g) ground fennel seed","1 tablespoon (6g) paprika","1 teaspoon (2g) ground cumin","1 teaspoon (2g) freshly ground black pepper","1 whole bone-in or boneless pork butt (5 to 7 pounds; 2.25 to 3kg)","1 cup ketchup (8 ounces; about 225g)","1/2 cup dark molasses (4 ounces; about 115g)","2 tablespoons (30ml) Worcestershire sauce","1 tablespoon (15ml) high-quality liquid smoke, such as Wright's (see note)","1 tablespoon (15ml) brown mustard","2 teaspoons (10ml) hot sauce","1/2 cup (120ml) cider vinegar, divided","1 tablespoon (15ml) vegetable oil","1 large onion, finely minced (about 6 ounces; 170g)","1 cup (240ml) bourbon","1/2 cup (120ml) homemade or store-bought low-sodium chicken stock or water"],"instructions":["Adjust oven rack to lower position and preheat oven to 300°F (150°C). Combine salt, sugar, cayenne pepper, coriander, fennel seed, paprika, cumin, and black pepper in a small bowl and mix until homogeneous. Season pork with 2 to 3 tablespoons spice mixture, making sure to rub it on all sides. Reserve remaining spice mixture.","Whisk together ketchup, molasses, Worcestershire sauce, liquid smoke, mustard, hot sauce, and half of cider vinegar in a medium bowl. Whisk in remaining spice mixture. Set aside.","Heat oil in a Dutch oven over medium-high heat until shimmering. Add pork and cook, turning occasionally, until well browned on all sides, about 5 minutes total. (Pork will brown fast because of the sugar. Do not let it burn.) Add onion and cook, stirring and scraping up browned bits from the bottom of the pan, until softened, about 2 minutes.","Turn off burner and add bourbon. Relight burner. Carefully ignite the bourbon with a long match or lighter. (Stand back and make sure there is nothing flammable above it; it will produce tall flames.) Let cook until flames die out, about 2 minutes.","Add half of sauce mixture and chicken stock or water. Cover Dutch oven, transfer to oven, and cook until pork is just starting to turn tender, about 4 hours. Remove lid and continue cooking until a knife or fork shows very little resistance when twisted inside the meat and a dark bark has formed, about 1 hour longer.","Transfer pork to a large bowl, reserving liquid in pot. Using a ladle, skim off excess fat and discard. Add reserved sauce and remaining vinegar to pot and whisk to combine. When pork is cool enough to handle, shred with two forks.","Transfer shredded pork to pot and toss with sauce. (If making ahead to serve over the course of several meals, store pork and sauce separately, adding sauce only to the portion you are serving immediately.) Season to taste with more salt, sugar, liquid smoke, or cider vinegar. Serve."],"cookTime":"30 minutes","totalTime":"6 hours","recipeYield":"8 to 12 servings"},{"_id":"5c89f3c6307bb30000029944","name":"Bahn Mi","keywords":["Vietnamese","Lunch","Dinner","Healthy","Sandwich"],"id":970,"description":"Every craving is satisfied as your teeth sink into the baguette and the sharp, sweet, salty and savory flavors of a classic banh mi flood your mouth. There is nothing more satisfying than the joy of the humble sandwich hooking up with the swagger of French and Vietnamese cuisine coming together. Crunchy, tender, juicy and mysteriously delicious every time. ","image":"img/bahnmi.jpg","favorite":true,"ingredients":["1/2 lb daikon, peeled","1 carrot, peeled","1/2 cup rice vinegar (not seasoned)","1 tablespoon sugar","1 (24-inch) soft baguette","2 tablespoons vegetable oil","1 tablespoon Asian fish sauce","1/4 lb liverwurst","2 fresh jalapeños, thinly sliced","1/2 sweet onion, cut into 1/4-inch rings","3/4 cup packed cilantro sprigs","2 cooked chicken breasts from a rotisserie chicken, thinly sliced","Lettuce leaves","2 tablespoons mayonnaise"],"instructions":["Preheat oven to 350°F with rack in middle.","Shred daikon and carrot in a food processor fitted with medium shredding disk.","Stir together vinegar, sugar, and 1/2 teaspoon salt and toss with shredded vegetables. Let slaw stand, stirring occasionally, 15 minutes.","Meanwhile, heat baguette on rack in oven until crusty, about 5 minutes. Cut off and discard round ends, then split baguette.","Mix together oil, fish sauce, and soy sauce and brush on cut sides of bread. Spread liverwurst on bottom layer of bread and top with chiles, onion, and cilantro.","Drain slaw in a colander.","Arrange chicken, slaw, and lettuce on cilantro. Spread top layer of bread with mayonnaise and cut sandwich crosswise into fourths."],"cookTime":"30 minutes","totalTime":"30 minutes","recipeYield":"4 sandwiches"},{"_id":"5c89f4fe307bb30000029954","name":"Roasted Kohlrabi and Butternut Squash","keywords":["Sides","Vegetables","Healthy","Fall","Winter","Squash"],"id":98730,"description":"Its earthy, sweet flavors to its velvety, crisp texture make this easy roasting dish a success on those dark winter days when you want color and delicious foods. ","image":"img/roastedsquash.jpg","favorite":false,"ingredients":["4 medium kohlrabi (2 1/4 lb with greens or 1 3/4 lb without)","2 tablespoons extra-virgin olive oil","2 teaspoons finely chopped fresh thyme","1/2 teaspoon salt"," 1/4 teaspoon black pepper","2 1/2 lb butternut squash"],"instructions":["Put oven rack just below middle position and put baking pan  on rack, then preheat oven to 450°F. (If roasting vegetables along with turkey, preheat pan for 15 minutes while turkey roasts, then roast vegetables underneath turkey.)","Trim and peel kohlrabi, then cut  into 3/4-inch pieces. Toss kohlrabi with 1 tablespoon oil, 1 teaspoon thyme, 1/4 teaspoon salt, and 3/4 teaspoon pepper in a bowl. Transfer kohlrabi to preheated pan in oven and roast 15 minutes."],"cookTime":"20 minutes","totalTime":"1 hour","recipeYield":"4 servings"}]

    };
  }
};

import Recipe from "./Recipe.vue";
// import RecipeNav from "./RecipeNav.vue";
import RecipeCard from "./RecipeCard.vue";
import RecipeDetail from "./RecipeDetail.vue";
import RecipeCardFeatured from "./RecipeCardFeatured.vue";
import Header from "./Header.vue";
</script>

<style>
.featured {
  width: 100%;
  margin-top: -1.5em;
  margin-bottom: 1em;
}
.featured::after {
  content: '';
}
.center-panel {
  display: flex;
  flex-direction: column;
  align-content: center;
  /* width: 1200px; */
  max-width: 1200px;
  min-width: 80vw;
  min-height: 100vh;
  background-color: white;
  margin: auto;
  padding: 1.75em;
  /* border: 1px solid black; */
}
.recipe-holder {
  display: flex;
  flex-wrap: wrap;
  margin: auto auto;
}
.card-holder {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: -1em;
}
</style>
