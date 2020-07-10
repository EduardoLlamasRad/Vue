<template>
    <div class="container">
        <h1>Notas</h1>
        <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="mensaje.color"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            {{mensaje.texto}}
        </b-alert>
        <form @submit.prevent="agregarNota()" v-if="!edicion">
            <h3>Agregar nota</h3>
            <input type="text" class="form-control my-2" placeholder="Usuario" v-model="nota.usuarioId">
            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="nota.nombre">
            <input type="text" class="form-control my-2" placeholder="Descripción" v-model="nota.descripcion">
            <b-button class="btn btn-success my-2" type="submit" block>Agregar</b-button>

        </form>
        <form @submit.prevent="editarNota(notasEditar)" v-if="edicion">
            <h3>Editar nota</h3>
            <input type="text" class="form-control my-2" placeholder="Usuario" v-model="notasEditar.usuarioId">
            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="notasEditar.nombre">
            <input type="text" class="form-control my-2" placeholder="Descripción" v-model="notasEditar.descripcion">
            <b-button class="btn btn-warning my-2 mx-2" type="submit">Editar</b-button>
            <b-button class="btn btn-danger my-2" @click="cancelarEdicion()">Cancelar</b-button>

        </form>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">usuario</th>
                <th scope="col">Nombre de la nota</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in notas" :key="index">
                <th scope="row">{{item._id}}</th>
                <th scope="row">{{item.usuarioId}}</th>
                <td>{{item.nombre}}</td>
                <td>{{item.descripcion}}</td>
                <td>{{item.fecha}}</td>
                <td>
                    <b-button @click="eliminarNota(item._id)" class="btn btn-danger btn-sm mx-2">Eliminar</b-button>
                </td>
                <td>
                    <!-- <b-button @click="activarEdicion(index)" class="btn btn-warning btn-sm">Editar</b-button>  con versión 1-->
                    <b-button @click="activarEdicion(item._id)" class="btn btn-warning btn-sm">Editar</b-button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Notas',
    data: () => ({
        notas: [],
        dismissSecs: 3,
        dismissCountDown: 0,
        mensaje: {
            color: '',
            texto: ''
        },
        nota: {
            nombre: '',
            descripcion: '',
            usuarioId: ''
        },
        edicion: false,
        notasEditar: {}
    }),
    created() {
        this.listarNotas();//se invoca a la función cuando se carga el sitio
    },
    methods: {
        alerta(){
            this.mensaje.color = 'success';
            this.mensaje.texto = 'probando alerta';
            this.showAlert();
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        listarNotas(){
            this.axios.get('/obtener-notas')//ruta ya establecida por defecto en el main.js + la ruta a consultar
            .then(res =>{
                console.log(res.data);
                this.notas = res.data;
            })
            .catch(e => {
                console.log(e.response);//axios utiliza el response para detectar las propiedades de los errores para las alertas
            })
        },
        agregarNota(){
            console.log(this.nota);
            this.axios.post('/crear-nota',this.nota)
            .then(res => {
                this.notas.push(res.data);
                this.nota.nombre = '';
                this.nota.descripcion = '';
                this.nota.usuarioId = '';
                this.mensaje.color = 'success';
                this.mensaje.texto = 'Nota agregada';
                this.showAlert();
            })
            .catch(e => {
                console.log(e.response);
                if(e.response.data.error.errors.nombre.properties.message){
                    this.mensaje.texto = e.response.data.error.errors.nombre.properties.message;
                }else{
                    this.mensaje.texto = 'Nota no agregada';
                }
                this.mensaje.color = 'danger';
                this.showAlert();
            })
        },
        eliminarNota(id){
            console.log(id);
            this.axios.delete(`/eliminar-nota/${id}`)
            .then(res => {
                const index = this.notas.findIndex(item => item._id === res.data._id);
                this.notas.splice(index,1);
                this.mensaje.color = 'warning';
                this.mensaje.texto = 'Nota eliminada';
                this.showAlert();
            })
            .catch(e => {
                console.log(e.response);
                this.mensaje.texto = 'Nota no eliminada';
                this.mensaje.color = 'danger';
                this.showAlert();
            })
        },
        activarEdicion(id){
            this.edicion = true;
            //version 1
            //sin usar más memoria perro suceptible a errores de información corrupta
            // this.nota.usuarioId = this.notas[index].usuarioId;
            // this.nota.nombre = this.notas[index].nombre;
            // this.nota.descripcion = this.notas[index].descripcion;
            //versión 2
            //más memoria, pero el contenido viene de la bd
            this.axios.get(`/obtener-nota/${id}`)
            .then( res => {
                this.notasEditar = res.data;
            })
            .catch( e => {
                console.log(e.response);
            })
            

        },
        cancelarEdicion(){
            this.edicion = false;
            this.nota.nombre = '';
            this.nota.descripcion = '';
            this.nota.usuarioId = '';
        },
        editarNota(nota){
            this.axios.put(`/actualizar-nota/${nota._id}`,nota)
            .then(res => {
                const index = this.notas.findIndex(item => item._id === res.data._id);
                this.notas[index].usuarioId = res.data.usuarioId;
                this.notas[index].nombre = res.data.nombre;
                this.notas[index].descripcion = res.data.descripcion;
                this.edicion = false;
                this.mensaje.color = 'success';
                this.mensaje.texto = 'Nota editada';
                this.showAlert();
            })
            .catch(e => {
                console.log(e.response);
                this.mensaje.texto = 'Nota no editada';
                this.mensaje.color = 'danger';
                this.showAlert();
            })
        }
    },
}
</script>