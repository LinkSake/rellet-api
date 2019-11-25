const User = require('../models/userModel');

exports.SessionController = class sessionClass {
    //Constructor
    constructor() {
        require('auto-bind')(this);
    }

    //Compara la contraseña y el correo dado, y si estás coinciden devuelve el id del usuario
    async loginUser(req, res){
        try {
          let user = await User.findOne({email: req.body.email, password: req.body.password});
          res.status(200).json(user._id);
        } catch (error) {
          res.status(400).json(error);
        }
    }

}