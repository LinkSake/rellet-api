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

describe('/categories', () => {
   
    //Después de realizar las pruebas borrará la BBDD
    after(function() {
        mongoose.connection.db.dropDatabase();
        categoryID = "";
    });
    
    describe('Given that I want to create a new category',()=>{
        it('Will return the created category',(done) => {
            supertest(app)
                .post('/categories')
                .send('name=Snacks')
                .send('desc=Antojitos a lo largo del día')
                .send('max=200')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'Snacks','Name is missing');
                        assert.deepEqual(res.body.desc,'Antojitos a lo largo del día', 'Description is missing');
                        assert.deepEqual(res.body.max,200, 'Max is missing');
                        assert.deepEqual(res.body.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is missing');
                        categoryID = res.body._id;
                        done();
                    }
                });
            });
        it('Will return an error if the max is missing',(done) => {
            supertest(app)
                .post('/categories')
                .send('name=Snacks')
                .send('desc=Antojitos a lo largo del día')
                .send('user_id=5dd1ec7b9bbc170f53b20471')
                .expect(400)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'ValidationError','Max is sent');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to know the information of a new category',()=>{
        it('Will have name, max and description',(done) => {
            supertest(app)
                .get('/categories/'+categoryID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'Snacks', 'Name is missing');
                        assert.deepEqual(res.body.max, 200,'Max is missing');
                        assert.deepEqual(res.body.desc,'Antojitos a lo largo del día','Description is missing');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to edit an existing category',()=>{
        it('It will return the new values of the category',(done) => {
            supertest(app)
                .patch('/categories/'+categoryID)
                .send('name=CDs')
                .send('max=400')
                .send('desc=Ya no serán los 2000 pero aún me gustan los discos')
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name, 'CDs','Name is unedited');
                        assert.deepEqual(res.body.max, 400, 'Max is unedited');
                        assert.deepEqual(res.body.desc, 'Ya no serán los 2000 pero aún me gustan los discos', 'Description is unedited');
                        done();
                    }
                });
            });
    });

    describe('Given that I want to delete an existing category',()=>{
        it('It will return the values of the, now deleted, category',(done) => {
            supertest(app)
                .delete('/categories/'+categoryID)
                .expect(200)
                .end((err, res)=>{
                    if (err) {
                        done(err);
                    } else {
                        assert.deepEqual(res.body.name,'CDs','Name is undeleted');
                        assert.deepEqual(res.body.desc,'Ya no serán los 2000 pero aún me gustan los discos', 'Description is undeleted');
                        assert.deepEqual(res.body.max, 400, 'Max is undeleted');
                        assert.deepEqual(res.body.user_id,'5dd1ec7b9bbc170f53b20471', 'UserID is undeleted');
                        done();
                    }
                });
            });
    });

});
