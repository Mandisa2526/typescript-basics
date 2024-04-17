import { GreetIn } from "./GreetIn";
export default class GreetInZulu implements GreetIn {
    greet(name: string) {
      return "Sawubona, " + name;
    }
}