const inquirer = require("inquirer");
const CTable = require("console.table");

const mainMenuQuestions = {
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
};

function mainMenuQuestion() {
  inquirer.prompt(mainMenuQuestions);
}

mainMenuQuestion();
