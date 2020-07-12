<template>
    <div class="form-container">
        <h1>{{headerText}}</h1>
        <form v-on:submit.prevent="onSubmit" v-bind:action="formAction" id="recipe_form" v-bind:method="formMethod">
            <div class="form-group">
                <label for="name" class="form-control-lbl">Name</label>
                <input type="text" id="name" name="name" class="form-control" v-model.trim="initialRecipe.name" />
            </div>

            <div class="form-group">
                <label for="description" class="form-control-lbl">Description</label>
                <textarea id="description" name="description" class="form-control form-control-textarea" v-model.trim="initialRecipe.description"></textarea>
            </div>

            <div class="form-group">
                <label for="completion_time" class="form-control-lbl">Completion Time</label>
                <input type="text" id="completion_time" name="completion_time" class="form-control" min="0" v-model.number="initialRecipe.completionTime" />
            </div>

            <input type="submit" id="submit_recipe_btn" v-bind:value="buttonText" />
        </form>
        <form-errors v-bind:errors="errors" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FormErrors from "@/client/components/FormErrors.vue";
    import { Recipe } from '@/server/db/models';

    export default Vue.extend({
        name: 'recipe-form',
        components: {FormErrors},
        props: {
            formMethod: String,
            formAction: String,
            headerText: String,
            buttonText: String,
            initialRecipe: {
                type: Object,
                default: function () {
                    return {};
                }
            },
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
            targetUrl: function (): string {
                const targetUrl = new URL('http://localhost:8000');
                targetUrl.pathname = `/api/${this.formAction}`;

                return targetUrl.toString();
            },
            recipe: function (): Recipe {
                return Object.assign({}, this.initialRecipe)
            }
        },
        methods: {
            onSubmit: async function() {
                try {
                    // reset errors
                    this.errors = [];

                    const headers: {[key: string]: string} = {
                        'Content-Type': 'application/json'
                    }

                    if (this.overrideMethod) {
                        headers['X-HTTP-Method-Override'] = 'patch'
                    }

                    const recipePayload = {
                        id: this.recipe.id,
                        name: this.recipe.name,
                        description: this.recipe.description,
                        completionTime: this.recipe.completionTime
                    }

                    const response = await fetch(this.targetUrl, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            recipe: recipePayload
                        })
                    });

                    const responseJSON = await response.json();
                    if (response.ok) {
                        console.log(responseJSON.recipe)
                    } else {
                        if (responseJSON.errors) {
                            console.error(responseJSON.errors);
                            this.errors.concat(responseJSON.errors)
                        } else {
                            const errorMessage = 'There was a problem submitting this recipe';
                            console.error(errorMessage);
                            this.errors.push(errorMessage);
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

<style scoped>

</style>