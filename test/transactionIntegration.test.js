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
mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

let accountID = "";
let categoryID = "";
let transactionID = "";

describe('/transaction', () => {

    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
        transactionID = "";
        accountID = "";
        categoryID = "";
    });

    describe('Given that I want to create a new transaction',()=>{
        it('Will return the created transaction and the corresponding account',(done) => {
            //Crear una cuenta para que la transacción tenga de donde restar la cantidad indicada
            supertest(app)
            .post('/accounts')
            .send('name=Klar')
            .send('amount=4000')
            .send('user_id=5dd1ec7b9bbc170f53b20471')
            .expect(200)
            .end((err, res)=> {
                if (err) {
                    done(err)   
                } else {
                    accountID = res.body._id
                    //Crear una categoria para que la transacción pueda hacer calculos de maximos con ella
                    supertest(app)
                    .post('/categories')
                    .send('name=Snacks')
                    .send('desc=Antojitos a lo largo del día')
                    .send('max=200')
                    .send('user_id=5dd1ec7b9bbc170f53b20471')
                    .expect(200)
                    .end((err, res)=> {
                        if (err) {
                            done(err)
                        } else {
                            categoryID = res.body._id
                            supertest(app)
                            .post('/transaction')
                            .send('amount=15')
                            .send('desc=Papitas')
                            .send('date=1 Jan 2011, 00:00:00')
                            .send('cat='+categoryID)
                            .send('account='+accountID)
                            .send('user_id=5dd1ec7b9bbc170f53b20471')
                            .expect(200)
                            .end((err, res)=>{
                                if (err) {
                                    done(err);
                                } else {
                                    assert.deepEqual(res.body.transaction.amount, 15,'Amount is missing');
                                    assert.deepEqual(res.body.transaction.desc, 'Papitas', 'Description is missing');
                                    assert.deepEqual(res.body.transaction.date,'2011-01-01T07:00:00.000Z', 'Date is missing');
                                    assert.deepEqual(res.body.transaction.cat, categoryID, 'CategoryID is missing');
                                    assert.deepEqual(res.body.transaction.account, accountID, 'AccountID is missing');
                                    assert.deepEqual(res.body.transaction.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is missing');
                                    transactionID = res.body.transaction._id;
                                    done();
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    describe('Given that I want to list all the trasactions of a user', () => {
        it('Will return an array of 1 transaction', (done) => {
            supertest(app)
            .get('/transaction/list/5dd1ec7b9bbc170f53b20471')
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
    
    describe('Given that I want to know the information of a new transaction',()=>{
        it('Will have ...',(done) => {
            supertest(app)
                .get('/transaction/'+transactionID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.amount, 15, 'Amount is not sended');
                        assert.deepEqual(res.body.desc, 'Papitas', 'Description is not sended');
                        assert.deepEqual(res.body.account, accountID, 'Account is not sended');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to delete an existing transaction',()=>{
        it('It will return the values of the, now deleted, transaction',(done) => {
            supertest(app)
                .delete('/transaction/'+transactionID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.transactionFlag.amount, 15,'Amount is undeleted');
                        assert.deepEqual(res.body.transactionFlag.desc, 'Papitas', 'Description is undeleted');
                        assert.deepEqual(res.body.transactionFlag.date,'2011-01-01T07:00:00.000Z', 'Date is undeleted');
                        assert.deepEqual(res.body.transactionFlag.cat, categoryID, 'CategoryID is undeleted');
                        assert.deepEqual(res.body.transactionFlag.account, accountID, 'AccountID is undeleted');
                        assert.deepEqual(res.body.transactionFlag.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is undeleted');
                        done();
                    }
                });
            });
    });

});
