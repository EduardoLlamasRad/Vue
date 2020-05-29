<template>
    <div>
        <h1>Galería de fotos</h1>
        <router-link :to="{name: 'Fotos', params: {id:item} }" v-for="(item,index) of fotosArreglo" :key="index">
            <button>foto: {{item}}</button>
        </router-link>
        <Foto/>
        <button @click="home">Ir a Home</button>
        <button @click="siguiente">Siguiente</button>
        <button @click="anterior">Anterior</button>
    </div>
</template>
<script>
import Foto from '../components/Fotografia'
export default {
    name: 'Fotos',
    components:{
        Foto
    },
    data() {
        return {
            fotosArreglo: [1,2,3]
        }
    },
    methods: {
        home(){
            this.$router.push('/');
        },
        siguiente(){
            this.$router.go(1);
        },
        anterior(){
            this.$router.go(-1);
        }
    }
}
</script>