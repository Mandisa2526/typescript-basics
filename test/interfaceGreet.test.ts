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
import UserGreetCounter from '../posgresqlusergreet';
import PostgreSQLUserGreetCounter from '../posgresqlusergreet';
import pgPromise from 'pg-promise';
import Greetable from '../person'


const pgp = pgPromise();

// const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
// const db = pgp(connectionString);

//Test your new version of Greeter that is using Greetable using mocha.

// describe('Greeter', () => {
//   let greeter: Greeter;
//   let greetableMock: Greetable;
//   let userGreetCounterMock: UserGreetCounter;

//   beforeEach(() => {

//       // Creating an instance of Greeter with mocked dependencies
//       greeter = new Greeter(greetableMock, userGreetCounterMock);
//   });

//   it('should greet with the provided language and name', () => {
//       const name = 'Alice';
//       const language = 'English';
//       const expectedGreeting = `Mocked greeting for ${name} in ${language}`;

//       // Calling the greet method of Greeter
//       const actualGreeting = greeter.greet(name, language);

//       // Asserting that the actual greeting matches the expected greeting
//       assert.equal(actualGreeting, expectedGreeting);
//   });

//   // Add more test cases as needed
// });

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



describe('MapUserGreetCounter', () => {
  let userGreetCounter: MapUserGreetCounter;

  beforeEach(() => {
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

  beforeEach(() => {
    UserGreetCounter = new PostgreSQLUserGreetCounter();
  });

  it('increments greeting count correctly', async () =>{


    // Arrange
    const userId = 1;
    const userName = 'John';

    // Act
    await UserGreetCounter.incrementGreetingCount(userId, userName);

    // Assert
    const count = await UserGreetCounter.getGreetingCount(userId, userName);
    setTimeout(function () {
      assert.equal(1, count)
      done();
    }, 1000);
  })
  it('returns correct greeting count', async () => {
  
    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    await UserGreetCounter.incrementGreetingCount(2, 'Alice');
    const count = await UserGreetCounter.getGreetingCount(2, 'Alice');
    
    
    assert.equal(2, count)
   
});

});

function done() {
  throw new Error('Function not implemented.');
}
