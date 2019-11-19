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

let accountID = "";

describe('/accounts', () => {
    
    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
        accountID = "";
    });

    describe('Given that I want to create a new account',()=>{
        it('Will return the created account',(done) => {
            supertest(app)
                .post('/accounts')
                .send('name=Klar')
                .send('amount=4000')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'Klar','Name is missing');
                        assert.deepEqual(res.body.amount, 4000, 'Amount is missing');
                        assert.deepEqual(res.body.trans, [], 'There are transactions');
                        assert.deepEqual(res.body.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is missing');
                        accountID = res.body._id;
                        done();
                    }
                });
            });
        it('Will return an error if the amount is missing',(done) => {
            supertest(app)
                .post('/accounts')
                .send('name=Klar')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(400)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'ValidationError','Account is sent');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to list all the accounts of a user', () => {
        it('Will return an array of 1 account', (done) => {
            supertest(app)
            .get('/accounts/list/5dd1ec7b9bbc170f53b20471')
            .expect(200)
            .end((err, res)=>{
                if (err) {
                    done(err);
                } else {
                    assert.isArray(res.body,'An array is not returned');
                    assert.deepEqual(res.body.length, 1, 'There is more than one transaction');
                    done();
                }
            });
        });
    });

    describe('Given that I want to know the information of a new account',()=>{
        it('Will have name, amount and empty transactions',(done) => {
            supertest(app)
                .get('/accounts/'+accountID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'Klar','Name is not sended');
                        assert.deepEqual(res.body.amount, 4000, 'Amount is not sended');
                        assert.deepEqual(res.body.trans, [], 'There are transactions');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to edit an existing account',()=>{
        it('It will return the new values of the account',(done) => {
            supertest(app)
                .patch('/accounts/'+accountID) 
                .send('name=Bancomer')
                .send('amount=6000')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name, 'Bancomer','Name is unedited');
                        assert.deepEqual(res.body.amount, 6000, 'Amount is unedited');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to delete an existing account',()=>{
        it('It will return the values of the, now deleted, account',(done) => {
            supertest(app)
                .delete('/accounts/'+accountID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'Bancomer','Name is undeleted');
                        assert.deepEqual(res.body.amount, 6000, 'Amount is undeleted');
                        assert.deepEqual(res.body.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is undeleted');
                        done();
                    }
                });
            });
    });
})
