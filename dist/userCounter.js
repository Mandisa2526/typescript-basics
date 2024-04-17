"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapUserGreetCounter {
    userGreetCounter(arg0, userGreetCounter) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        this.greetedUsers = new Map();
    }
    //increment the count of greeting for a given user
    countGreet(firstName) {
        const count = this.greetedUsers.get(firstName) || 0;
        this.greetedUsers.set(firstName, count + 1);
    }
    get greetCounter() {
        // Calculate the total count of greetings
        return Array.from(this.greetedUsers.values()).reduce((total, count) => total + count, 0);
    }
    //retrieves the count of greetings for a specific user
    userGreetCount(firstName) {
        return this.greetedUsers.get(firstName) || 0;
    }
}
exports.default = MapUserGreetCounter;
