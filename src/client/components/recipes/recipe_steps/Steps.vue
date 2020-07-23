<template>
    <div>
        <ul id="recipe_steps" ref="recipeStepsList">
            <recipe-step v-for="step in recipeSteps" :key="step.id" />
        </ul>
        <button id="add_recipe_step_btn" class="add-step" type="button" @click="addRecipeStep">Add Step</button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecipeStep from '@/client/components/recipes/recipe_steps/RecipeStep.vue';

    export default Vue.extend({
        name: "steps",
        components: {RecipeStep},
        props: {
          recipeSteps: {
              type: Array,
              default: function() {
                  return [];
              }
          }
        },
        methods: {
            addRecipeStep: function () {
                const componentKlass = Vue.extend(RecipeStep);
                const instance = new componentKlass({
                    propsData: {
                        key: new Date().getTime()
                    }
                });
                const recipeStepsList = this.$refs.recipeStepsList as HTMLUListElement;
                instance.$mount()
                recipeStepsList.appendChild(instance.$el);
            }
        }
    });
</script>

<style scoped>

</style>