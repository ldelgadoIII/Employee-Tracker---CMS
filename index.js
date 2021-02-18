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
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add A Role",
      "Update Employee Role",
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
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add A Role":
        addRole();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateRole();
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

function viewDepartments() {
  const query = `SELECT * FROM department`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewRoles() {
  const query = `SELECT role.title AS Role FROM role`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

const addEmployee = () => {
  const query = `SELECT *
  FROM employee AS Manager
  LEFT JOIN role
  ON role.id = Manager.id;`;
  const insertQuery = `INSERT INTO employee SET ?`;

  connection.query(query, (err, results) => {
    if (err) throw err;

    const questions = [
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees last name?",
      },
      {
        name: "role",
        type: "rawlist",
        message: "What is the employees role?",
        choices() {
          const choiceArray = [];
          results.forEach(({ title }) => {
            choiceArray.push(title);
          });
          return choiceArray;
        },
      },
      {
        name: "manager",
        type: "rawlist",
        message: "Who is the employees manager?",
        choices() {
          const choiceArray = [];
          results.forEach(({ first_name }) => {
            choiceArray.push(first_name);
          });
          return choiceArray;
        },
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      connection.query(
        insertQuery,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log("New Employee Added");
        }
      );
    });
  });
  // viewEmployees();
  // init();
};
// USER INTERACTIONS ======================
init();
