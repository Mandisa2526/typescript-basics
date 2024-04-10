
CREATE TABLE GreetingCount (
	id SERIAL NOT NULL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_count INT NOT NULL
);

CREATE TABLE language_greetings (
    id SERIAL PRIMARY KEY,
    language VARCHAR(100) NOT NULL,
    greeting TEXT NOT NULL
);
