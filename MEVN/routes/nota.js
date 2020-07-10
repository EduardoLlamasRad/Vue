import express from 'express';
const router = express.Router();

// importar el modelo de la nota
import Nota from '../models/nota'

//agregar la nota
router.post('/crear-nota', async(req,res) => {
    const body = req.body;
    try {
        const notaBD = await Nota.create(body);
        res.status(200).json(notaBD)
        
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor',
            error //como se envía el parametro error con el mismo nombre que la clave, no es necesario hacer "error: error"
        });        
    }
});

//solicitar notas con parámetros
router.get('/obtener-nota/:id', async(req,res) => {
    const id = req.params.id;
    try {
        const notaBD = await Nota.findOne({_id:id}); //si se le coloca el mismo nombre a la variable que al campo a buscar, no es necesario poner por ejemplo _id:_id ó _id:id
        res.json(notaBD);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error en el servidor al tratar de recuperar la informacion',
            error //como se envía el parametro error con el mismo nombre que la clave, no es necesario hacer "error: error"
        });
    }
});

//solicitar todas las notas

router.get('/obtener-notas', async(req,res) => {
    try {
        const notasBD = await Nota.find();
        res.json(notasBD);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error en la BD al tratar de recuperar la informacion de las notas',
            error //como se envía el parametro error con el mismo nombre que la clave, no es necesario hacer "error: error"
        });
    }
});

//Eliminar notas

router.delete('/eliminar-nota/:id', async(req,res) => { //la ruta puede ser igual ya que tiene diferentes verbos
    const _id = req.params.id;
    try {
        const notaBD = await Nota.findByIdAndDelete({_id});
        if(!notaBD){
            return res.status(400).json({
                mensaje: 'no existe la nota a eliminar'
            });
        }
        res.json(notaBD);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error en la BD al tratar de eliminar la nota',
            error //como se envía el parametro error con el mismo nombre que la clave, no es necesario hacer "error: error"
        });
    }
});

//actualizar notas
router.put('/actualizar-nota/:id', async(req,res) => { //la ruta puede ser igual ya que tiene diferentes verbos
    const _id = req.params.id;
    const body = req.body;
    try {
        const notaBD = await Nota.findByIdAndUpdate(
            _id,
            body,
            {new: true}
            );
        if(!notaBD){
            return res.status(400).json({
                mensaje: 'no existe la nota a actualizar'
            });
        }
        res.json(notaBD);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error en la BD al tratar de actualizar la nota',
            error //como se envía el parametro error con el mismo nombre que la clave, no es necesario hacer "error: error"
        });
    }
});


//Exportación del router

module.exports = router;
