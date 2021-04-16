const { check } = require('express-validator');
const validationExpress = require('express-validator');

function creatCarritoValidation(data){
    const {nombre, cantidad, detalle} = data;
    //const errors = [];

    const errors = [
        check('nombre', 'El nombre dene tener mas de 2 caracteres !!!')
        .isEmpty()
    ]
    return errors;
    //-----------------------nombre--------------------------------//
/*    if(typeof nombre !== 'string'){
        errors.push({text:'El nombre debe ser texto'});
    }
    if(nombre.length > 2){
        errors.push({text:'Nombre debe tener minimo tres caracteres'});
    }
    if(/^[a-z]$/i.test(nombre)){
        errors.push({text:'El nombre debe ser solamente texto'});
    }
    //--------------------cantidad-----------------------------------//
    console.log(typeof cantidad);
    if(typeof cantidad !== 'number'){
        errors.push({text:'Cantidad debe ser un numero'});
    }
    return errors; */
}
module.exports = {
    creatCarritoValidation
}