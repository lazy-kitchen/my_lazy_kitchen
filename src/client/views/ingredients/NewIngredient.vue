<template>
    <ingredient-form form-method="post" form-action="/ingredients" v-bind:errors="this.errors" v-bind:ingredient="ingredient" v-bind:button-text="buttonText"/>
</template>

<script lang="ts">
    import Vue from "vue";

    import IngredientForm from "@/client/components/ingredients/Form.vue";

    export default Vue.extend({
        name: "new-ingredient",
        components: {IngredientForm},
        data: function() {
            return {
                errors: [],
                ingredient: {},
                buttonText: 'Add Ingredient'
            }
        }
    });
</script>

<style scoped>

</style>