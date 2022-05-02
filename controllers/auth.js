const { response }  = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
   
    const { email, name, password } = req.body;    
    try{
          
        // Verificar que no exite el email
        const usuario = await Usuario.findOne({ email: email });

        if ( usuario ) {
            console.log(email);
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body);         

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, name);

        // Crear usuario de DB
        await dbUser.save();
        

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token,
            msg: 'Usuario creado exitosamente',
            
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    } 

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = async(req, res = response) => {
       
    const { email, password } = req.body;    
    
    try{

        const dbUser = await Usuario.findOne({ email});

        if(!dbUser){
            return res.status(400).json({ 
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        //Confirmar si el passwoard hace matching
        const validPasswoard = bcrypt.compareSync(password, dbUser.password);        
        if(!validPasswoard){
            return res.status(400).json({ 
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        //Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token,
            msg: 'Todo correcto'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const revalidarToken = async(req, res = response) => {
    const { uid, name } = req;    
    const token = await generarJWT(uid, name); //generando jwt nuevamente
    return res.json({
        ok: true,
        uid, 
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}