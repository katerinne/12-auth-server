const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({
    name: {
        tyoe: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model('Usuario', UsuarioSchema)