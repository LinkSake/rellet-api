const mongoose = require('mongoose');
const supertest = require('supertest');
const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

//Punto de entrada de la aplicación
const app = require("../app.js");

// Promesas nativas de mongoose
mongoose.Promise = Promise;

// Conectar a la BD
mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true  });

let userID = "";

describe('/user', () =>{
     
    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
        userID = "";
    });

    describe('Given that I want to create a new user',()=>{
        it('Will return the created user',(done) => {
            supertest(app)
                .post('/user')
                .send('firstName=Luis Angel')
                .send('lastName=Ortega')
                .send('email=angel@rellet.io')
                .send('password=123456')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert(res.body.firstName,'Luis Angel');
                        assert(res.body.lastName,'Ortega');
                        assert(res.body.email,'angel@rellet.io');
                        assert(res.body.password,'123456');
                        userID = res.body._id;
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
    
    describe('Given that I want to know the information of a new user',()=>{
        it('Will have first and last name and an email',(done) => {
            supertest(app)
                .get('/user/'+userID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.user.firstName,'Luis Angel','First name is missing');
                        assert.deepEqual(res.body.user.lastName,'Ortega','Last name is missing');
                        assert.deepEqual(res.body.user.email,'angel@rellet.io','Email is missing');
                        assert.deepEqual(res.body.user.password,'123456','Password is missing');  
                        done();
                    }
                });
            });

        it('Will have empty budget, transactions, accounts and categories',(done) => {
            supertest(app)
                .get('/user/'+userID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.budget, [],'Budget is not empty');
                        assert.deepEqual(res.body.categories, [], 'Categories is not empty');
                        assert.deepEqual(res.body.accounts, [], 'Accounts is not empty');
                        assert.deepEqual(res.body.transactions, [], 'Transactions is not empty');  
                        done();
                    }
                });
            });
    });

    describe('Given that I want to edit an existing user',()=>{
        it('It will return the new values of the user',(done) => {
            supertest(app)
                .patch('/user/'+userID)
                .send('firstName=Noel Daniel')
                .send('lastName=Aguilera')
                .send('email=dany@pizcador.com')
                .send('password=abcdefg')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.firstName, 'Noel Daniel','First name is unedited');
                        assert.deepEqual(res.body.lastName, 'Aguilera', 'Lasr name is unedited');
                        assert.deepEqual(res.body.email, 'dany@pizcador.com', 'Email is unedited');
                        assert.deepEqual(res.body.password, 'abcdefg', 'Password is unedited');
                        done();
                    }
                });
            });
    });
    
    describe('Given that I want to delete an existing user',()=>{
        it('It will return the values of the, now deleted, user',(done) => {
            supertest(app)
                .delete('/user/'+userID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.firstName, 'Noel Daniel','First name is undelited');
                        assert.deepEqual(res.body.lastName, 'Aguilera', 'First name is undelited');
                        assert.deepEqual(res.body.email, 'dany@pizcador.com', 'First name is undelited');
                        assert.deepEqual(res.body.password, 'abcdefg', 'First name is undelited');
                        done();
                    }
                });
            });
    });
});