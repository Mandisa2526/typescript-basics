import { GreetIn } from "./person";
export default class GreetInZulu implements GreetIn {
    greet(name: string) {
      return "Sawubona, " + name;
    }
}