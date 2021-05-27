const pool = require('../database');
const carritoController = {};
const { validationResult } = require('express-validator');
const createValidation = require('../validations/validations');

carritoController.renderNewCarrito = (req, res) => {
    //res.send('crear nuevo carrito');
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

    let sql = 'SELECT nombre, id FROM carritos WHERE nombre =?';
    const carrito = await pool.query(sql, [nombre]);

    //--> Validar que no exista un carrito con el mismo nombre                
    if (Object.keys(carrito).length != 0) {
        carritoExiste.push({ text: 'Ya existe un carrito con el nombre que intenta usar' });
    }
    if (errores.isEmpty() && carritoExiste.length === 0) {
        const newCarrito = req.body;
        sql = 'INSERT INTO carritos set ?';
        await pool.query(sql, [newCarrito]);
        //console.log('Carritos: ', carritos);
        res.redirect('/carritos');
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
carritoController.showCarritos = async (req, res) => {
    //res.send('Listando los carritos');
    const carritoExiste = [];

    const carritos = await pool.query('SELECT * FROM carritos');
    if (carritos) {
        //if (carritos.length <= 0) {
        if (Object.keys(carritos).length === 0) {
            //req.flash('success_msg', 'Note Update Successfully');
            carritoExiste.push({ text: 'No existen carritos creados. Vaya a Carritos -> Add Carrito y cree uno' });
        }
        //console.log('carritos: ', carritos);
        res.render('carritos/all-carrito', { carritos, carritoExiste });
    }
}

carritoController.renderEditForm = async (req, res) => {
    //console.log(req.params.id);
    const idCarrito = req.params.id;
    const sql = 'SELECT * FROM carritos WHERE carritos.id = ?';
    const carrito = await pool.query(sql, [idCarrito]);
    if (Object.keys(carrito).length > 0) {
        const { id, nombre, cantidad, detalle } = carrito[0];
        res.render('carritos/edit-carrito', {
            id,
            nombre,
            cantidad,
            detalle
        });
    }

}
carritoController.updateCarrito = async (req, res) => {
    //console.log('BODY:', req.body);
    //console.log('id: ', req.params.id);
    const id = req.params.id;

    const carrito = {
        nombre,
        cantidad,
        detalle
    } = req.body;
    console.log('datos carrritos: ', carrito);
    await pool.query('UPDATE carritos SET ? WHERE carritos.id = ?', [carrito, id]);
    req.flash('success_msg', 'Carrito modificado correctamente');
    res.redirect('/carritos');
}

carritoController.renderNetbook = async (req, res) => {
    //console.log("Carrito ID: ", req.params.id);
    //console.log("Carrito: ", req.params.nom);
    const idCarrito = req.params.id;
    const nomCarrito = req.params.nom;
    const noNet = [];

    let nombreCarrito = {};
    //let idCarrito = "";
    //res.send('Renderizar lista de netbooks');

    let sql = 'SELECT netbook.id AS netId, netbook.numero, netbook.serie, netbook.macaddress, netbook.marca, netbook.modelo, ' +
        ' carritos.id AS cID, carritos.nombre' +
        ' FROM netbook INNER JOIN carritos ON netbook.carrito = carritos.id WHERE carritos.id = ?';
    const listaNetbooks = await pool.query(sql, [req.params.id]);

    if (Object.keys(listaNetbooks).length === 0) {
        noNet.push({ text: 'No existen netbooks para el Carrito seleccionado' });

    } else {
        //console.log('Netbooks pertenecientes al carrito: ', listaNetbooks);
        //if(listaNetbooks){
        //console.log('Lista Netbooks: ',listaNetbooks);
        //console.log('nombre carrito: ', listaNetbooks[0].nombre);
        //nombreCarrito = listaNetbooks[0].nombre;
        //idCarrito = listaNetbooks[0].cID;
        //}*/
    }
    res.render('carritos/listar-nets', {
        listaNetbooks,
        nomCarrito,
        idCarrito,
        noNet
    });

};

module.exports = carritoController;