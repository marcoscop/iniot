const estadoController = {}


estadoController.renderEstado = async (req, res) => {
    //res.send('Estamos');
    const idNetbook = req.params.id;
    console.log("Id de la netbook: ", idNetbook);
    console.log(req.body);
    await req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('SELECT estados.id, estados.detalle, estados.estado, DATE_FORMAT(estados.fecha, "%d-%m-%Y %a:%H-%i") AS fecha, ' +
                'netbook.id AS idNet, netbook.numero, netbook.serie ' +
                ' FROM `estados` INNER JOIN netbook ON estados.id_netbook = netbook.id ' +
                ' WHERE netbook.id = 2 ORDER BY fecha ASC', [idNetbook], (err, listaEstados) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('Lista de estados: ', listaEstados);
                    let serie = listaEstados[0].serie;
                    let numero = listaEstados[0].numero;
                    let id = listaEstados[0].idNet;
                    res.render('estados/all-estados', {
                        listaEstados,
                        numero,
                        serie,
                        id
                    });
                }
            });
        }
    });
};

estadoController.renderNewEstado = async(req, res) => {
    let d = new Date();
    console.log('params: ', req.params);
    console.log('body: ', req.body);
    const idNetbook = req.params.id;
    console.log('Hora: ',d.getHours());
    const {detalle, fecha, estado} = req.body;
    const estadoNetbook = {
        id_netbook:idNetbook,
        detalle:detalle,
        fecha:fecha,
        estado:estado
    };
    console.log('estado: ', estadoNetbook);
    await req.getConnection((err, conn) => {
        let sql = 'INSERT INTO estados SET ?';
        conn.query(sql, [estadoNetbook], (err, rows) => {
            if(err){
                console.log(err);
            }else{
                let success = [];
                success.push({text:'Se ha agregado un nuevo estado'});
                res.redirect('/netbooks/'+idNetbook+'/15');
            }
        });
    });        
    //res.send(req.body);
};


module.exports = estadoController;