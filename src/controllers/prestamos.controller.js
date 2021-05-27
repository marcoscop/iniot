const { validationResult } = require("express-validator");

const pool = require('../database');

const createValidation = require('../validations/validations');

const prestamoController = {};

prestamoController.renderPrestamoForm = async (req, res) => {
    //res.send('Renderizando formulario para prestamos');
    //res.render('prestamos/new-prestamo');
    //    req.getConnection((err, conn) => {    DATE_FORMAT(fecha, "%d-%m-%Y") as fecha,
    let sql = 'SELECT prestamos.*,  netbook.numero ' +
        'FROM prestamos INNER JOIN netbook ON netbook.id = prestamos.id_netbook WHERE devolvio = 0 LIMIT 10';
    const listaPrestamos = await pool.query(sql);
    
    console.log('listaPrestamos', listaPrestamos);
    res.render('prestamos/new-prestamo', {
        listaPrestamos
    });

    //    });
};

prestamoController.createNewPrestamo = async (req, res) => {
    //console.log('Datos recibidos: ', req.body);
    const { nombre, numero, observacion } = req.body;
    let errorMsg = [];
    const errorValidacion = validationResult(req);
    //  #########   OBTENER LA FECHA Y LA HORA
    let tiempo = new Date();
    //console.log(tiempo);
    if (!errorValidacion.isEmpty()) {
        errorMsg = errorValidacion.array();
    }
    //console.log('Errores: ', errorValidacion.isEmpty());
    if (errorValidacion.isEmpty()) { // si no hay errores
        //await req.getConnection((err, conn) => {
        const netbook = await pool.query('SELECT id, numero FROM netbook WHERE numero = ?', [numero]);
        if (Object.keys(netbook).length > 0) {
            //console.log('resultado sql: ', netbook[0].id);
            //---- CONTROLAR QUE LA NETBOOK ESTE EN CONDICIONES DE SER PRESTADA
            //let sql = 'SELECT * FROM prestamos WHERE id_netbook = ? AND devolvio = 1';
            let sql = 'SELECT * FROM prestamos WHERE prestamos.id_netbook = ? AND prestamos.devolvio = 0';
            /*let sql = 'SELECT prestamos.*, devoluciones.id, devoluciones.id_prestamo, devoluciones.fecha '+
            'FROM prestamos INNER JOIN devoluciones ON prestamos.id = devoluciones.id_prestamo '+
            'WHERE prestamos.id_netbook = ?'*/
            const prestamoExiste = await pool.query(sql, [netbook[0].id]);
            //console.log('OBJETO: ', Object.keys(prestamoExiste).length);
            if (Object.keys(prestamoExiste).length > 0) {
                //-- RENDERIZAR ERROR NETBOOK YA ESTA PRESTADA
                errorMsg.push({ msg: 'La Netbook seleccionada ya tiene un prestamo activo' });
                let sql = 'SELECT prestamos.*, DATE_FORMAT(fecha, "%d-%m-%Y") as fecha, netbook.numero ' +
                    'FROM prestamos INNER JOIN netbook ON netbook.id = prestamos.id_netbook WHERE devolvio = 0 LIMIT 10';
                const listaPrestamos = await pool.query(sql);
                //console.log('listaPrestamos', listaPrestamos);
                res.render('prestamos/new-prestamo', {
                    listaPrestamos,
                    errorMsg,
                    nombre,
                    numero,
                    observacion
                });
            } else {
                //sql = 'SELECT * FROM estados WHERE estados.id_netbook = ? AND estados.estado = `ACTIVA`';                                
                sql = 'SELECT estados_netbooks.id, estados.estado ' +
                    'FROM estados_netbooks ' +
                    ' INNER JOIN estados ' +
                    ' ON estados_netbooks.id_estado = estados.id ' +
                    'WHERE estados_netbooks.id_netbook = ? ORDER BY fecha DESC limit 1';
                const rowEstado = await pool.query(sql, [netbook[0].id]);
                console.log('rowEstado: ', rowEstado);
                if (rowEstado) {
                    console.log('rowEstado: ', rowEstado);
                    if (Object.keys(rowEstado).length > 0) {
                        if (rowEstado[0].estado === 'ACTIVA') {
                            const prestamo = {
                                nombre_usuario: nombre,
                                id_netbook: netbook[0].id,
                                fecha: tiempo,
                                observacion: observacion,
                                devolvio: '0'
                            };
                            guardarPrestamo(req, res, prestamo);
                        } else {
                            errorMsg.push({ msg: 'La Netbook seleccionada tiene estado INACTIVA' });
                            let sql = 'SELECT prestamos.*, DATE_FORMAT(fecha, "%d-%m-%Y") as fecha, netbook.numero ' +
                                'FROM prestamos INNER JOIN netbook ON netbook.id = prestamos.id_netbook WHERE devolvio = 0 LIMIT 10';
                            listaPrestamos = await pool.query(sql);
                            //console.log('listaPrestamos', listaPrestamos);
                            res.render('prestamos/new-prestamo', {
                                listaPrestamos,
                                errorMsg,
                                nombre,
                                numero,
                                observacion
                            });
                        }
                    } else {
                        const prestamo = {
                            nombre_usuario: nombre,
                            id_netbook: netbook[0].id,
                            fecha: tiempo,
                            observacion: observacion,
                            devolvio: '0'
                        };
                        guardarPrestamo(req, res, prestamo);
                    }
                }
            }
        } else {
            console.log('Numero de netbook no existe');
            errorMsg.push({ msg: 'Numero de netbook no existe' });
            let sql = 'SELECT prestamos.*, DATE_FORMAT(fecha, "%d-%m-%Y") as fecha, netbook.numero ' +
                'FROM prestamos INNER JOIN netbook ON netbook.id = prestamos.id_netbook WHERE devolvio = 0 LIMIT 10';
            const listaPrestamos = await pool.query(sql);
            //console.log('listaPrestamos', listaPrestamos);
            res.render('prestamos/new-prestamo', {
                listaPrestamos,
                errorMsg,
                nombre,
                numero,
                observacion
            });
        }
    }
    else {
        res.render('prestamos/new-prestamo', {
            errorMsg,
            nombre,
            numero,
            observacion
        });
    }
};

prestamoController.renderDevolucion = async (req, res) => {
    //console.log('ID del prestamo: ', req.params);
    let idPrestamo = req.params.id;

    let sql = 'SELECT * FROM prestamos WHERE id = ?';
    const rowPrestamo = await pool.query(sql, [idPrestamo]);
    //console.log('prestamos: ', rowPrestamo);
    let nombrePrestamo = rowPrestamo[0].nombre_usuario;
    let fechaPrestamo = rowPrestamo[0].fecha;
    let observacion = rowPrestamo[0].observacion;
    res.render('prestamos/devolucion', {
        idPrestamo,
        nombrePrestamo,
        fechaPrestamo,
        observacion
    });
};

prestamoController.saveDevolucion = async (req, res) => {
    //console.log('Datos recibidos: ', req.body);
    //console.log('ID prestamo: ', req.params.id);
    let idPrestamo = req.params.id;
    let fecha = new Date();

    const devolucion = {
        id_prestamo: idPrestamo,
        fecha: fecha
    };
    let sql = 'INSERT INTO devoluciones SET ?';
    const rowInsert = await pool.query(sql, [devolucion]);
    //-- ENVIAR MENSAJE DE QUE SE REGISTRO LA DEVOLUCION //
    sql = 'UPDATE prestamos SET devolvio = ? WHERE id = ?';
    await pool.query(sql, [1, idPrestamo]);
    //console.log('LA DEVOLUCION FUE REGISTRADA');
    res.redirect('/prestamos/add');

}

const guardarPrestamo = async (req, res, prestamo) => {

    console.log('prestamo: ', prestamo);
    await pool.query('INSERT INTO prestamos SET ?', [prestamo]);
    let success_msg = [];
    req.flash('success_msg', 'Prestamo registrado !');
    res.redirect('/prestamos/add');
}

module.exports = prestamoController;