<template>
    <div class="form-container">
        <h1>{{headerText}}</h1>
        <form v-on:submit.prevent="onSubmit" v-bind:action="formAction" id="recipe_form" v-bind:method="formMethod">
            <input type="hidden" id="id" name="id" v-model.number="recipe.id" />

            <div class="form-group">
                <label for="name" class="form-control-lbl">Name</label>
                <input type="text" id="name" name="name" class="form-control" v-model.trim="recipe.name" />
            </div>

            <div class="form-group">
                <label for="description" class="form-control-lbl">Description</label>
                <textarea id="description" name="description" class="form-control form-control-textarea" v-model.trim="recipe.description"></textarea>
            </div>

            <div class="form-group">
                <label for="completion_time" class="form-control-lbl">Completion Time</label>
                <input type="number" id="completion_time" name="completion_time" class="form-control form-control-num" min="0" v-model.number="recipe.completionTime" />
            </div>

            <div id="recipe_steps_lists">
                <recipe-steps id="recipe_steps_container" :class="stepsContainerSizeClass" />

                <removed-steps id="removed_recipe_steps_container" :class="stepsContainerSizeClass" />
            </div>

            <input type="submit" id="submit_recipe_btn" v-bind:value="buttonText" />
        </form>
        <form-errors v-bind:errors="errors" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FormErrors from '@/client/components/FormErrors.vue';
    import RecipeSteps from '@/client/components/recipes/recipe_steps/Steps.vue';
    import {
        GET_CREATED_STEPS, GET_REMOVED_STEPS, GET_UPDATED_STEPS,
        RECIPE_STEPS_NAMESPACE,
        UPDATE_RECIPE_STEP
    } from "@/client/store/modules/forms/recipe_steps";
    import RemovedSteps from "@/client/components/recipes/recipe_steps/RemovedSteps.vue";
    import {mapGetters} from "vuex";
    import { Recipe} from "@/server/db/models/browser";
    import {serverUrl} from "@/client/configuration";

    export default Vue.extend({
        name: 'recipe-form',
        components: {RecipeSteps, RemovedSteps, FormErrors},
        props: {
            formMethod: String,
            formAction: String,
            headerText: String,
            buttonText: String,
            overrideMethod: {
                type: Boolean,
                default: function () {
                    return false;
                }
            }
        },
        data: function () {
            return {
                errors: new Array<string>()
            };
        },
        computed: {
            ...mapGetters(RECIPE_STEPS_NAMESPACE, [
                GET_CREATED_STEPS,
                GET_UPDATED_STEPS,
                GET_REMOVED_STEPS
            ]),
            recipe: {
              get(): Recipe {
                  return this.$store.state.recipes.recipeForm.recipe;
              }
            },
            targetUrl: function (): string {
                const targetUrl = new URL(`${serverUrl}`);
                targetUrl.pathname = `/api/${this.formAction}`;

                return targetUrl.toString();
            },
            name: {
                get(): string {
                    // Note that this assumes that this is linked to vuex-backed property
                    return this.$store.state.recipes.recipeForm.recipe.name;
                },
                set(value: string) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEP}`, {
                        property: 'name',
                        value: value
                    });
                }
            },
            description: {
                get(): string {
                    return this.$store.state.recipes.recipeForm.recipe.description;
                },
                set(value: string) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEP}`, {
                        property: 'description',
                        value: value
                    });
                }
            },
            completionTime: {
                get(): number {
                    return this.$store.state.recipes.recipeForm.recipe.completionTime;
                },
                set(value: number) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEP}`, {
                        property: 'completionTime',
                        value: value
                    });
                }
            },
            stepsContainerSizeClass: function (): string {
                if (this.$store.state.recipes.recipeForm.recipe.removedSteps.length) {
                    return 'steps-half-size'
                } else {
                    return 'steps-full-size'
                }
            }
        },
        methods: {
            onSubmit: async function(event: Event) {
                event.preventDefault();

                try {
                    // reset errors
                    Vue.set(this, 'errors', []);

                    const headers: {[key: string]: string} = {
                        'Content-Type': 'application/json'
                    }

                    if (this.overrideMethod) {
                        headers['X-HTTP-Method-Override'] = 'PATCH'
                    }

                    const recipePayload = {
                        id: this.recipe.id,
                        name: this.recipe.name,
                        slug: this.recipe.slug,
                        description: this.recipe.description,
                        completionTime: this.recipe.completionTime,

                    };

                    const stepsPayload = {
                        createdSteps: this.createdSteps,
                        updatedSteps: this.updatedSteps,
                        removedSteps: this.removedSteps
                    }

                    const response = await fetch(this.targetUrl, {
                        method: this.formMethod,
                        headers: headers,
                        body: JSON.stringify({
                            recipe: recipePayload,
                            steps: stepsPayload
                        })
                    });

                    const responseJSON = await response.json();
                    if (response.ok) {
                        await this.$router.push(`/recipes/${responseJSON.recipe.slug}`)
                    } else {
                        if (responseJSON.errors) {
                            console.error(responseJSON.errors);
                            Vue.set(this, 'errors', [
                                ...this.errors,
                                responseJSON.errors
                            ]);
                        } else {
                            const errorMessage = 'There was a problem submitting this recipe';
                            console.error(errorMessage);
                            Vue.set(this, 'errors', [
                                ...this.errors,
                                responseJSON.errors
                            ]);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    this.errors.push('There was a problem submitting this recipe')
                }

            }
        }
    });
</script>

<style scoped lang="scss">
    #recipe_form {
        display: flex;
        flex-direction: column;
        border: 1px solid grey;
        border-radius: 2%;
        box-shadow: 3px 3px 2px #2c3e50;
        min-height: 60vh;
        width: 80%;
        margin: 0 auto;
        padding: 3%;

        .form-group {
            display: flex;
            flex-direction: column;
            width: 60%;
            margin: 2% auto;
            .form-control-lbl {
                text-align: left;
            }
        }

        #submit_recipe_btn {
            cursor: pointer;
            margin: 2% auto;
            width: 40%;
            padding: 1%;
        }

        .form-control-textarea {
            padding: 2%;
        }

        .form-control-num {
            width: 20%;
        }

        #recipe_steps_lists {
            width: 100%;
            margin: 2% auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }

    #recipe_steps_container {
        margin: 0.1%;
        /*justify-self: flex-start;*/
        border-radius: 2%;
    }

    #removed_recipe_steps_container {
        margin: 0.1%;
        /*justify-self: flex-end;*/
        border-radius: 2%;
    }

    .steps-full-size {
        min-width: 100%;
        max-width: 100%;
    }

    .steps-half-size {
        min-width: 48%;
        max-width: 48%;
    }
</style>