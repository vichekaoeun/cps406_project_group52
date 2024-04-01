CREATE TABLE "Users" (
    employee_id INTEGER NOT NULL,
    username VARCHAR(100),
    password VARCHAR(100), 
    PRIMARY KEY (employee_id)
);

CREATE TABLE "Posts" (
    post_id VARCHAR(100) NOT NULL, 
    bug_description VARCHAR(100), 
    PRIMARY KEY (post_id)
);