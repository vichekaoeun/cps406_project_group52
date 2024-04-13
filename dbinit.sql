CREATE TABLE IF NOT EXISTS user (
    employee_id TEXT UNIQUE,
    username TEXT UNIQUE,
    password TEXT
);

CREATE TABLE IF NOT EXISTS bug_reports (
    report_number TEXT NOT NULL,
    bug_type TEXT NOT NULL,
    summary TEXT NOT NULL,
    updates_requested INTEGER,
    progress_requested INTEGER
);