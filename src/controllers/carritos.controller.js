const carritoController = {};
const { validationResult } = require('express-validator');
const createValidation = require('../validations/validations');

carritoController.renderNewCarrito = (req, res) => {
    //res.send('crear nuevo carrito');    

    req.getConnection((err, conn) => {
        if (err) {
            console.log('Error en la conexion');
        }

    });
    res.render('carritos/new-carrito');
};
carritoController.addNewCarrito = async (req, res,) => {
    const { nombre, cantidad, detalle } = req.body;
    let errorMsg = [];
    const carritoExiste = [];
    const ab = [];
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        //return res.status(422).jsonp(errores.array());
        //console.log(errores);
        errorMsg = errores.array();
    }
    await req.getConnection((err, conn) => {
        let sql = 'SELECT nombre, id FROM carritos WHERE nombre =?';
        conn.query(sql, [nombre], (err, carrito) => {
            if (err) {
                console.error(err);
            } else {
                //--> Validar que no exista un carrito con el mismo nombre                
                if (Object.keys(carrito).length != 0) {                                        
                    carritoExiste.push({ text: 'Ya existe un carrito con el nombre que intenta usar' });
                }
                if (errores.isEmpty() && carritoExiste.length === 0) {
                    const newCarrito = req.body;
                    sql = 'INSERT INTO carritos set ?';
                    conn.query(sql, [newCarrito], (err, carritos) => {
                        if(err){
                            console.log('ERROR DB: ', err);
                        }
                        console.log('Carritos: ', carritos);
                        res.redirect('carritos/');
                    });                    
                } else {
                    console.log(errorMsg);
                    res.render('carritos/new-carrito', {
                        carritoExiste,
                        errorMsg,
                        nombre,
                        cantidad,
                        detalle
                    });
                }                
            }
        });
    });
}
carritoController.showCarritos = async (req, res) => {
    //res.send('Listando los carritos');
    const errors = [];
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM carritos', (err, carritos) => {
            if (err) {
                errors.push({ text: 'Error consultando la tabla' });
                console.log(err);
            }
            if (carritos) {
                //if (carritos.length <= 0) {
                if(Object.keys(carritos).length === 0){
                    //req.flash('success_msg', 'Note Update Successfully');
                    errors.push({ text: 'No existen carritos creados' });
                }
                res.render('carritos/all-carrito', { carritos, errors });
            }
        });
    });
    //console.log(carritos);

}

carritoController.renderEditForm = async (req, res) => {
    //console.log(req.params.id);

    //console.log(carrito);

}
carritoController.updateCarrito = async (req, res) => {
    console.log(req.body);

    req.flash('success_msg', 'Carrito modificado correctamente');
    res.redirect('/carritos');
}

carritoController.renderNetbook = async (req, res) => {
    console.log("Carrito ID: ", req.params.id);
    //res.send('Renderizar lista de netbooks');

    //console.log('carrito: ', carrito);
    //console.log('Lista Netbooks: ',listaNetbooks);

};

module.exports = carritoController;