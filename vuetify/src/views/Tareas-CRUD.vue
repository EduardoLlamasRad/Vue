<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md6>
                    <v-card class="mb-3 pa-2" wrap v-for="(item,index) in listaTareas" :key="index">
                        <v-card-text>
                            <v-chip label color="pink" dark>
                                <v-icon medium class="mr-1">mdi-arrow-up-bold-box-outline</v-icon>
                                {{item.titulo}}
                            </v-chip>
                            <p class="ml-0">{{item.descripcion}}</p>
                        </v-card-text>
                        <v-btn class="ma-2" color="warning" @click="editarTarea(index)">Editar</v-btn>
                        <v-btn class="ma-2" color="error" @click="eliminarTarea(item.id)">Eliminar</v-btn>
                    </v-card>
                </v-flex>
                <v-flex md6 v-if="formularioAdd">
                    <v-card class="mb-3 pa-3">
                        <v-form @submit.prevent="agregarTarea()">
                            <v-text-field label="Titulo tarea" v-model="titulo"></v-text-field>
                            <v-textarea label="descripción tarea" v-model="descripcion">lo</v-textarea>
                            <v-btn block color="success" type="submit">Agregar Tarea</v-btn>
                        </v-form>
                    </v-card>
                </v-flex>
                <v-flex md6 v-if="!formularioAdd">
                    <v-card class="mb-3 pa-3">
                        <v-form @submit.prevent="guardarEdicion(indexTarea)">
                            <v-text-field label="Titulo tarea" v-model="titulo"></v-text-field>
                            <v-textarea label="descripción tarea" v-model="descripcion">lo</v-textarea>
                            <v-btn block color="warning" type="submit">Editar tarea</v-btn>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ snakBarText }}
                <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
        </v-container>
        
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
import { mapFields } from 'vuex-map-fields';
export default {
    name: 'tareas-crud',
    data: () =>({
        
    }),
    computed: {
        ...mapState(['listaTareas','snakBarText','timeout','formularioAdd','indexTarea']),
        ...mapFields(['titulo','descripcion','snackbar'])
    },
    methods: {
        ...mapMutations(['agregarTarea','eliminarTarea','editarTarea','guardarEdicion'])
    },
}
</script>