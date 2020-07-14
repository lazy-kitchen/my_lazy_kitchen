<template>
    <ingredient-form
            form-method="post"
            form-action="ingredients"
            v-bind:errors="this.errors"
            header-text="Add New Ingredient"
            button-text="Add Ingredient"
            v-bind:initial-ingredient="this.ingredient"
    />
</template>

<script lang="ts">
    import Vue from "vue";

    import IngredientForm from "@/client/components/ingredients/Form.vue";

    export default Vue.extend({
        name: 'new-ingredient',
        components: {IngredientForm},
        data: function() {
            return {
                errors: [],
                ingredient: {}
            }
        }
    });
</script>

<style scoped>

</style>