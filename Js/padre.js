Vue.component('padre',{//siempre deben de contenerse el template en un div o en algun otro contenedor
    template:/*html*/
    `
    <div class="p-5 bg-dark text-white">
        <h2>Componente Padre: {{numeroPadre}}</h2>
        <button class="btn btn-danger" @click="numeroPadre++">+</button>
        {{nombrePadre}}
        <hijo :numero="numeroPadre" @nombreHijo="nombrePadre = $event"></hijo>
    </div>
    `,//el @nombreHijo es un evento personalizado creado para mandar valores del componente hijo al padre despues de que se crearon los elementos del dom del componente donde se creael evento
    //se captura el evento como si fuera un click anteponiendo el @ al nombre del evento
    //los componentes, pueden contener otros componentes
    data(){//la data siempre regresa un objeto y se maneja de esta forma en componentes de vue
        return{
            numeroPadre: 0,
            nombrePadre: ''

        }
    }
});