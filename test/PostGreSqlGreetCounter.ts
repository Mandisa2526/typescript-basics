import assert from 'assert';
import UserGreetCounter from '../Posgresqlusergreet';
import PostgreSQLUserGreetCounter from '../Posgresqlusergreet';
import { Context } from 'mocha';
import { db } from './Greeter';

// database tests
describe('PostgreSQLUserGreetCounter', () => {
  let UserGreetCounter: UserGreetCounter;

  beforeEach(async function (this: Context) {

    try {
      this.timeout(10000); // Set timeout to 5 seconds
      UserGreetCounter = new PostgreSQLUserGreetCounter();

      // clean the tables before each test run
      await db.none("TRUNCATE TABLE GreetingCount RESTART IDENTITY CASCADE;");
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  it('increments greeting count correctly', async function (this: Context) {
    this.timeout(10000);

    // Arrange
    const userId = 1;
    const userName = 'John';

    // Act
    await UserGreetCounter.incrementGreetingCount(userId, userName);

    // Assert
    const count = await UserGreetCounter.getGreetingCount(userId, userName);
    assert.equal(1, count);

  });

  it('returns correct greeting count', async function (this: Context) {
    this.timeout(10000);

    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    const count = await UserGreetCounter.getGreetingCount(2, 'Alice');

    assert.equal(2, count);
  
  });

});

