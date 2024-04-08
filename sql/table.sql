
CREATE TABLE GreetingCount (
	id SERIAL NOT NULL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_count INT NOT NULL,
    language VARCHAR(255) NOT NULL,
    greeting VARCHAR(255) NOT NULL
);
