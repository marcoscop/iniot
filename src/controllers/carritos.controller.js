const Carrito = require('../models/Carrito');
const carritoController = {};

carritoController.renderNewCarrito = (req,res) => {
    //res.send('crear nuevo carrito');    
    res.render('carritos/new-carrito');
};
carritoController.addNewCarrito = async(req, res) => {
    const errors = [];
    console.log(req.body);
    const {nombre, cantidad, detalle} = req.body;
    if(nombre == ''){
        errors.push({text:'El Carrito debe tener un Nombre'})
    }
    if(cantidad == ''){
        errors.push({text:'Debe colocar la cantidad de netbooks'});
    }
    if(nombre.length < 3){
        errors.push({text:'El nombre debe tener al menos 3 caracteres'});
    }
    if(errors.length > 0){
        res.render('carritos/new-carrito',{
            errors,
            nombre,
            cantidad,
            detalle
        });
    }else{
        const nombreCarrito = await Carrito.findOne({nombre:nombre});
        if(nombreCarrito){
            req.flash('error_msg','El Nombre que intenta usar ya esta en uso');
            res.redirect('carritos/new-carrito');
        }else{
            const newCarrito = new Carrito({nombre, cantidad, detalle});
            await newCarrito.save();
            req.flash('success_msg','El Carrito ha sido creado');
            res.send('Redireccionando a Vista de Carritos');
        }
    }
}
module.exports = carritoController;