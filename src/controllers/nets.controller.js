const { validationResult } = require("express-validator");

const pool = require('../database');

const netbooksController = {};

netbooksController.renderNetsForm = async (req, res) => {
    //res.send('Render Netbooks Form');
    console.log('req.params: ', req.params.id);
    console.log('Nombre carrito: ', req.params.nom);
    const nombreCarrito = req.params.nom;
    const idCarrito = req.params.id;
    const listaNetbooks = await pool.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito=?', [idCarrito]);
    console.log('nombre carrito: ', nombreCarrito);
    console.log('idCarrito: ', idCarrito);
    res.render('netbooks/new-nets', {
        listaNetbooks,
        nombreCarrito,
        idCarrito
    });
};

netbooksController.createNewNet = async (req, res) => {
    //--> Validar los datos del formulario
    const errorValidation = validationResult(req);
    //console.log('carrito: ', req.body);
    //const nomCarrito = req.body.nomCarrito;
    const { idCarrito, numero, serie, macaddress, marca, modelo, detalle, nombreCarrito } = req.body;
    let errorMsg = [];
    let errorNetbook = [];

    if (!errorValidation.isEmpty()) {
        //return res.status(422).jsonp(errorValidation.array());
        //console.log(errorValidation);
        errorMsg = errorValidation.array();
    }
    //--> controlar si ya existe el numero de serie.

    const sql = 'SELECT id, numero FROM netbook WHERE numero = ?';
    const netbooks = await pool.query(sql, [numero]);
    if (Object.keys(netbooks).length != 0) {
        errorNetbook.push({ text: 'El numero de netbook que intenta usar no esta disponible' });
        const listaNetbooks = await pool.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito]);
        //console.log('*numero ya existente');
        //console.log('->netbook encontrada: ', netbooks);
        //console.log('\ncadena de errores: ', errorNetbook);
        console.log('nombre carrito: ', nombreCarrito);
        res.render('netbooks/new-nets', {
            errorNetbook,
            numero,
            serie,
            macaddress,
            marca,
            modelo,
            detalle,
            idCarrito,
            listaNetbooks,
            nombreCarrito
        });

    } else {
        const netbooks = await pool.query('SELECT id, serie FROM netbook WHERE serie = ?', [serie]);
        if (Object.keys(netbooks).length != 0) {
            errorNetbook.push({ text: 'El numero de serie que intenta usar no esta disponible' });
            const listaNetbooks = await pool.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito]);
            //console.log('*serie ya existente');
            //console.log('->netbook encontrada: ', netbooks);
            //console.log('\ncadena de errores: ', errorNetbook);
            console.log('nombre carrito: ', nombreCarrito);
            res.render('netbooks/new-nets', {
                errorNetbook,
                numero,
                serie,
                macaddress,
                marca,
                modelo,
                detalle,
                idCarrito,
                listaNetbooks,
                nombreCarrito
            });

        } else {
            //req.getConnection((err, conn) => {
            console.log('CARRITO nombre: ', req.body.nombreCarrito);
            console.log('CARRITO id: ', req.body.idCarrito);
            const sql = 'INSERT INTO netbook SET numero =?, serie = ?, macaddress = ?, carrito = ?, detalle = ?, marca = ?, modelo = ?';
            pool.query(sql, [numero, serie, macaddress, idCarrito, detalle, marca, modelo]);
            const success = [];
            success.push({ text: 'Netbook Agregada al carrito' });
            const listaNetbooks = await pool.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito]);
            console.log('LISTA NETBOOKS: ', listaNetbooks);
            res.render('netbooks/new-nets', {
                listaNetbooks,
                idCarrito,
                nombreCarrito,
                success
            });
        }
    }
};

netbooksController.renderNets = async (req, res) => {
    //res.send('render all notes');
    console.log('RENDER-NETS',req.params);
    const idNet = req.params.id;
    let sql = 'SELECT netbook.id, netbook.numero,  DATE_FORMAT(fecha, "%d-%m-%Y - %H:%i") as fecha, carritos.nombre, estados_netbooks.observaciones, estados.nombre_estado, estados.estado, ' +
        ' netbook.macaddress, netbook.marca, netbook.modelo, netbook.serie FROM netbook ' +
        ' INNER JOIN carritos ' +
        ' ON netbook.carrito = carritos.id ' +
        'INNER JOIN estados_netbooks ' +
        'ON netbook.id = estados_netbooks.id_netbook ' +
        'INNER JOIN estados ' +
        'ON estados.id = estados_netbooks.id_estado ' +
        'WHERE netbook.id = ?';

    console.log('parametros: ', req.params);
    const netbook = await pool.query(sql, [idNet]);
    console.log('datos de la netbook:', netbook);
    //console.log('REGISTROS: ', Object.keys(netbook).length);
    if (Object.keys(netbook).length > 0) {
        console.log('resultado sql: ', netbook);
        let datosNetbook = {
            idNetbook: netbook[0].id,
            numero: netbook[0].numero,
            nombreCarrito: netbook[0].nombre,
            marca: netbook[0].marca,
            modelo: netbook[0].modelo,
            macaddress: netbook[0].macaddress,
            serie: netbook[0].serie
        };
        sql = 'SELECT estados.estado AS estado, estados_netbooks.observaciones AS detalle FROM estados_netbooks INNER JOIN estados ON estados_netbooks.id_estado = estados.id WHERE estados_netbooks.id = (SELECT MAX(estados_netbooks.id) FROM estados_netbooks WHERE estados_netbooks.id_netbook = ?)';
        const ultimoEstado = await pool.query(sql, [netbook[0].id]);
        console.log('datos ultimo Estado: ', ultimoEstado);
        let ultimoEstadoNetbook = {
            estado: ultimoEstado[0].estado,
            detalle: ultimoEstado[0].detalle
        };
        console.log('datos estado: ', ultimoEstadoNetbook);
        res.render('netbooks/estados-nets', {
            netbook,
            datosNetbook,
            ultimoEstadoNetbook
            //listadoEstados
        });
    } else {
        const errorMsg = [];
        const idCarrito = req.params.carrito;
        console.log('idcarrito: ', idCarrito);
        sql = 'SELECT carritos.nombre, netbook.numero, netbook.id, netbook.serie, netbook.marca, netbook.modelo, netbook.macaddress ' +
            'FROM carritos INNER JOIN netbook ON carritos.id = netbook.carrito WHERE carritos.id = ? AND netbook.id =?';
        const netbook = await pool.query(sql, [idCarrito, idNet]);
        const datosNetbook = {
            idNetbook: netbook[0].id,
            numero: netbook[0].numero,
            nombreCarrito: netbook[0].nombre,
            marca: netbook[0].marca,
            modelo: netbook[0].modelo,
            macaddress: netbook[0].macaddress,
            serie: netbook[0].serie
        };
        errorMsg.push({ msg: 'No existen estados en el historial' });
        res.render('netbooks/estados-nets', {
            errorMsg,
            datosNetbook
        });
    }
};
netbooksController.renderEditForm = async (req, res) => {
    console.log('Parametros: ', req.params);
    res.render('netbooks/edit-nets');
};

netbooksController.updateNet = async (req, res) => {
    console.log(req.body);

};

netbooksController.deleteNet = (req, res) => {
    //res.send('deleting Note');

}

module.exports = netbooksController;