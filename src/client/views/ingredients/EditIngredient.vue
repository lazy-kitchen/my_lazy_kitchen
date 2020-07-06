<template>
    <ingredient-form form_method="patch" v-bind:errors="this.errors" v-bind:ingredient="ingredient" />
</template>

<script lang="ts">
    import Vue from "vue";

    import IngredientForm from "@/client/components/ingredients/Form.vue";

    export default Vue.extend({
        name: "edit-ingredient",
        components: {IngredientForm},
        data: function() {
            return {
                errors: ["Name can't be blank"],
                ingredient: {
                    id: 1,
                    name: 'Chocolate',
                    description: 'Tasty!'
                }
            }
        }
    });
</script>

<style scoped>

</style>