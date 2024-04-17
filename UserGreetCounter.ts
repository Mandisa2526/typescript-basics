
export interface UserGreetCounter {
    countGreet(firstName: string): void; // returns nothing//perform some action, such as counting the number of greetings by a user.
    greetCounter: number; //expected to store the count of greetings.
    userGreetCount(firstName: string): number; //return the count of greetings by a specific user identified by their first name.
}
