import { GreetIn } from "./person";

// Implementing the GreetIn interface
export default class GreetInXhosa implements GreetIn {
    greet(name: string) {
      return "Molo, " + name;
    }
}

