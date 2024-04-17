"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const posgresqlusergreet_1 = __importDefault(require("../posgresqlusergreet"));
const Greeter_1 = require("./Greeter");
// database tests
describe('PostgreSQLUserGreetCounter', () => {
    let UserGreetCounter;
    beforeEach(async function () {
        try {
            this.timeout(5000); // Set timeout to 5 seconds
            UserGreetCounter = new posgresqlusergreet_1.default();
            // clean the tables before each test run
            await Greeter_1.db.none("TRUNCATE TABLE GreetingCount RESTART IDENTITY CASCADE;");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    it('increments greeting count correctly', async function () {
        // Arrange
        const userId = 1;
        const userName = 'John';
        // Act
        await UserGreetCounter.incrementGreetingCount(userId, userName);
        // Assert
        const count = await UserGreetCounter.getGreetingCount(userId, userName);
        assert_1.default.equal(1, count);
    });
    it('returns correct greeting count', async function () {
        this.timeout(10000);
        await UserGreetCounter.incrementGreetingCount(2, 'Alice');
        await UserGreetCounter.incrementGreetingCount(2, 'Alice');
        const count = await UserGreetCounter.getGreetingCount(2, 'Alice');
        assert_1.default.equal(2, count);
    });
});
