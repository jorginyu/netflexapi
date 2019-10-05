const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const modelo = require('../models/index');

router.post('/registro', (req, res) => {
     console.log('registrando...');
     let body = req.body;
     console.log(body);
     const hash = bcrypt.hashSync(body.passwd, 10);
     body.passwd = hash;

     modelo.User.findOne({ where: { email: body.email } })
          .then(user => {
               if (!user) {
                    console.log('Usuario creado!');
                    return modelo.User.create(body);
               } else {
                    throw 'Usuario ya existe!';
               }
          })
          .then(user => {
               console.log('user data:', user.dataValues);
               //ok, login correcto, creamos un token aleatorio
               let token = '';
               const caractersPossibles =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
               const longitud = 15;
               for (var i = 0; i < longitud; i++) {
                    token += caractersPossibles.charAt(
                         Math.floor(Math.random() * caractersPossibles.length)
                    );
               }
               //devolvemos un nuevo objeto "token" al siguiente then, que incluye id y nombre de usuario
               return modelo.Token.create({
                    token,
                    user: user.dataValues.username
               });
          })      
          .then(token => res.json({ ok: true, data: token })) //enviamos respuesta con el token completo en json
          .catch(err => res.json({ ok: false, error: err }));

});

router.post('/login', (req, res) => {
     const { email, passwd } = req.body;
     console.log(passwd);
     if (passwd === '' || email === '') {
       res.send('<h1>Error... </h1>');
     }
   
     modelo.User.findOne({
       where: { email }
     })
       .then(user => {
         //comparamos el password recibido con el password del usuario guardado en bdd, ambos encriptados
         if (bcrypt.compareSync(passwd, user.passwd)) {
           //si ok, devolvemos usuario a siguiente "then"
           return user;
         } else {
           // si no coinciden pasamos msg error a "catch"
           throw 'password no coincide';
         }
       })
       .then(user => {
         //ok, login correcto, creamos un token aleatorio
         console.log(user);
         let token = '';
         const caractersPossibles =
           'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         const longitud = 15;
         for (var i = 0; i < longitud; i++) {
           token += caractersPossibles.charAt(
             Math.floor(Math.random() * caractersPossibles.length)
           );
         }
         //devolvemos un nuevo objeto "token" al siguiente then, que incluye id y nombre de usuario
         return modelo.Token.create({
          token,
          username: user.dataValues.username
         });
       })
       .then(token => console.log(token))
       .then(token => res.json({ ok: true, data: token })) //enviamos respuesta con el token completo en json
       .catch(error => res.json({ ok: false, error: error }));
});

module.exports = router;