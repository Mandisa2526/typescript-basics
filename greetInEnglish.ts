import { GreetIn } from "./person";

export default class GreetInEnglish implements GreetIn {
    greet(name: string) {
      return "Hello, " + name;
    }
}


//this code defines a class GreetInEnglish that implements the GreetIn interface.
//It provides an implementation for the greet method specified in the interface, which simply returns a greeting message "Hello, " followed by the provided name. This class is exported as the default export from the module, making it accessible for import in other modules.





