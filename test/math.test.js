const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;

const userController = new (require('../controllers/userController')).UserController();

describe('Math', () => {
    it('Gets the total of the amount of an array', () => {
        let amounts = [10,5,15]
        let totalResult = userController.getTotal(amounts);
        assert.deepEqual(totalResult, 30, 'Total is wrong');
    });
})
