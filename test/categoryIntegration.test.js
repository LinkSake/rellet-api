const mongoose = require('mongoose');
const supertest = require('supertest');
const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

//Punto de entrada de la aplicación
const app = require("../app.js");

//Configuración de la base de datos
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});

// Promesas nativas de mongoose
mongoose.Promise = Promise;

// Conectar a la BD
mongoose.connect(process.env.MONGODB_URI_TEST, {usePushEach: true});
mongoose.connection.on("open", function () {
    console.log("-> MongoTest is online!");
});

let categoryID = "";

