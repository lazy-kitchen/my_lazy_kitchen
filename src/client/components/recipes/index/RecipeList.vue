<template>
    <ul class="recipes_list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-list-item">
            <router-link :to="{name: 'recipe', params: {id: recipe.id}}">{{recipe.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Recipe} from "@/server/db/models";

    @Component
    export default class RecipeList extends Vue {
        // @Prop() private recipes!: Array<object>;
        recipes: Array<Recipe> = [];

        async created() {
            try {
                // TODO update url
                const response = await fetch('http://localhost:8000/api/recipes', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseJSON = await response.json();
                this.recipes = responseJSON.recipes;
            } catch(error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>

</style>