<template>
    <div>
        <button class="btn btn-danger my-5" @click="limpiar">Reiniciar</button>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default {
    name: 'BotonLimpiar',
    computed: {
        ...mapState(['frutas'])
    },
    methods: {
        ...mapMutations(['limpiar'])
    },
};
</script>