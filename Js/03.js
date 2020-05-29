
//Variables
const formulario = document.getElementById('formulario');
const listaActividades = document.getElementById('listaActividades');
let arrayActividades = [];


//Funciones

const crearItem = (actividad) =>{
    let item ={
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}

const guardarDB = ()=>{
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    pintarDB();

}

const pintarDB = () =>{
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    listaActividades.innerHTML = '';
    
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            let estadoColor = '';
            if(element.estado){
                estadoColor += 'alert-success';
            }else{
                estadoColor += 'alert-danger';
            }
            listaActividades.innerHTML += `
                <div class="alert ${estadoColor}" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
        });
    }
}

const eliminarDB = (actividad) =>{
    let indexElemToDel;
    arrayActividades.forEach((e, index) =>{
        if(e.actividad === actividad){
            indexElemToDel = index;
        }
    });
    arrayActividades.splice(indexElemToDel,1);//eliminar con splice solo un elemento
    guardarDB();
}

const realizarActividad = (actividad) =>{//buscar el index de otra forma
    let indexArray = arrayActividades.findIndex((e) =>
        e.actividad === actividad
    );
    arrayActividades[indexArray].estado = true;
    guardarDB();
}

//EventListener

formulario.addEventListener('submit', (e) =>{
    e.preventDefault(); //prevenir cualquier otra cosa
    let actividad = document.getElementById('actividad').value;

    crearItem(actividad);
    guardarDB();
    formulario.reset();

});

document.addEventListener('DOMContentLoaded', pintarDB);
listaActividades.addEventListener('click', (e) =>{

    e.preventDefault();
    
    if(e.target.innerHTML === 'done'){
        //console.log('done');
        realizarActividad(e.path[2].childNodes[1].innerHTML);
    }else if(e.target.innerHTML === 'delete'){
        //console.log('delete');
        eliminarDB(e.path[2].childNodes[1].innerHTML);
    }
    //let elemSelected = e.path[2].childNodes[3].innerHTML;
});