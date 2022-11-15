const inquirer = require("inquirer");
const CTable = require("console.table");
const db = require("./db/connection");

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
      "SELECT departments.id, departments.department_name FROM departments;"
    )
    .then((departments) => {
      console.table(departments[0]);
      menuQuestion();
    });
}

function listRoles() {
  db.promise()
    .query(
      "SELECT roles.id, roles.title, roles.salary, departments.department_name as department FROM roles LEFT JOIN departments on roles.department_id=departments.id;"
    )
    .then((roles) => {
      console.table(roles[0]);
      menuQuestion();
    });
}

function menuQuestion() {
  inquirer.prompt(mainMenuQuestions).then((answers) => {
    console.log(answers);

    if (answers.mainMenuQuestions === "View all departments") {
    }
  });
}

mainMenuQuestion();
