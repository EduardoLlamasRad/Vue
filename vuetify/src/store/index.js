import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listaTareas:[
      {id:1,titulo:'TituloTarea 1', descripcion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit optio modi saepe amet, consequuntur doloribus. Porro officia earum, animi facilis accusantium fugit maxime accusamus magni ipsam velit. Ipsam, fuga iusto. 1'},
            {id:2,titulo:'TituloTarea 2', descripcion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit optio modi saepe amet, consequuntur doloribus. Porro officia earum, animi facilis accusantium fugit maxime accusamus magni ipsam velit. Ipsam, fuga iusto. 2'}
    ],
    titulo: '',
    descripcion: '',
    snackbar: false,
    snakBarText: '',
    timeout: 2000,
    formularioAdd: true,
    indexTarea: '',
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    agregarTarea(state){
      if(state.titulo === '' || state.descripcion === ''){
          state.snackbar = true;
          state.snakBarText = 'Llene todos los campos';

      }
      else{
          state.listaTareas.push({
              id: Date.now(),
              titulo: state.titulo,
              descripcion: state.descripcion,

          });
          state.titulo = '';
          state.descripcion = '';
          state.snakBarText = 'Tarea agregada';
          state.snackbar = true;
      }

    },
    eliminarTarea(state, id){
        state.listaTareas = state.listaTareas.filter(e => e.id != id);
        state.snakBarText = 'Tarea eliminada';
        state.snackbar = true;
    },
    editarTarea(state, index){
        state.formularioAdd = false;
        state.titulo = state.listaTareas[index].titulo;
        state.descripcion = state.listaTareas[index].descripcion;
        state.indexTarea = index;
    },
    guardarEdicion(state, index){
        state.listaTareas[index].titulo = state.titulo;
        state.listaTareas[index].descripcion = state.descripcion;
        state.titulo = '';
        state.descripcion = '';
        state.indexTarea = '';
        state.formularioAdd = true;
        state.snakBarText = 'Tarea Editada';
        state.snackbar = true;
    }
    
  },
  actions: {
  },
  modules: {
  }
})
