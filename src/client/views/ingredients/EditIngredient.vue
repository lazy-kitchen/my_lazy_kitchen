<template>
    <ingredient-form form_method="patch" v-bind:errors="this.errors" v-bind:ingredient="ingredient" />
</template>

<script lang="ts">
    import IngredientForm from "@/client/components/ingredients/Form.vue";

    export default {
        name: "edit-ingredient",
        components: {IngredientForm},
        data() {
            return {
                errors: ["Name can't be blank"],
                ingredient: {
                    id: 1,
                    name: 'Chocolate',
                    description: 'Tasty!'
                }
            }
        }
    }
</script>

<style scoped>

</style>