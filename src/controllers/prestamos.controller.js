
const prestamoController = {};

prestamoController.renderPrestamoForm = async(req, res) => {
    //res.send('Renderizando formulario para prestamos');
    res.render('prestamos/new-prestamo');

};

prestamoController.createNewPrestamo = (req, res) => {
    res.send('Guardando un nuevo prestamo');
};

prestamoController.renderPrestamos = (req, res) => {
    res.send('Renderizar todos los prestamos');
};

prestamoController.renderEditPrestamoForm = (req, res) => {
    res.send('Renderizar formulario editar prestamos');
};

prestamoController.updatePrestamo = (req, res) => {
    res.send('Actualizar prestamo');
};

prestamoController.deletePrestamo = (req, res) => {
    res.send('Eliminando prestamos');
};

module.exports = prestamoController;