<template>
    <main id="root">
        <h1>Learn More About {{recipe.name}}</h1>

        <p class="recipe-completion-time">
            {{recipe.completionTime}}
        </p>

        <p class="recipe-description">
            {{recipe.description}}
        </p>

        <div class="resource-links">
            <ul class="resource-actions-list">
                <li class="resource-action-item">
                    <router-link v-if="recipe.slug" class="recipe-link" :to="{name: 'edit-recipe', params: {id: recipe.slug}}">Edit {{recipe.name}}</router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import {serverPort} from "@/server/config/configuration";

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
          loadRecipe: async function(id: string) {
              try {
                  // TODO update url
                  const response = await fetch(`http://localhost:${serverPort}/api/recipes/${id}`, {
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
            await this.loadRecipe(this.$route.params.id);
        }
    });
</script>

<style scoped>

</style>