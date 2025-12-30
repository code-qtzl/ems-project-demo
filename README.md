# Employee Management System (EMS)

## Project Overview

This project aims to showcase design, implement, and testing of a full-stack Employee Management System (EMS). The EMS will simulate real-world backend development tasks by incorporating route management, file handling, middleware integration, view rendering using EJS, and automated end-to-end testing with Cypress. The goal is to build a testable, modular, and maintainable system using industry-standard tools.

## Problem Statement and Motivation

### Real-time scenario:

Human resource departments and startups often require internal tools to manage employee data effectively. Relying on spreadsheets can lead to data duplication, inconsistencies, and inefficiencies.

### Solution:

The employee management system streamlines HR operations by allowing admin users to add, view, update, and delete employee records through a user-friendly web interface. It minimizes data duplication, improves information accuracy, and reduces manual effort. Using Node.js, Express.js, EJS, and the fs module, the application delivers a dynamic and functional backend experience. Automated testing with Cypress ensures system reliability, making the EMS a dependable tool for managing employee data efficiently.

## Features

-   **User Authentication**: Secure login and signup functionality
-   **Employee Management**: Full CRUD operations (Create, Read, Update, Delete)
-   **Responsive Dashboard**: Modern, card-based employee display with 4-column grid layout
-   **Real-time Updates**: Dynamic DOM manipulation without page reloads
-   **Modal Forms**: User-friendly forms for adding and editing employees
-   **Data Persistence**: Employee data stored in JSON format
-   **Automated Testing**: Comprehensive end-to-end tests using Cypress

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **View Engine**: EJS (Embedded JavaScript)
-   **Frontend**: HTML5, CSS3, Skeleton CSS Framework
-   **Database**: JSON file-based storage
-   **Authentication**: bcryptjs for password hashing
-   **Testing**: Cypress for E2E testing
-   **Version Control**: Git

## Project Structure

```
ems-project/
├── bin/
│   └── www
├── config/
│   ├── dbConfig.js
│   └── passwordHash.js
├── controller/
│   └── loginController.js
├── cypress/
│   └── e2e/
│       └── 0-flow/
│	       ├── account-workflow.cy.js
│	       └── login.cy.js
├── data/
│   └── employees.json
├── model/
│   ├── employeeModel.js
│   └── loginModel.js
├── public/
│   └── stylesheet/
├── repository/
│   └── loginRepository.js
├── routes/
│   ├── index.js
│   └── users.js
├── service/
│   └── loginService.js
├── views/
│   ├── stylesheet/
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── signUp.ejs
├── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/code-qtzl/sl-fsd-projects.git
cd ems-project-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

4. Access the application:

```
http://localhost:3000
```

## Usage

### Login

-   Navigate to `http://localhost:3000/login`
-   Use existing credentials or create a new account

### Dashboard

-   View all employees in a responsive grid layout
-   Add new employees using the "+ Add Employee" button
-   Edit employee information by clicking the "Edit" button on any employee card
-   Delete employees by clicking the "Delete" button

### API Endpoints

-   `GET /api/employees` - Get all employees
-   `POST /api/employees` - Create a new employee
-   `GET /api/employees/:id` - Get a single employee
-   `PUT /api/employees/:id` - Update an employee
-   `DELETE /api/employees/:id` - Delete an employee

## Testing

Run Cypress tests:

```bash
npx cypress open
```

Or run tests in headless mode:

```bash
npx cypress run
```

### Test Coverage

-   Login flow validation
-   Account creation flow
-   Employee CRUD operations
-   Dashboard functionality

## Dependencies

```json
{
	"bcryptjs": "^3.0.3",
	"cookie-parser": "~1.4.4",
	"debug": "~2.6.9",
	"dotenv": "^17.2.3",
	"ejs": "~2.6.1",
	"express": "~4.16.1",
	"http-errors": "~1.6.3",
	"mongodb": "^7.0.0",
	"morgan": "~1.9.1"
}
```

## Development Scripts

-   `npm start` - Runs build script and starts the server with nodemon
-   `npm run build` - Copies stylesheets to public directory
-   `npm test` - Placeholder for test command

## Author

Andres Zepeda contact me at, a.a.zepeda003[at]gmail.com
