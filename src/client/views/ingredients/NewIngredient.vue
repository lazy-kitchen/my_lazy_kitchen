<template>
    <ingredient-form form_method="post" v-bind:errors="this.errors" v-bind:ingredient="ingredient" />
</template>

<script lang="ts">
    import IngredientForm from "@/client/components/ingredients/Form.vue";

    export default {
        name: "new-ingredient",
        components: {IngredientForm},
        data() {
            return {
                errors: ["Name can't be blank"],
                ingredient: {}
            }
        }
    }
</script>

<style scoped>

</style>