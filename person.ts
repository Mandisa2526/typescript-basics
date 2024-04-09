import { language } from "./language"

//xport an interface named Person
export default interface Person {
    _greet: any//define the shape or structure of an object.
    firstName: string//properties and their types that an object should have
    lastName: string
    
    
}
export interface GreetIn {
    //method takes a single parameter name of type string, and it returns a value of type string.
    greet(name: string): string
}

export interface UserGreetCounter {
    countGreet(firstName: string): void // returns nothing//perform some action, such as counting the number of greetings by a user.
    greetCounter: number//expected to store the count of greetings.
    userGreetCount(firstName: string): number//return the count of greetings by a specific user identified by their first name.
}

export interface GreetingCount {

    id?: number;
    user_name?: string;
    user_count?: number;
    incrementGreetingCount(userId: number, user_name: string): Promise<void>;
    getGreetingCount(userId: number, user_name: string): Promise<number>;

}
export interface  Greetable {
    greet(firstName:string, language:language) : string
}
