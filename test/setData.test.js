const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const accountController = new (require('../controllers/accountController')).AccountController();
const budgetController = new (require('../controllers/budgetController')).BudgetController();
const categoryController = new (require('../controllers/categoryController')).CategoryController();
const transactionController = new (require('../controllers/transactionController')).TransactionController();
const userController = new (require('../controllers/userController')).UserController();

/*
* Verifica que los métodos setData() de cada modelo, 
* encargados de actualizar los datos cuando se hace un patch,
* funcionen de forma correcta
*/
describe('setData() form', () => {
    it('Account',()=>{
        let account = {
             name: 'Bancomer',
             amount: 4000
        };
        let newData = {
            name: 'Banorte',
            amount: 500
        };
        let accountData = accountController.setData(account, newData);
        assert.deepEqual(accountData.name, 'Banorte', 'Name has not been changed');
        assert.deepEqual(accountData.amount, 500, 'Amount has not been changed')
    });

    it('Budget',()=>{
        let budget = {
            name: 'Presupuesto',
            freq: 'Semanal',
            initDate: 'Thu Jan 26 2017 11:00:00 GMT+1100',
            desc: 'Para gastar en la semana',
            amount: 1000
        };
        let newData = {
            name: 'Cartera',
            freq: 'Diario',
            initDate: 'Thu Jan 29 2019 12:00:00 GMT+1100',
            desc: 'El pan y vino del día a día',
            amount: 100
        };
        let budgetData = budgetController.setData(budget, newData);
        assert.deepEqual(budgetData.name, 'Cartera', 'Name has not been changed');
        assert.deepEqual(budgetData.freq, 'Diario', 'Frequency has not been changed');
        assert.deepEqual(budgetData.initDate, 'Thu Jan 29 2019 12:00:00 GMT+1100', 'Inital date has not been changed');
        assert.deepEqual(budgetData.desc, 'El pan y vino del día a día', 'Description has not been changed');
        assert.deepEqual(budgetData.amount, 100, 'Amount has not been changed');
    });
    
    it('Category',()=>{
        let category = {
            name: 'Comida',
            desc: 'Salidas a restaurantes',
            max: 1000
        };
        let newData = {
            name: 'Snacks',
            desc: 'Para la botana',
            max: 100
        };
        let categoryData = categoryController.setData(category, newData);
        assert.deepEqual(categoryData.name, 'Snacks', 'Name has not been changed');
        assert.deepEqual(categoryData.desc, 'Para la botana', 'Description has not been changed');
        assert.deepEqual(categoryData.max, 100, 'Max has not been changed');
    });

    it('Transaction',()=>{
        let transaction = {
            amount: 25,
            desc: 'Coca y papitas',
            date: 'Thu Jan 26 2017 11:00:00 GMT+1100',
            cat: '5dd1b6086cf5e50cec91773b'
        };
        let newData = {
            amount: 15,
            desc: 'Papitas',
            date: 'Thu Jan 26 2017 16:23:48 GMT+1100',
            cat: '5dd1b6086cf5e50cec911998x'
        };
        let transactionData = transactionController.setData(transaction, newData);
        assert.deepEqual(transactionData.amount, 15, 'Amount has not been changed');
        assert.deepEqual(transactionData.desc, 'Papitas', 'Description has not been changed');
        assert.deepEqual(transactionData.date, 'Thu Jan 26 2017 16:23:48 GMT+1100', 'Date has not been changed');
        assert.deepEqual(transactionData.cat, '5dd1b6086cf5e50cec911998x', 'Category has not been changed');
    });

    it('User',()=>{
        let user = {
            firstName: 'Luis Angel',
            lastName: 'Ortega',
            email: 'angel@vuellet.io',
            password: '123456'
        };
        let newData = {
            firstName: 'Daniel',
            lastName: 'Aguilera',
            email: 'daniel@pizcador.com',
            password: 'abcdefg'
        };
        let userData = userController.setData(user, newData);
        assert.deepEqual(userData.firstName, 'Daniel', 'First name has not been changed');
        assert.deepEqual(userData.lastName, 'Aguilera', 'Last name has not been changed');
        assert.deepEqual(userData.email, 'daniel@pizcador.com', 'Email has not been changed');
        assert.deepEqual(userData.password, 'abcdefg', 'Password has not been changed');
    });

});
