import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Ingredient from '../views/Ingredient.vue';
import Ingredients from '../views/Ingredients.vue';
import Recipe from '../views/Recipe.vue';
import Recipes from '../views/Recipes.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: Ingredients
    },
    {
      path: '/ingredients/:id',
      name: 'ingredient',
      component: Ingredient
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: Recipe
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
