
export interface GreetingCount {

    id?: number;
    user_name?: string;
    user_count?: number;
    incrementGreetingCount(userId: number, user_name: string): Promise<void>;
    getGreetingCount(userId: number, user_name: string): Promise<number>;

}
