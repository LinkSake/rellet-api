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

budgetID = "";

describe('/budget', () =>{
     
    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
        budgetID = "";
    });

    describe('Given that I want to create a new budget',()=>{
        it('Will return the created budget',(done) => {
            supertest(app)
                .post('/budget')
                .send('name=Presupuesto')
                .send('freq=Semanal')
                .send('initDate=Thu Jan 26 2017 11:00:00 GMT+1100')
                .send('desc=Presupueto semanal del año 2019')
                .send('amount=1000')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {                     
                        assert.deepEqual(res.body.name, 'Presupuesto', 'Name was not defined');
                        assert.deepEqual(res.body.freq, 'Semanal', 'Frequency was not defined');
                        assert.deepEqual(res.body.initDate, '2017-01-26T11:00:00.000Z', 'Inital date was not defined');
                        assert.deepEqual(res.body.desc, 'Presupueto semanal del año 2019', 'Description was not defined');
                        assert.deepEqual(res.body.amount, 1000, 'Amount is not defined');
                        assert.deepEqual(res.body.user_id, '5dd1ec7b9bbc170f53b20471', 'User ID is not defined');
                        budgetID = res.body._id;
                        done();
                    }
                });
            });

        it('Will fail if the date is missing',(done) => {
            supertest(app)
                .post('/budget')
                .send('name=Presupuesto')
                .send('freq=Semanal')
                .send('desc=Presupueto semanal del año 2019')
                .send('amount=1000')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(400)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {                     
                        assert.deepEqual(res.body.name, 'ValidationError', 'Date was sended');
                        done();
                    }
                });
            });
    });
    
    //FIXME: This test only works 1 of 2 times, even tough everything seems alright
    // describe('Given that I want to know the information of a new budget',()=>{
    //     it('Will have name, frequency and an intial date',(done) => {
    //         supertest(app)
    //             .get('/budget/'+budgetID)
    //             .expect(200)
    //             .end((err, res)=>{
    //                 if (err) {
    //                     done(err);
    //                 } else {           
    //                     assert.deepEqual(res.body.name, 'Presupuesto', 'Name was not defined');
    //                     assert.deepEqual(res.body.freq, 'Semanal', 'Frequency was not defined');
    //                     assert.deepEqual(res.body.initDate, '2017-01-26T11:00:00.000Z', 'Inital date was not defined');
    //                     done();
    //                 }
    //             });
    //         });
    // });

    describe('Given that I want to edit a new budget',()=>{
        it('Will return the new budget',(done) => {
            supertest(app)
                .patch('/budget/'+budgetID)
                .send('name=Dinero de la semana')
                .send('desc=Descripción generica')
                .send('amount=500')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {                     
                        assert.deepEqual(res.body.name, 'Dinero de la semana', 'Name was not edited');
                        assert.deepEqual(res.body.freq, 'Semanal', 'Frequency was edited');
                        assert.deepEqual(res.body.initDate, '2017-01-26T11:00:00.000Z', 'Inital date was edited');
                        assert.deepEqual(res.body.desc, 'Descripción generica', 'Description was not edited');
                        assert.deepEqual(res.body.amount, 500, 'Amount was not edited');
                        assert.deepEqual(res.body.user_id, '5dd1ec7b9bbc170f53b20471', 'User ID was edited');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to delete an existing budget',()=>{
        it('It will return the values of the, now deleted, budget',(done) => {
            supertest(app)
                .delete('/budget/'+budgetID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name, 'Dinero de la semana', 'Name was not deleted');
                        assert.deepEqual(res.body.freq, 'Semanal', 'Frequency was not deleted');
                        assert.deepEqual(res.body.initDate, '2017-01-26T11:00:00.000Z', 'Inital date was not deleted');
                        assert.deepEqual(res.body.desc, 'Descripción generica', 'Description was not deleted');
                        assert.deepEqual(res.body.amount, 500, 'Amount was not deleted');
                        done();
                    }
                });
            });
    });

});