<template>
    <main id="root">
        <h1>Learn More About {{recipe.name}}</h1>

        <img src="https://picsum.photos/1000" alt="A picture of this ingredient" class="recipe-img" />

        <div class="completion-time-container">
            <label for="recipe_completion_time" class="form-control-lbl">Estimated Time:</label>
            <p id="recipe_completion_time" class="recipe-completion-time">
                {{recipe.completionTime}}
            </p>
        </div>

        <p class="recipe-description">
            {{recipe.description}}
        </p>

        <div class="resource-links">
            <ul class="resource-actions-list">
                <li class="resource-action-item">
                    <router-link v-if="recipe.slug" class="recipe-link" :to="{name: 'edit-recipe', params: {id: recipe.slug}}">Edit {{recipe.name}}</router-link>
                </li>
                <li class="resource-action-item">
                    <a v-if="recipe.slug" href="#" class="ingredient-link">Delete</a>
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

<style scoped lang="scss">
    .recipe-img {
        max-height: 25%;
        max-width: 25%;
    }

    .recipe-description {
        width: 50%;
        margin: 1% auto;
        text-align: left;
        min-height: 15vh;
        padding: 1%;
    }

    .resource-actions-list {
        display: flex;
        flex-direction: row;
        list-style: none;
        padding-left: 0;
        margin: 0 auto;
        justify-content: center;
        .resource-action-item {
            padding: 2%;
        }
    }

    .completion-time-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 50%;
        margin: 1% auto;

        .form-control-lbl {
            font-weight: bold;
        }

        .recipe-completion-time {
            margin: 0 1%;
        }
    }
</style>