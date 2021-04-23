const { validationResult } = require("express-validator");

const netbooksController = {};

netbooksController.renderNetsForm = async (req, res) => {
    //res.send('Render Netbooks Form');
    //console.log('req.params: ', req.params.id);
    //console.log('Nombre carrito: ', req.params.nom);
    const nombreCarrito = req.params.nom;
    const idCarrito = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito=?', [idCarrito], (err, listaNetbooks) => {
            //console.log('LISTA NETBOOKS: ', listaNetbooks);
            console.log('nombre carrito: ', nombreCarrito);
            console.log('idCarrito: ', idCarrito);
            res.render('netbooks/new-nets', {
                listaNetbooks,
                nombreCarrito,
                idCarrito
            });
        })
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
    await req.getConnection((err, conn) => {
        const sql = 'SELECT id, numero FROM netbook WHERE numero = ?';
        conn.query(sql, [numero], (err, netbooks) => {
            if (Object.keys(netbooks).length != 0) {
                errorNetbook.push({ text: 'El numero de netbook que intenta usar no esta disponible' });
                conn.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito], (err, listaNetbooks) => {
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
                });
            } else {
                conn.query('SELECT id, serie FROM netbook WHERE serie = ?', [serie], (err, netbooks) => {
                    if (Object.keys(netbooks).length != 0) {
                        errorNetbook.push({ text: 'El numero de serie que intenta usar no esta disponible' });
                        conn.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito], (err, listaNetbooks) => {
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
                        });
                    } else {
                        //req.getConnection((err, conn) => {
                        console.log('CARRITO nombre: ', req.body.nombreCarrito);
                        console.log('CARRITO id: ', req.body.idCarrito);
                        const sql = 'INSERT INTO netbook SET numero =?, serie = ?, macaddress = ?, carrito = ?, detalle = ?, marca = ?, modelo = ?';
                        conn.query(sql, [numero, serie, macaddress, idCarrito, detalle, marca, modelo], (err, rows) => {
                            const success = [];
                            success.push({ text: 'Netbook Agregada al carrito' });
                            conn.query('SELECT id, numero, serie, macaddress, carrito FROM netbook WHERE carrito =?', [idCarrito], (err, listaNetbooks) => {
                                console.log('LISTA NETBOOKS: ', listaNetbooks);
                                res.render('netbooks/new-nets', {
                                    listaNetbooks,
                                    idCarrito,
                                    nombreCarrito,
                                    success
                                });
                            });
                        });
                    }
                });
            }
        });
    });
};

netbooksController.renderNets = async (req, res) => {
    //res.send('render all notes');
    //console.log(req.params);
    console.log('parametros: ', req.params);
    req.getConnection((err, conn) => {
        conn.query('SELECT netbook.*, carritos.nombre FROM `netbook` INNER JOIN carritos ON netbook.carrito = carritos.id WHERE netbook.id = ?', [req.params.id], (err, netbook) => {
            if (err) {
                console.log(err);
            } else {
                let sql = 'SELECT estados.id, estados.id_netbook, estados.detalle, DATE_FORMAT(estados.fecha, "%d-%M-%Y") AS fecha, ' +
                    ' estados.estado FROM estados INNER JOIN netbook ON netbook.id = estados.id_netbook ' +
                    ' WHERE estados.id_netbook = ?';
                conn.query(sql, [req.params.id], (err, listadoEstados) => {
                    if (Object.keys(netbook).length > 0) {
                        //console.log(netbook);
                        let idNetbook = netbook[0].id;
                        console.log('listado de estados :', listadoEstados);
                        res.render('netbooks/estados-nets', {
                            netbook,
                            idNetbook,
                            listadoEstados
                        });
                    }
                });
            }
        });
    });
};
netbooksController.renderEditForm = async (req, res) => {
    //res.send('edit notes');

};

netbooksController.updateNet = async (req, res) => {
    console.log(req.body);

};

netbooksController.deleteNet = (req, res) => {
    //res.send('deleting Note');

}

module.exports = netbooksController;