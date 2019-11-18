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

describe('/user', () =>{
     
    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
    });

    describe('Given that I create a new user',()=>{
        it('Will return the created user',(done) => {
            supertest(app)
                .post('/user')
                .send('firstName="Luis Angel"')
                .send('lastName="Ortega"')
                .send('email="angel@vuellet.io"')
                .send('password="123456"')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert(res.body.firstName,'Luis Angel');
                        assert(res.body.lastName,'Ortega');
                        assert(res.body.email,'angel@vuelllet.io');
                        assert(res.body.password,'123456');
                        done();
                    }
                });
            });
        it('Will return an error if the email is missing',(done) => {
            supertest(app)
                .post('/user')
                .send('firstName="Luis Angel"')
                .send('lastName="Ortega"')
                .send('password="123456"')
                .expect(400)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert(res.body.name,'ValidationError');
                        done();
                    }
                });
            });
    });

    
});