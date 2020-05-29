Vue.component('hijo',{//siempre debe contener un template los componentes de vue
    template:/*template*/
    `
    <div class="py-5 bg-success">
        <h4>Componente hijo: {{numero}}</h4>
        <h4>Nombre: {{nombre}}</h4>
    </div>
    `,//las propiedades 'parámetros' que se desean pasar, deben estár declarados en un arreglo dentro de la propiedad props
    props:['numero'],
    data(){
        return{
            nombre: 'Ignacio'
        }
    },
    mounted(){//mounted es un evento dentro del ciclo de vida de vue, que puede emitir eventos despues de averse creado el doom del componente
        this.$emit('nombreHijo',this.nombre);
    }
});