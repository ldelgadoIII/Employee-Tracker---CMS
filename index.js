// DEPENDENCIES ===========================
const mysql = require("mysql");
const inquirer = require("inquirer");

// STARTING DATA ==========================
// log into mysql
// questions array
const questions = [
  {
    name: "prompt",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "Exit",
    ],
  },
];

// FUNCTIONS ==============================
// Ask user what they want to do?
function init() {
  inquirer.prompt(questions).then((answer) => {
    switch (answer.prompt) {
      case "View All Employees":
        break;
      case "View All Employees by Department":
        break;
      case "View All Employees by Manager":
        break;
      default:
        break;
    }
  });
}

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles
// USER INTERACTIONS ======================
init();
