import GreetInEnglish from "./greetInEnglish";
import GreetInXhosa from "./greetInXhosa";
import GreetInZulu from "./greetInZulu";
import { language } from "./language";

export interface GreetIn {
    greet(name: string): string;
}


export function greet(name: string, chosenLanguage: language) {
    let greetIn : GreetIn = new GreetInEnglish();
    if (chosenLanguage === language.eng) {
        greetIn = new GreetInEnglish();
    }
    if (chosenLanguage === language.xhosa) {
        greetIn = new GreetInXhosa();
    }
    if(chosenLanguage === language.zulu){
      greetIn = new GreetInZulu()
    }
    
    return greetIn.greet(name);
}
