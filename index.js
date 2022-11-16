const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

// displays the message in node terminal
console.log(`
.--------------------.
|                    |  
|  EMPLOYEE TRACKER  |
|                    |
.--------------------.
`);

const mainMenuQuestions = [
  {
    type: "list",
    name: "answer",
    message: "What would you like to do next?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee",
    ],
  },
];

function listDepartments() {
  db.promise()
    .query(
      "SELECT department.id, department.department_name FROM department;"
    )
    .then((department) => {
      console.table(department[0]);
      menuQuestion();
    });
}

function listRoles() {
  db.promise()
    .query(
      "SELECT roles.id, roles.title, roles.salary, department.department_name as department FROM roles LEFT JOIN department on roles.department_id=department.id;"
    )
    .then((roles) => {
      console.table(roles[0]);
      menuQuestion();
    });
}

function menuQuestion() {
  inquirer.prompt(mainMenuQuestions).then((answers) => {
    console.log(answers);

    if (answers.mainMenuQuestions === "View all department") {
    }
  });
}

menuQuestion();
