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
import userCounter from '../userCounter';


const pgp = pgPromise();

const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
const db = pgp(connectionString);

//const greetLanguages = new Map<language, GreetIn>();

// const englishGreet = new GreetInEnglish();
// const xhosaGreet = new GreetInXhosa();
// const zuluGreet = new GreetInZulu();

const greetMap = new Map<language, GreetIn>();

greetMap.set(language.zulu, new GreetInZulu());
greetMap.set(language.eng, new GreetInEnglish());
greetMap.set(language.xhosa, new GreetInXhosa());

const greetMapAdapter = new GreetInManager(greetMap);

const mapUserGreetCounter = new MapUserGreetCounter();
const greeter = new Greeter(greetMapAdapter, mapUserGreetCounter);

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
//Test your new version of Greeter that is using Greetable
  it('should greet the user correctly in English', () => {
    const name = 'John';
    const chosenLanguage = language.eng;
    const expectedGreeting = `Hello, John`;

    const greeting = greeter.greet(name, chosenLanguage);

    assert.equal(expectedGreeting,greeting)
});

it('should greet the user correctly in Xhosa', () => {
  const name = 'Ayanda';
  const chosenLanguage = language.xhosa;
  const expectedGreeting = `Molo, Ayanda`;

  const greeting = greeter.greet(name, chosenLanguage);

  assert.equal(expectedGreeting,greeting)
});

it('should greet the user correctly in Zulu', () => {
  const name = 'John';
  const chosenLanguage = language.zulu;
  const expectedGreeting = `Sawubona, John`;

  const greeting = greeter.greet(name, chosenLanguage);

  assert.equal(expectedGreeting,greeting)
});
it('should return a blank greeting if language is not available', () => {
  const name = 'John';
  const chosenLanguage = language.frnc; // Assuming French is not available
  const expectedGreeting = '';

  const greeting = greeter.greet(name, chosenLanguage);
  assert.equal(expectedGreeting,greeting)
  
});
it('should increment greet counter when greeting a user', () => {
  const name = 'John';
  const chosenLanguage = language.eng;

   greeter.greet(name, chosenLanguage);
 
  // Check if the greet counter has been incremented
 assert.equal(5,greeter.greetCounter)
 
});

it('should increment greet counter for each user', () => {
  const names = ['Alice', 'Bob', 'Charlie'];
  const chosenLanguage = language.eng;

  // Greet multiple users
  names.forEach((name) => greeter.greet(name, chosenLanguage));
  // Check if the greet counter has been incremented for each user
  
  assert.equal(8,greeter.greetCounter)
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

  //let greetable: PostgreSQLGreetable;
  const pool = new Pool(); // Create a Pool instance
  const greetable = new PostgreSQLGreetable(pool);

  // Initialize the greetable instance
  beforeEach(async function (this: Context) {
   
    try {
      this.timeout(10000);
      // clean the tables before each test run
      await db.none("TRUNCATE TABLE language_greetings RESTART IDENTITY CASCADE;");

      await db.none("INSERT INTO language_greetings(language, greeting) VALUES('en', 'Hello')");
      await db.none("INSERT INTO language_greetings(language, greeting) VALUES('fr', 'Bonjour')");
      await db.none("INSERT INTO language_greetings(language, greeting) VALUES('es', 'Hola')");


    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  it('should add and retrieve language greeting', async () => {
    // Add a language greeting
    await greetable.addLanguageGreeting('en', 'Hello');

    // Retrieve the language greeting
    const greeting = await greetable.getGreeting('en');

    // Assert that the retrieved greeting matches the expected value
    assert.equal(greeting, 'Hello');
});


});

