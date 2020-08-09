import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import { Recipes } from "@/client/store/modules/recipes";

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
    }
  }
};

export default new Vuex.Store(options);
