import { UserGreetCounter } from "./UserGreetCounter";

export default class MapUserGreetCounter implements UserGreetCounter {
  userGreetCounter(arg0: number, userGreetCounter: any) {
    throw new Error('Method not implemented.');
  }
  //type to store the count of greetings for each user
  private greetedUsers: Map<string, number>;
  assert: any;

  constructor() {
    this.greetedUsers = new Map<string, number>();
  }
  //increment the count of greeting for a given user
  countGreet(firstName: string): void {
    const count = this.greetedUsers.get(firstName) || 0;
    this.greetedUsers.set(firstName, count + 1);
  }

  get greetCounter(): number {
    // Calculate the total count of greetings
    return Array.from(this.greetedUsers.values()).reduce((total, count) => total + count, 0);
  }
  //retrieves the count of greetings for a specific user
  userGreetCount(firstName: string): number {
    return this.greetedUsers.get(firstName) || 0;
  }
}
