
import { PostgreSQLGreetable } from "../PostgreSQLGreetable";
import assert from 'assert';
import { Context } from 'mocha';
import 'dotenv/config';
import pool from '../model/database';


describe('PostgreSQLGreetable', () => {


  //let greetable: PostgreSQLGreetable;
  const greetable = new PostgreSQLGreetable(pool);

  // Initialize the greetable instance
  beforeEach(async function (this: Context) {

    try {
      this.timeout(10000);
      // clean the tables before each test run
      await pool.query("TRUNCATE TABLE language_greetings RESTART IDENTITY CASCADE");
      await pool.query("INSERT INTO language_greetings(language, greeting) VALUES('en', 'Hello')");
      await pool.query("INSERT INTO language_greetings(language, greeting) VALUES('fr', 'Bonjour')");
      await pool.query("INSERT INTO language_greetings(language, greeting) VALUES('es', 'Hola')");


    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  it('should add language greeting', async function (this: Context) {
    this.timeout(10000);
    // Act
    await greetable.addLanguageGreeting('en', 'Hello');



  });
  it('should get greeting for language', async function (this: Context) {
    this.timeout(10000);
    // Act
    const greeting = await greetable.getGreeting('en');

    // Assert
    assert.equal('Hello', greeting)

  });

});  
