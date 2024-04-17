import assert from 'assert';
import MapUserGreetCounter from '../UserCounter';

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
    assert.equal(3, greetCount);
  });

  it('should calculate the total greet count', () => {

    userGreetCounter.countGreet('Alice');
    userGreetCounter.countGreet('Bongane');
    userGreetCounter.countGreet('Cebelihle');

    const greetCounter = userGreetCounter.greetCounter;
    assert.equal(3, greetCounter);
  });

  it('should return 0 if user has not been greeted', () => {
    const greetCount = userGreetCounter.userGreetCount('Alwande');

    assert.equal(0, greetCount);
  });

  it('should increment greet count for a new user', () => {
    userGreetCounter.countGreet('Alice');
    userGreetCounter.countGreet('Bongani');
    userGreetCounter.countGreet('Cebelihle');
    userGreetCounter.countGreet('David');

    const greetCount = userGreetCounter.userGreetCount('David');
    assert.equal(1, greetCount);
  });

  it('should increment greet count for an existing user', () => {
    const firstName = 'Alice';

    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);
    userGreetCounter.countGreet(firstName);

    const greetCount = userGreetCounter.userGreetCount(firstName);
    assert.equal(4, greetCount);
  });
});
