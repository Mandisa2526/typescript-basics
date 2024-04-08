//import Person from './person';
import { language } from './language';
import GreetInEnglish from './greetInEnglish';
import GreetInXhosa from './greetInXhosa';
import GreetInZulu from './greetInZulu';
import { UserGreetCounter } from './person';
import MapUserGreetCounter from './userCounter';
import { Pool } from 'pg';
import {Greetable} from './person'

// export default function greet(person: Person) {  
//    return `Hello, ${person.firstName} ${person.lastName} we can't contact you.`;

// }

export interface GreetIn {
  greet(name: string): string;
}

export function greet(name: string, chosenLanguage: language) {
  let greetIn: GreetIn = new GreetInEnglish();
  if (chosenLanguage === language.eng) {
    greetIn = new GreetInEnglish();
  }
  if (chosenLanguage === language.xhosa) {
    greetIn = new GreetInXhosa();
  }
  if (chosenLanguage === language.zulu) {
    greetIn = new GreetInZulu()
  }

  return greetIn.greet(name);

}
// Create greetLanguages map
const greetLanguages = new Map<language, GreetIn>();

const englishGreet = new GreetInEnglish();
const xhosaGreet = new GreetInXhosa();
const zuluGreet = new GreetInZulu();

greetLanguages.set(language.eng, englishGreet);
greetLanguages.set(language.xhosa, xhosaGreet);
greetLanguages.set(language.zulu, zuluGreet);

//// Instantiate MapUserGreetCounter
const userGreetCounter = new MapUserGreetCounter();

// export class Greetable {
//   // create a Map that has a languages enum as a key and a GreetIn interface instance as a value

//   private greetLanguages: Map<language, GreetIn>//This map is intended to store mappings between languages (keys) and instances of objects implementing the GreetIn interface (values).
//   private userGreetCounter: UserGreetCounter;//ntended to keep track of the count of greetings and users' greet counts.


//   constructor(greetLanguages: Map<language, GreetIn>) {
//     this.greetLanguages = greetLanguages;
//     this.userGreetCounter = userGreetCounter;
//   }

//   greet(name: string, chosenLanguage: language): string {
//     let greetIn = this.greetLanguages.get(chosenLanguage);
//     this.userGreetCounter.countGreet(name);
//     if (greetIn) {
//       return greetIn.greet(name);
//     }
//     return "";
//   }
//   // call the greetCounter on the userGreetCounter
//   //a getter method for retrieving the greet counter from the userGreetCounter property.
//   public get greetCounter(): number {
//     return this.userGreetCounter.greetCounter;
//   }
//   // call the userGreetCount on the userGreetCounter
//   userGreetCount(firstName: string): number {
//     return this.userGreetCounter.userGreetCount(firstName);
//   }
//}

export class Greeter implements Greetable {
  private greetable: Greetable
  private userGreetCounter: UserGreetCounter;

  constructor(greetable: Greetable, userGreetCounter: UserGreetCounter) {
      this.greetable = greetable;
      this.userGreetCounter = userGreetCounter;
  }

  greet(name: string, chosenLanguage: language) {
      // get the greeting message
      let message = this.greetable.greet(name, chosenLanguage);
      // mange the user count
      this.userGreetCounter.countGreet(name);
      return message;
  }

  public get greetCounter(): number {
      return this.userGreetCounter.greetCounter;
  }

  userGreetCount(firstName: string): number {
      return this.userGreetCounter.userGreetCount(firstName);
  }
}
export class GreetInManager implements Greetable {
    
  constructor(private greetLanguages: Map<language, GreetIn>) {
      this.greetLanguages = greetLanguages;
  }

  greet(firstName: string, language: language): string {
      let greetIn = this.greetLanguages.get(language);
      if (greetIn) {
          return greetIn.greet(firstName);
      }
      return "";
  }
}