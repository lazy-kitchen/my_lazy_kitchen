<template>
    <main id="root">
        <h1>Learn More About {{recipe.name}}</h1>

        <p class="recipe-completion-time">
            {{recipe.completionTime}}
        </p>

        <p class="recipe-description">
            {{recipe.description}}
        </p>

        <!--    <div class="resource-links">-->
        <!--        <ul class="resource-actions-list">-->
        <!--            <li class="resource-action-item">-->
        <!--                <%= link_to "Update Information", edit_recipe_path(@recipe) %>-->
        <!--            </li>-->
        <!--        </ul>-->
        <!--    </div>-->

        <nav class="resource-directory-links">
            <ul class="resource-links-list">
                <li class="resource-link-item">
                    <router-link to="/recipes">Recipes</router-link>
                </li>
            </ul>
        </nav>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "show-recipe",
        components: {},
        data: function() {
          return {
              recipe: {
                  name: '',
                  description: '',
                  completionTime: ''
              }
          }
        },
        methods: {
          loadRecipe: async function(id: number) {
              try {
                  // TODO update url
                  const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  });
                  const responseJSON = await response.json();
                  this.recipe = responseJSON.recipe;
              } catch (error) {
                  console.error(error);
              }
          }
        },
        created: async function() {
            await this.loadRecipe(parseInt(this.$route.params.id));
        }
    });
</script>

<style scoped>

</style>