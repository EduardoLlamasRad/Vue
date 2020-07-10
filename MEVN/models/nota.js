import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    nombre: {
        type: String, 
        required: [true, 'Campo requerido']
    },
    descripcion: String, //si no se pasan más propiedades, solo basta con poner el tipo de dato
    usuarioId: String,
    fecha: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
});

const Nota = mongoose.model('Nota', notaSchema);

export default Nota;
