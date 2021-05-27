const { validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');

const pool = require("../database");

const usersController = {};

// funcion que renderiza el formulario de registro
usersController.renderSignUpForm = (req, res) => {
    res.render('users/signup');

};
// funcion que realiza el registro en la base dedatos
usersController.signup = async (req, res) => {
    let errorMsg = [];
    const { name, password, confirm_password } = req.body;
    const errorValidacion = validationResult(req);
    if (!errorValidacion.isEmpty()) {
        errorMsg = errorValidacion.array();
    }
    console.log('errorMsg: ', errorMsg);
    if (password != confirm_password) {
        errorMsg.push({ msg: 'Password y Confirmar Password no coinciden' });
    }
    let sql = 'SELECT * FROM users WHERE nombre = ?';
    const user = await pool.query(sql, [name]);
    if (Object.keys(user).length > 0) {
        errorMsg.push({ msg: 'Ya existe un usuario con el nombre que intenta usar' });
    }
    if (errorMsg.length > 0) {
        res.render('users/signup', {
            errorMsg,
            name,
            password,
            confirm_password
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const encriptPass = await bcrypt.hash(password, salt);
        console.log('Encript Pass: ', encriptPass);
        const newUser = {
            nombre: name,
            password: encriptPass
        };
        try {
            sql = 'INSERT INTO users SET ?';
            console.log('Nueva cuenta: ', newUser);
            pool.query(sql, [newUser]);
        } catch (error) {
            console.log('|--> DB-Error: ', error);
        } finally {
            res.redirect('/');
        }
        //res.send('sigup');
    }
};
// funcion que realiza el renderizado del login
usersController.renderSigninForm = (req, res) => {
    res.render('users/signin');
};
// funcion que realiza el sigin del usuario
usersController.signin = async (req, res) => {
    //console.log('Body: ', req.body);
    const errorMsg = [];
    const { name, password } = req.body;
    //const salt = await bcrypt.genSalt(10);
    //const encriptPass = await bcrypt.hash(password, salt);
    try {
        sql = 'SELECT * FROM users WHERE nombre = ?';
        const user = await pool.query(sql, [name]);
        if (Object.keys(user).length === 0) {
            errorMsg.push({msg:'Usuario o Password incorrecto'});
            res.render('users/signin',{
                errorMsg
            });
        }else{
            const compararPassword = await matchPassword(password, user[0].password);
            
            console.log('Datos: ', user[0].password);
            //console.log('pass: ', encriptPass);
            console.log('compararPassword: ', compararPassword);
            if (compararPassword){                
                console.log('HAS SIDO LOGUEADO');
            }else{
                errorMsg.push({msg:'Usuario o Password incorrecto'});
                res.render('users/signin',{
                    errorMsg
                });
            }
        }        
    } catch (error) {
        console.log('|-->DB-Error: ', error);
    }
};
usersController.logout = (req, res) => {
    res.send('logout');
};

const matchPassword = async (passwordUser, passwordDb) => {
    return await bcrypt.compare(passwordUser, passwordDb);
}

module.exports = usersController;