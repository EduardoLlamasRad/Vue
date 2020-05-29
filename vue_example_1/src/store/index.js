import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frutas: [
      {id:1,nombre:'Manzana',cantidad:0},
      {id:2,nombre:'Papaya',cantidad:0},
      {id:3,nombre:'Pera',cantidad:0}
    ]
  },
  mutations: {
    aumentar(state,index){
      state.frutas[index].cantidad++;
    },
    limpiar(state){
      
      state.frutas.forEach(element => {
        element.cantidad = 0;
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
