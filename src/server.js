const express = require('express');
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const exphbs = require('express-handlebars')
const chalk = require('chalk');
const config = require('./config');
const pool = require('./database');
const passport = require('passport');

const { PORT, SECRET } = config;

// Inicializar el servidor
const app = express();
require('./lib/passport');

// Setup del servidor
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


// middlewares
app.use(logger('tiny'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool
    })
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
})

// Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/pqrs', require('./routes/pqrs'));

// Ejecutar servidor
app.listen(PORT, () => {
    console.log(chalk.green(`El servidor ha sido inicializado en el puerto ${PORT}`));
});
