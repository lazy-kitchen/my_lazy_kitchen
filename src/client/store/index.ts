import Vue from 'vue'
import Vuex from 'vuex'
import { Recipes } from "@/client/store/modules/recipes";

Vue.use(Vuex)

const options: any = {
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
};

export default new Vuex.Store(options);
