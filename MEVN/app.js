const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
//para acceder al directorio actual
const path = require('path');
const mongoose = require('mongoose');

//Middleware para ver las peticiones
app.use(morgan('tiny'));
// Middleware para hacer solicitudes externas e impedir bloqueo por Cors
app.use(cors());
//Para las apis en JSON
app.use(express.json());
//para uso de apps externas application/x-www-form-urlencoded en vez del parse json
app.use(express.urlencoded({ extended: true }));
//para las rutas
// app.get('/',function(req, res){
//     res.send('Hola Mundo!');
// });
//Conexión a BD
//mongod --dbphat C:\DirecciónBD\
const uri = 'mongodb://localhost:27017/bdmevn';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true
}
mongoose.connect(uri,options).then(
    () => {
        console.log('conectado a mongo');
    },
    error => {
        error
    }
);

// api
app.use('/api',require('./routes/nota'));

//Middleware para VUE router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));



//para setear el puerto de producción o el de devop en caso de no existir
app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function(){
    console.log('Escuchando en puerto ' + app.get('puerto'));
    
});