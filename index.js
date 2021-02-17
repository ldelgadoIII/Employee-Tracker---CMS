// DEPENDENCIES ===========================
const mysql = require("mysql");
const inquirer = require("inquirer");

// connect to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  //  connection.end();
});

// STARTING DATA ==========================
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
function init() {
  inquirer.prompt(questions).then((answer) => {
    switch (answer.prompt) {
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Employee":
        break;
      case "Update Employee Role":
        break;
      default:
        connection.end();
        break;
    }
  });
}

function viewEmployees() {
  const query = "SELECT * FROM ?";
  connection.query;
}
// USER INTERACTIONS ======================
init();
