//greeting from the database

export interface Greetable {
    addLanguageGreeting(language: string, greeting: string): Promise<void>;
    getGreeting(language: string): Promise<string>;
}
