const inquirer = require("inquirer");
const db = require("./db/connection.js");
require("console.table");

// displays the message in node terminal
console.log(`
.--------------------.
|                    |  
|  EMPLOYEE TRACKER  |
|                    |
.--------------------.
`);

// array of menu questions
const mainMenuQuestions = [
  {
    type: "list",
    name: "answer",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee",
    ],
  },
];

// menu questions function
function menuQuestion() {
  inquirer.prompt(mainMenuQuestions).then((answers) => {
    console.log(answers.answer);
    switch (answers.answer) {
      case "View all departments":
        listDepartments();
        break;
      case "View all roles":
        listRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee":
        updateEmployee();
        break;

      default:
        break;
    }
  });
}

// list all departments function
function listDepartments() {
  db.promise()
    .query(
      "SELECT departments.id, departments.department_name FROM departments;"
    )
    .then((departments) => {
      console.table(departments[0]);
      // callback function
      menuQuestion();
    });
}

// list all roles function
function listRoles() {
  db.promise()
    .query(
      "SELECT roles.id, roles.title, roles.salary, departments.department_name as department FROM roles LEFT JOIN departments on roles.department_id=departments.id;"
    )
    .then((roles) => {
      console.table(roles[0]);
      // callback function
      menuQuestion();
    });
}

// list all employees function
function viewEmployees() {
  db.promise()
    .query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name FROM employees LEFT JOIN roles on roles.id=employees.roles_id LEFT JOIN departments on departments.id=roles.department_id;"
    )
    .then((employees) => {
      console.table(employees[0]);
      // callback function
      menuQuestion();
    });
}

// add a department function
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO departments SET?",
        { department_name: answer.newDepartment },
        (err, res) => {
          // callback function
          menuQuestion();
        }
      );
    });
}

// add a role function
function addRole() {
  db.promise()
    .query("SELECT * FROM departments")
    .then((res) => {
      return res[0].map((departments) => {
        return {
          name: departments.department_name,
          value: departments.id,
        };
      });
    })
    .then((departments) => {
      return inquirer.prompt([
        {
          type: "input",
          name: "role",
          message: "What role would you like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "department",
          choices: departments,
          message: "Select the department for this role:",
        },
      ]);
    })
    .then((answer) => {
      // console.log(answer);
      return db.promise().query("INSERT INTO roles SET ?", {
        title: answer.role,
        salary: answer.salary,
        department_id: answer.department,
      });
    })
    .then((res) => {
      console.log("New role added");
      // callback function
      menuQuestion();
    });
}

async function addEmployee() {
  const managers = await selectManager();
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is their last name?",
      },
      {
        type: "list",
        name: "role",
        choices: await selectRole(),
        message: "Select their role:",
      },
      {
        type: "list",
        name: "manager",
        choices: managers,
        message: "Select their manager's name:",
      },
    ])
    .then(function (res) {
      let roleId = res.role;
      let managerId = res.manager;

      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: res.first,
          last_name: res.last,
          manager_id: managerId,
          roles_id: roleId,
        },
        function (err) {
          // callback function
          menuQuestion();
        }
      );
    });
}

async function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "select",
        choices: await selectEmployee(),
        message: "Which employee would you like to update?",
      },
      {
        type: "list",
        name: "assign",
        choices: await selectRole(),
        message: "What role would you like to assign this employee?",
      },
    ])
    .then(function (res) {
      let employeeName = res.select;
      let employeeRole = res.assign;

      db.query(
        "INSERT INTO employees SET ?",
        {
          id: employeeName,
          roles_id: employeeRole,
        },
        function (err) {
          // callback function
          menuQuestion();
        }
      );
    });
}

// select a manager function
function selectManager() {
  return db
    .promise()
    .query("SELECT * FROM employees")
    .then((res) => {
      return res[0].map((employees) => {
        return {
          name: `${employees.first_name} ${employees.last_name}`,
          value: employees.roles_id,
        };
      });
    });
}

// select a role function
function selectRole() {
  return db
    .promise()
    .query("SELECT * FROM roles")
    .then((res) => {
      return res[0].map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
    });
}

// select a employee function
function selectEmployee() {
  return db
    .promise()
    .query("SELECT * FROM employees")
    .then((res) => {
      return res[0].map((employees) => {
        return {
          name: `${employees.first_name} ${employees.last_name}`,
          value: employees.roles_id,
        };
      });
    });
}

menuQuestion();
