const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const transactionController = new (require('../controllers/transactionController')).TransactionController();
const userController = new (require('../controllers/userController')).UserController();


describe('Checkers', () => {
    //Revisa que la cantidad (amount) ingresada sea posible de acuerdo al paramtero (amount/max) dado
    it('Checks if it can substract an amount from another', () => {
        positiveTest = transactionController.isInLimits(163, 200);
        negativeTest = transactionController.isInLimits(320, 42);
        zeroTest = transactionController.isInLimits(0, 0);
        assert.isTrue(positiveTest, 'It does not let substract an smaller amount form the max');
        assert.isFalse(negativeTest, 'It let substract an smaller amount form the max');
        assert.isFalse(zeroTest, 'Zero can not be substracted from zero')
    });

    it('Checks if the total of the categories is on budget', () => {
        onBudget = userController.isInBudget(1000, 200);
        outOfBudget = userController.isInBudget(200, 1000);
        zeroBudget = userController.isInBudget(0,0);
        assert.deepEqual(onBudget.status, '¡En hora buena, estás dentro del presupuesto!', 'It goes out of budget');
        assert.deepEqual(outOfBudget.status, 'Chanfle, te pasaste de tu presupesto', 'It is on budget');
        assert.deepEqual(zeroBudget.status, '¡En hora buena, estás dentro del presupuesto!', 'Zero is on budget');
    });

});