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
const actions = [
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
  inquirer.prompt(actions).then((answer) => {
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
  const query = `SELECT employee.first_name AS "First Name", 
  employee.last_name AS "Last Name", 
  department.name AS Department, 
  role.title AS role, 
  role.salary,
  Manager.first_name AS "Manager"
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id 
  LEFT JOIN employee AS Manager
  ON employee.manager_id = Manager.id
  LEFT JOIN department
  ON role.department_id = department.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
// USER INTERACTIONS ======================
init();
