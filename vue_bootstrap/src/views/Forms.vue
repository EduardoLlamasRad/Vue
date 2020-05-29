<template>
    <div class="mt-5">
        <h1>Formularios</h1>
        <form action="">
            <b-row>
                <b-col md="3">
                    <b-form-input type="text" v-model="texto" :state="comprobar"></b-form-input>
                    <p>Solo Tres caracteres</p>
            <p>Texto: {{texto}}</p>
                </b-col>
                <b-col md="3">
                    <b-form-select v-model="select" :options="animales"></b-form-select>
                    <p>Elemento seleccionado: {{select}} </p>
                </b-col>
                <b-col md="3">
                    <b-form-radio-group v-model="radio" :options="animales"></b-form-radio-group>
                    <p>Elemento seleccionado: {{radio}} </p>
                </b-col>
                <b-col md="3">
                    <b-form-checkbox-group v-model="check" :options="animales"></b-form-checkbox-group>
                    <ul v-for="(item, index) of check" :key="index">
                        <li>{{item}}</li>
                    </ul>
                </b-col>
            </b-row>
            
        </form>
    </div>
</template>
<script>
export default {
    name: 'Forms',
    data() {
        return {
            texto:'',
            radio: null,
            select: null,
            check: [],
            animales: [
                {value: null, text: 'Seleccione un animal'},
                {value: 'perro', text: 'Guau guau'},
                {value: 'gato', text: 'Miau miau'},
                {value: 'Pato', text: 'Cuac cuac'},
            ]
        }
    },
    computed: {
        comprobar(){
            return this.texto.length < 2 || this.texto.length > 3 ? false : true;
        }
    },
}
</script>