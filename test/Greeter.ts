// Import your implementations:
import assert from 'assert';
import { GreetInManager, Greeter, greet } from '../greet';
import { GreetIn } from "../GreetIn";
import { language } from '../Language';
import GreetInZulu from '../greetInZulu';
import GreetInEnglish from '../greetInEnglish';
import GreetInXhosa from '../greetInXhosa';
import MapUserGreetCounter from '../UserCounter';
import pgPromise from 'pg-promise';



const pgp = pgPromise();

const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
export const db = pgp(connectionString);

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

});





