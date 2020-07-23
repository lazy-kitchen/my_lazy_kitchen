<template>
    <div class="form-container">
        <h1>{{headerText}}</h1>
        <form v-on:submit.prevent="onSubmit" v-bind:action="formAction" id="ingredient_form" v-bind:method="formMethod">
            <input type="hidden" id="id" name="id" v-model="ingredient.id" />

            <div class="form-group">
                <label for="name" class="form-control-lbl">Name</label>
                <input type="text" name="name" id="name" class="form-control" v-model.trim="ingredient.name" />
            </div>

            <div class="form-group">
                <label for="description" class="form-control-lbl">Description</label>
                <textarea id="description" name="description" class="form-control form-control-textarea" v-model.trim="ingredient.description"></textarea>
            </div>

            <input type="submit" id="submit_ingredient_btn" v-bind:value="buttonText" />
        </form>
        <form-errors v-bind:errors="errors" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FormErrors from '@/client/components/FormErrors.vue';
    import Ingredient from '@/server/db/models/ingredient';
    import { serverPort } from "@/server/config/configuration";

    export default Vue.extend({
        name: 'ingredient-form',
        components: {FormErrors},
        props: {
            formMethod: String,
            formAction: String,
            headerText: String,
            buttonText: String,
            initialIngredient: {
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
            }
        },
        computed: {
            targetUrl: function (): string {
                const targetUrl = new URL(`http://localhost:${serverPort}`);
                targetUrl.pathname = `/api/${this.formAction}`;

                return targetUrl.toString();
            },
            ingredient: function (): Ingredient {
                return Object.assign({}, this.initialIngredient);
            }
        },
        methods: {
            onSubmit: async function(event: Event) {
                event.preventDefault();

                try {
                    // reset errors
                    this.errors = [];

                    const headers: {[key: string]: string} = {
                        'Content-Type': 'application/json'
                    }

                    if (this.overrideMethod) {
                        headers['X-HTTP-Method-Override'] = 'PATCH'
                    }

                    const ingredientPayload = {
                        id: this.ingredient.id,
                        name: this.ingredient.name,
                        description: this.ingredient.description
                    };

                    const response = await fetch(this.targetUrl, {
                        method: this.formMethod,
                        headers: headers,
                        body: JSON.stringify({
                            ingredient: ingredientPayload
                        })
                    });

                    const responseJSON = await response.json();
                    if (response.ok) {
                        await this.$router.push(`/ingredients/${responseJSON.ingredient.slug}`)
                    } else {
                        if (responseJSON.errors) {
                            console.error(responseJSON.errors);
                            this.errors.concat(responseJSON.errors)
                        } else {
                            const errorMessage = 'There was a problem submitting this ingredient';
                            console.error(errorMessage);
                            this.errors.push(errorMessage);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    this.errors.push('There was a problem submitting this ingredient')
                }

            }
        }
    });
</script>

<style scoped lang="scss">
    #ingredient_form {
        display: flex;
        flex-direction: column;
        border: 1px solid grey;
        border-radius: 2%;
        box-shadow: 3px 3px 2px #2c3e50;
        min-height: 60vh;
        width: 50%;
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

        #submit_ingredient_btn {
            cursor: pointer;
            margin: 2% auto;
            width: 40%;
            padding: 1%;

            position: relative;
        }

        .form-control-textarea {
            padding: 2%;
        }
    }
</style>