const app = new Vue({
    el: '#app',
    data:{
        titulo: 'Gestor de tareas con Vue',
        tareas: [],
        nuevaTarea: ''

    },
    methods:{
        agregarTarea: function(){
            this.tareas.push({
                nombre: this.nuevaTarea,
                estado: false
            });
            this.nuevaTarea = '';
            this.actualizarDB();

        },
        editarTarea: function(index){
            this.tareas[index].estado = true;
            this.actualizarDB();
        },
        eliminarTarea: function(index){
            this.tareas.splice(index,1);
            this.actualizarDB();
        },
        actualizarDB: function(){
            localStorage.setItem('tareasVue', JSON.stringify(this.tareas));
        }
    },
    created: function(){
        let dataDB = JSON.parse(localStorage.getItem('tareasVue'));
        if(!dataDB){
            console.log("vacio");
            this.tareas = [];
        }else{
            this.tareas = dataDB;
        }
    }
});