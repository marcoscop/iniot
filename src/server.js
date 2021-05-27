const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

const myConnection = require('express-myconnection');
// Inicializacion
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(morgan('dev'));
/*app.use(myConnection(mysql,{
    host:'localhost',
    user:'marcos',
    password: 'marcos',
    port:3306,
    database:'iniot'
},'single'));*/
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({   //--> para guardar mensajes en el servidor -  flash se basa en este modulo
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(flash()); 
// Globals variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    next();
});
// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/carrito.routes'));
app.use(require('./routes/nets.routes'));
app.use(require('./routes/prestamo.routes'));
app.use(require('./routes/estado.routes'));
app.use(require('./routes/users.routes'));

//app.use(require('./routes/users.routes'));
// Static Files
app.use(express.static(path.join(__dirname, 'public'))); 
module.exports = app;