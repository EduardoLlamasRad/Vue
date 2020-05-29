const app = new Vue({
    el: '#app',
    data: {
        titulo:'Hola mundo con Vue',
        frutas: ['papaya','guayaba','mango','pera','limon'],
        coches: [
            {Modelo:'Mazda',Anio:'2014'},
            {Modelo:'Ford',Anio:'2018'},
            {Modelo:'Mercedez Benz',Anio:'2016'},
            {Modelo:'Kia',Anio:'2020'}
        ],
        ejemplos: {
            ejemplo1: 'ejemplo de for',
            ejemplo2: 'ejemplo de for con objetos', 
            ejemplo3: 'ejemplo condicional IF',
            ejemplo4: 'ejemplo Tipos de click y acciones onclick',
            ejemplo5: 'comunicación entre inputs y JS mediante v-model y llamadas a función'
        },
        newElements:'',
        newCantidad:'',
        total:0,
        newFrutas: [
            {nombre:'pera',cantidad:5},
            {nombre:'guayaba',cantidad:2},
            {nombre:'melon',cantidad:0},
            {nombre:'sandia',cantidad:10}
        ]
        
    },
    methods:{
        clickedElement(){
            alert('clicked');
        },
        agregarFruta(){
            this.newFrutas.push({
                nombre: this.newElements, cantidad: this.newCantidad
            });
            this.newElements = '';
            this.newCantidad = '';
        }
    },
    computed:{
        sumarFruta(){
            this.total = 0;
            for(fruta of this.newFrutas){
                this.total += fruta.cantidad;
            }
            return this.total;
        }
    }
})