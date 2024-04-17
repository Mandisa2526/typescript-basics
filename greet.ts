//import Person from './person';
import { language } from './Language';
import GreetInEnglish from './greetInEnglish';
import GreetInXhosa from './greetInXhosa';
import GreetInZulu from './greetInZulu';
import { UserGreetCounter } from "./UserGreetCounter";
import { Greetable } from "./Greetable";
import { GreetIn } from './GreetIn';

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
//responsible for managing different greetings for various languages. 
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