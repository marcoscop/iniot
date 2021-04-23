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
                        if (err) {
                            console.log('ERROR DB: ', err);
                        }
                        //console.log('Carritos: ', carritos);

                        res.redirect('/carritos');
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
    const carritoExiste = [];
    await req.getConnection((err, conn) => {
        conn.query('SELECT * FROM carritos', (err, carritos) => {
            if (err) {
                carritoExiste.push({ text: 'Error consultando la tabla' });
                console.log(err);
            }
            if (carritos) {
                //if (carritos.length <= 0) {
                if (Object.keys(carritos).length === 0) {
                    //req.flash('success_msg', 'Note Update Successfully');
                    carritoExiste.push({ text: 'No existen carritos creados' });
                }
                console.log('carritos: ', carritos);
                res.render('carritos/all-carrito', { carritos, carritoExiste });
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
    console.log("Carrito: ", req.params.nom);
    const idCarrito = req.params.id;
    const nomCarrito = req.params.nom;
    const noNet = [];

    let nombreCarrito = {};
    //let idCarrito = "";
    //res.send('Renderizar lista de netbooks');
    await req.getConnection((err, conn) => {
        let sql = 'SELECT netbook.id AS netId, netbook.numero, netbook.serie, netbook.macaddress, netbook.marca, netbook.modelo, ' +
            ' carritos.id AS cID, carritos.nombre' +
            ' FROM netbook INNER JOIN carritos ON netbook.carrito = carritos.id WHERE carritos.id = ?';
        conn.query(sql, [req.params.id], (err, listaNetbooks) => {
            if (err) {
                console.log('error sql: ', err);
            }
            if (Object.keys(listaNetbooks).length === 0) {                
                noNet.push({text:'No existen netbooks para el Carrito seleccionado'});
                //console.log('No hay netbooks cargadas en el carrito');
                //nomCarrito
            }else{
                console.log('Netbooks pertenecientes al carrito: ',listaNetbooks);                
                //if(listaNetbooks){
                    //console.log('Lista Netbooks: ',listaNetbooks);
                    //console.log('nombre carrito: ', listaNetbooks[0].nombre);
                    //nombreCarrito = listaNetbooks[0].nombre;
                    //idCarrito = listaNetbooks[0].cID;
                //}*/
            }
            res.render('carritos/listar-nets',{
                listaNetbooks,
                nomCarrito,
                idCarrito,
                noNet
            });            
        });
    });
    
        
    
    //console.log('carrito: ', carrito);
    //console.log('Lista Netbooks: ',listaNetbooks);

};

module.exports = carritoController;