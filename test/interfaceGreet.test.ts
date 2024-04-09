// Import your implementations:
import assert from 'assert';
import { GreetInManager, Greeter, greet } from '../greet';
import { GreetIn } from '../person';
import { language } from '../language';
import GreetInZulu from '../greetInZulu';
import GreetInEnglish from '../greetInEnglish';
import GreetInXhosa from '../greetInXhosa';
import MapUserGreetCounter from '../userCounter';
//import { Pool } from 'pg';
import UserGreetCounter, { PostgreSQLGreetable } from '../posgresqlusergreet';
import PostgreSQLUserGreetCounter from '../posgresqlusergreet';
import pgPromise from 'pg-promise';
import Greetable from '../person'
import { Pool } from 'pg';
import { Context } from 'mocha';


const pgp = pgPromise();

const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
const db = pgp(connectionString);


describe('Greeter', () => {
  it('should greet with the provided name in Xhosa', () => {
    const result = greet('John', language.xhosa);
    const expectedGreeting = 'Molo, John';
    assert.equal(expectedGreeting, result);
  });
  it('should greet with the provided name in English', () => {
    const result = greet('John', language.eng);
    const expectedGreeting = 'Hello, John';
    assert.equal(expectedGreeting, result);
  });
  it('should greet with the provided name in Zulu', () => {
    const result = greet('John', language.zulu);
    const expectedGreeting = 'Sawubona, John';
    assert.equal(expectedGreeting, result);
  });
  it('should greet with the provided name in three languages', () => {
    let greetMap = new Map<language, GreetIn>();
    greetMap.set(language.zulu, new GreetInZulu());
    greetMap.set(language.eng, new GreetInEnglish());
    greetMap.set(language.xhosa, new GreetInXhosa());

    let greeter = new GreetInManager(greetMap);

    assert.equal("Sawubona, Andre", greeter.greet("Andre", language.zulu));
    assert.equal("Hello, Andrew", greeter.greet("Andrew", language.eng));
    assert.equal("Molo, Andrew", greeter.greet("Andrew", language.xhosa));
  });




  it('should count greetings for a user greeted and 0 if the user has not been greeted', function () {

    let userCounter = new MapUserGreetCounter();

    userCounter.countGreet('Ayanda');
    userCounter.countGreet('Ayanda');
    userCounter.countGreet('Anele');
    userCounter.countGreet('Cebo');

    assert.equal(2, userCounter.userGreetCount('Ayanda'));
    assert.equal(1, userCounter.userGreetCount('Anele'));
    assert.equal(0, userCounter.userGreetCount('Zenande'));

  });

  it('should calculate the total count of greetings', function () {
    let userCounter = new MapUserGreetCounter();

    userCounter.countGreet('Alice');
    userCounter.countGreet('Bob');
    userCounter.countGreet('Alice');

    assert.equal(3, userCounter.greetCounter);

  });

});
//tests for greeter using greetable

describe('Greeter', () => {
  let greeter: Greeter;
  let greetable: Greetable;
  let userGreetCounter: UserGreetCounter;

  beforeEach(() => {
    // Create instances of mock objects for testing
    let greetable = new GreetInEnglish();
    let userGreetCounter = new MapUserGreetCounter();
    // Create an instance of Greeter with mock objects
    greeter = new Greeter(mockGreetable, mockUserGreetCounter);

  });

  it('should greet with the provided language and name', () => {
    const name = 'Alice';
    const gretlanguage = language.eng;
    const expectedGreeting = `Mocked greeting for ${name} in ${gretlanguage}`;

    // Calling the greet method of Greeter
    const actualGreeting = greeter.greet(name, gretlanguage);

    // Asserting that the actual greeting matches the expected greeting
    assert.equal(actualGreeting, expectedGreeting);
  });

  // Add more test cases as needed
});

describe('MapUserGreetCounter', () => {
  let userGreetCounter: MapUserGreetCounter;

  beforeEach(async function () {
    userGreetCounter = new MapUserGreetCounter();

  });

  it('should count the greet for a user', () => {
    const firstName = 'Abongile';
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);

    const greetCount = userGreetCounter.userGreetCount(firstName);
    assert.equal(3, greetCount)
  });

  it('should calculate the total greet count', () => {

    userGreetCounter.countGreet('Alice');
    userGreetCounter.countGreet('Bongane');
    userGreetCounter.countGreet('Cebelihle');

    const greetCounter = userGreetCounter.greetCounter;
    assert.equal(3, greetCounter)
  });

  it('should return 0 if user has not been greeted', () => {
    const greetCount = userGreetCounter.userGreetCount('Alwande');

    assert.equal(0, greetCount)
  });

  it('should increment greet count for a new user', () => {
    userGreetCounter.countGreet('Alice');
    userGreetCounter.countGreet('Bongani');
    userGreetCounter.countGreet('Cebelihle');
    userGreetCounter.countGreet('David');

    const greetCount = userGreetCounter.userGreetCount('David');
    assert.equal(1, greetCount)
  });

  it('should increment greet count for an existing user', () => {
    const firstName = 'Alice';

    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);

    const greetCount = userGreetCounter.userGreetCount(firstName);
    assert.equal(4, greetCount)
  });
});

// database tests
describe('PostgreSQLUserGreetCounter', () => {
  let UserGreetCounter: UserGreetCounter;

  beforeEach(async function (this: Context) {

    try {
      this.timeout(5000); // Set timeout to 5 seconds
      UserGreetCounter = new PostgreSQLUserGreetCounter();

      // clean the tables before each test run
      await db.none("TRUNCATE TABLE GreetingCount RESTART IDENTITY CASCADE;");
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  it('increments greeting count correctly', async function (this: Context) {
    

    // Arrange
    const userId = 1;
    const userName = 'John';

    // Act
    await UserGreetCounter.incrementGreetingCount(userId, userName);

    // Assert
    const count = await UserGreetCounter.getGreetingCount(userId, userName);
    assert.equal(1, count)

  })

  it('returns correct greeting count', async function (this: Context) {
    this.timeout(10000);

    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    const count = await UserGreetCounter.getGreetingCount(2, 'Alice');

    assert.equal(2, count);
  });

});

describe('PostgreSQLGreetable', () => {
  let pool: Pool;
  let greetable: PostgreSQLGreetable;

  before(() => {
    // Create a Pool instance for testing
    pool = new Pool({
      connectionString: 'postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje'
    });

    // Initialize the greetable instance
    greetable = new PostgreSQLGreetable(pool);
  });

  after(async () => {
    // Close the Pool after all tests are done
    await pool.end();
  });

  it('should add language greeting', async () => {

    const language = 'Spanish';
    const greeting = 'Hola, Mundo';

    await greetable.addLanguageGreeting(language, greeting);

    // Add assertions to ensure language greeting is added successfully (e.g., check database state)
    const retrievedGreeting = await greetable.getGreeting(language);
    // You might need to use a database library like pg-mem to mock the database interactions for testing
    assert.equal(greeting, retrievedGreeting)
  });
  it('should get greeting for a language', async () => {
    const greetLanguage = "English";
    const expectedGreeting = 'Hello, World';

    const actualGreeting = await greetable.getGreeting(greetLanguage);

    assert.equal(expectedGreeting, actualGreeting)
  });

});

