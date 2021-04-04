const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

// Inicializacion
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(morgan('dev'));
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
    next();
});
// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/carrito.routes'));
//app.use(require('./routes/users.routes'));
// Static Files
app.use(express.static(path.join(__dirname, 'public'))); 
module.exports = app;