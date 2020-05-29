<template>
    <div>
        <ul class="list-group">
            <li v-for="(item,index) of frutas" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center" @click="aumentar(index)">
                {{index+1}} - {{item.nombre}}
                <span class="badge badge-primary badge-pill">{{item.cantidad}}</span>
            </li>
            
        </ul>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'Lista',
    computed: {
        ...mapState(['frutas']),
        
    },
    methods: {
        ...mapMutations(['aumentar'])
    }
};
</script>