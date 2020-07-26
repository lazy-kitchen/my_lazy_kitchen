import Vue from 'vue'
import Vuex from 'vuex'
import { Recipes } from "@/client/store/modules/recipes";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recipes: {
      namespaced: true,
      ...Recipes
    }
  }
})
