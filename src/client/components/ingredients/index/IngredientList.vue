<template>
    <ul class="ingredients_list">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-list-item">
            <router-link :to="{name: 'ingredient', params: {id: ingredient.id}}">{{ingredient.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Ingredient} from "@/server/db/models";

    @Component
    export default class IngredientList extends Vue {
        // @Prop() private ingredients!: Array<object>;
        ingredients: Array<Ingredient> = [];

        async created() {
            try {
                // TODO update url
                const response = await fetch('http://localhost:8000/api/ingredients');
                const responseJSON = await response.json();
                this.ingredients = responseJSON.ingredients;
            } catch(error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>

</style>