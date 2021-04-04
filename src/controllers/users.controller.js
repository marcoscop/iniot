const { text } = require("express");
const User = require('../models/User');
const usersController = {};

// funcion que renderiza el formulario de registro
usersController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};
// funcion que realiza el registro en la base dedatos
usersController.signup = async(req, res) => {
    const errors =[];
    console.log(req.body);
    const {name, email, password, confirm_password} = req.body;
    if(password == '' || name == '' || email ==''){
        console.log("valiable vacia");
        errors.push({text:'Todos los campos deben estar completos'});
    }
    if(password != confirm_password){
        errors.push({text:'La contraseña y la confirmacion de la contraseña no coinciden'});
    }
    if(password.length < 6){
        errors.push({text:'La contraseña debe contener 6 caracteres'});
    }
    console.log('contenido: ',errors,'longitud: ', errors.length);
    if(errors.length > 0){
        res.render('users/signup',{
            errors, 
            name,
            email
        });
    }else{
        //res.send('Successfully');
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El correo ya esta en uso');
            res.redirect('/users/singup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','El usuario ha sido creado satisfactoriamente');
            res.redirect('/users/signin');
        }
    }
    //res.send('sigup');
};
// funcion que realiza el renderizado del login
usersController.renderSigninForm = (req, res) => {
    res.render('users/signin');
};
// funcion que realiza el sigin del usuario
usersController.signin = (req, res) => {
    res.send('signin');
};
usersController.logout = (req, res) => {
    res.send('logout');
};

module.exports = usersController;