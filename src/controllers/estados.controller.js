const { validationResult } = require("express-validator");

const pool = require('../database');

const estadoController = {}

estadoController.renderEstado = async (req, res) => {

    sql = 'SELECT * FROM estados';
    const listaEstados = await pool.query(sql);
    //console.log(listaEstados);
    if (listaEstados && Object.keys(listaEstados).length > 0) {
        res.render('estados/estados-detail', {
            listaEstados
        });
    } else {
        const errorMsg = [];
        errorMsg.push({ msg: 'No se han creado estados aún' });
        res.render('estados/estados-detail', errorMsg)
    }
};
estadoController.renderNewEstado = async (req, res) => {
    console.log(req.body);
    const { nombre_estado, estado, detalle } = req.body;
    console.log('estado: ', estado);
    const newEstado = {
        nombre_estado: nombre_estado,
        estado: estado
    }
    let sql = 'INSERT INTO estados SET ?';
    await pool.query(sql, [newEstado]);
    req.flash('success_msg', 'Se ha creado un nuevo Estado');
    res.redirect('/estados/');
};

estadoController.renderAddEstado = async (req, res) => {
    //res.send('anda');
    const idNetbook = req.params.id;
    //console.log(idNetbook)

    let sql = 'SELECT netbook.id, netbook.numero, netbook.serie FROM netbook WHERE netbook.id = ?';
    const netbook = await pool.query(sql, [idNetbook]);
    if (Object.keys(netbook).length === 0) {
        console.log('|--> DB-Error: Hubo un error ;-)');
    } else {
        const datosNetbook = {
            id: netbook[0].id,
            numero: netbook[0].numero,
            serie: netbook[0].serie
        };
        //console.log('datos netbook: ', netbook);
        sql = 'SELECT estados_netbooks.observaciones AS detalle, estados.nombre_estado, estados.estado, DATE_FORMAT(fecha, "%e-%m-%Y - %H:%i") AS fecha FROM estados_netbooks INNER JOIN estados ON estados_netbooks.id_estado = estados.id WHERE estados_netbooks.id_netbook = ?'
        const listaEstados = await pool.query(sql, [idNetbook]);
        const estados = await pool.query('SELECT * FROM estados');
        console.log('lista estados: ', estados);
        res.render('estados/all-estados', {
            datosNetbook,
            listaEstados,
            estados
        });
    }
}

estadoController.saveEstado = async (req, res) => {
    console.log('Parametros: ',req.params);
    const idNetbook = req.params.id;
    console.log('Body: ', req.body);
    const { estado, fecha, detalle } = req.body;
    const errorValidation = validationResult(req);
    let errorMsg = [];
    if (!errorValidation.isEmpty()) {
        errorMsg = errorValidation.array();
        console.log('Errores: ', errorMsg);
        res.render('estados/all-estados', {
            errorMsg
        })
    } else {
        const tiempo = new Date();
        const hora = tiempo.getHours();
        const minutos = tiempo.getMinutes();
        const fechaEstado = fecha + ' ' + hora + ':' + minutos;
        const estadoNetbook = {
            id_netbook: idNetbook,
            id_estado: estado,
            fecha: fechaEstado,
            observaciones: detalle
        };
        console.log('--->Nuevo estado: ', estadoNetbook);
        pool.query('INSERT INTO estados_netbooks SET ?', [estadoNetbook]);
        req.flash('success_msg', 'Se ha cambiado el estado de la netbook');
        res.redirect('/prestamos/add');
    }
}
estadoController.renderEditEstado = async (req, res) => {
    const {id} = req.params;
    //console.log('ID: ', id);
    const sql = 'SELECT * FROM estados WHERE estados.id = ?';
    try {
        const estado = await pool.query(sql, [id]);
        const listaEstados = await pool.query('SELECT * FROM estados');        
        //console.log('estado: ', estado);
        const datosEstado = {
            id:estado[0].id,
            estado:estado[0].estado,
            nombre_estado:estado[0].nombre_estado
        }
        //console.log('datosEstados: ', datosEstado);
        res.render('estados/edit-estado',{
            datosEstado,
            listaEstados
        })
    } catch (error) {
        
    }
}

estadoController.updateEstado = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    console.log('body: ', body);
    const newEstado = {
        id: id,
        estado: body.estado,
        nombre_estado:body.nombre_estado
    };
    console.log('estado: ', newEstado);
    const sql = 'UPDATE estados SET ? WHERE estados.id = ?';
    await pool.query(sql, [newEstado, id]);
    req.flash('success_msg','Se ha actualizado el Estado.');
    res.redirect('/estados');
}

estadoController.deleteEstado = async (req, res) => {
    const { id } = req.params;
    const estados = await pool.query('SELECT * FROM estados WHERE id = ?', [id]);
    const sql = 'DELETE FROM estados WHERE id =?';
    try {
        await pool.query(sql, [id]);
        req.flash('warning_msg', 'Se ha eliminado un Estado');
        res.redirect('/estados');
        console.log('Estados: ', estados);
    } catch (error) {
        console.log('|--> BD-Error: ', error);
        req.flash('error_msg', 'Se ha producido un error !');
        res.redirect('/estados');
    }
};

module.exports = estadoController;