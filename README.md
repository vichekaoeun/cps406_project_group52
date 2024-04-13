# cps406_project_group52
## Team Members:
Vicheka Oeun,
Hongyu Jin,
Param Chauhan,
Nami Dilipbhai Hirpara,
Dhruvi Paresh Thakkar,
Ansh Ansh

## 1. Executive Summary:
The purpose of this program is to let users input bugs/errors into a database. The program should
be an easy and friendly script where the user can easily figure out how to implement it. Users
will need internet connection and certain network abilities enabled for the web form to work
properly.
### 1.1 Purpose:
The Bug Reporting System (BRS) is intended to help the user keep track of bugs/defects in
design documents, diagrams, formal specs, source files, test source files, binaries and data
files. Tracking of the bug will be done by means of keeping track of the “originator” of the
bug, type of bug, short description, and any other data that is relevant. This will allow users
to keep track of the progress of the defect fix.

## 2. How the build works:
Here's some info about our main files, In "app.py", we've built a Flask app to manage user registration and accounts. It talks to a SQLite database, securely storing passwords and providing features like password resets and username updates. "databaseSet.py" ensures smooth database operations for our Flask app, setting up connections and configuring settings like timeout for locks. "functions.py" helps with database interactions, like validating credentials, fetching posts, and adding comments. Lastly, "loaddata.py" handles saving user info for login and system use.
<br>
Our Login.js acts as the default url '/' it is the first page users see once they go to our website. Route.js uses the react-router-dom library from React to create seamless routes between pages. Each JavaScript contains functions to send requests to the back-end flask app to perform various requests like GET and POST to retrieve user data or add user data to our SQLite database. The components folder contains component JavaScript files leveraging React's modularization of files so we can reuse Titlecard and BugCard for different pages without having to rebuild.

### 2.1. Technologies we used:
- Front-end:
JavaScript (React), HTML, CSS
- Back-end:
Python (Flask), SQLite

### 2.2. Setup:
Make sure to have:
- pip installed
- node.js installed

### 2.3. How to run:
To run our website you need to:
Install all the dependencies:
```
npm install
```
On the home directory, run:
```
python3 app.py
```
Then run whenever you make any changes:
```
npm run build
```
Finally our website runs on port:
```
http://127.0.0.1:5000/
```

## 3. Specific Requirements
### 3.1. Functional Requirements:
We describe the functional requirements by giving various use cases.
<br>
#### <u>Use cases related to registration:</u>
<b>Use Case 1: Registration</b>
<br>
<u>Primary Actor:</u> User
<br>
<u>Secondary Actor:</u> System
<br>
<u>Precondition:</u> None
<br>
<u>Main Scenario:</u>
<br>
1. User goes to website, and clicks register option button and is redirected.
2. User provides employee number, login name and password
3. System checks that password is secure enough and checks to see if login
name is available.
<br>
#### <u>Use cases related to authorization:</u>
<b>Use Case 2: Login</b>
<br>
<u>Primary Actor:</u> User
<br>
<u>Secondary Actor:</u> System
<br>
<u>Precondition:</u> User is registered.
<br>
<u>Main Scenario:</u>
<br>
1. Go to website and click login button
2. User gives login info
3. System checks user info
4. Members area is displayed
<br>
<u>Alternate Scenario:</u>
4. (A) Login fails
    - (A) 1. Re-prompt for login info
    - (A) 2. User is allowed to enter info 3 times before password gets reset
and sent to email
4. (B) User forgot password
    - (B)1. System sends temporary password to email account
<br>
##
<b>Use Case 3: Cancel</b>
<br>
<u>Primary Actor:</u> User
<br>
<u>Secondary Actor:</u> System
<br>
<u>Precondition:</u> User is at login page.
<br>
<u>Main Scenario:</u>
<br>
1. User clicks cancel button at login screen
2. User is redirected to main page

## 4. Team velocity diagram
![velocity diagram](./public/velocity%20diagram.png)

## 5. Product Backlog
![p1](./public/p1.png)
<br>
![p2](./public/p2.png)
<br>
![p3](./public/p3.png)
<br>
![p4](./public/p4.png)
<br>
![p5](./public/p5.png)