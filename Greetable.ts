import { language } from "./Language";


export interface Greetable {
    greet(firstName: string, language: language): string;

}
