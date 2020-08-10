import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Recipes } from "@/client/store/modules/recipes";
import { Modal } from "@/client/store/modules/modal";

Vue.use(Vuex)

const options: StoreOptions<object> = {
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
    },
    modal: {
      namespaced: true,
      ...Modal
    }
  }
};

export default new Vuex.Store(options);
