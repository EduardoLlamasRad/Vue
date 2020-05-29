
Vue.component('titulo',{
    template: /*html*/
    `
    <div>
        <h1>
          numero: {{numero}}
        </h1>
        <hijo></hijo>
        <button @click="getCursos">Obtener Cursos</button>
        <ul v-for="element of cursos" >
          <li>{{element.nombre}}</li>
        </ul>

      </div>
    `,
    computed:{
      ...Vuex.mapState(['numero','cursos'])
    },
    methods:{
      ...Vuex.mapActions(['getCursos'])
    }
});
Vue.component('hijo',{
    template: /*html*/
    `
    <div>
        <button @click="aumentar">+</button>
        <button @click="disminuir(2)">-</button>
        <h1>
          numero: {{numero}}
        </h1>
      </div>
    `,
    computed:{
      ...Vuex.mapState(['numero'])
    },
    methods:{
      ...Vuex.mapMutations(['aumentar','disminuir'])
    }
});
const store = new Vuex.Store({
    state:{
        numero : 10,
        cursos: []
    },
    mutations:{
        aumentar(state){
            state.numero++;
        },
        disminuir(state,n){
          state.numero -= n;
        },
        llenarCursos(state, cursosAccion){
          state.cursos = cursosAccion;
        }
    },
    actions:{
      getCursos: async function({commit}){
        const data = await fetch('../JSON/cursos.json');
        const cursos = await data.json();
        commit('llenarCursos',cursos); 
      }
    }
});
