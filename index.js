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
      "View All managers",
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
      case "View All managers":
        viewmanagers();
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

function viewmanagers() {
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

function addDepartment() {
  const query = `INSERT INTO department SET ?`;

  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      connection.query(query, { name: answer.department }, (err) => {
        if (err) throw err;
        console.log("You added a department!");
        init();
      });
    });
}

let departments;
let dept_ids;
let dept_obj = {};

connection.query("SELECT * FROM department", (err, res) => {
  dept_ids = res.map((dept) => dept.id);
  departments = res.map((dept) => dept.name);
});

function addRole() {
  for (let i = 0; i < managers.length; i++) {
    manager_obj[managers[i]] = managers_ids[i];
  }

  const query = `INSERT INTO role SET ?`;
  const roleQs = [
    {
      name: "role",
      type: "input",
      message: "What role would you like to add?",
    },
    {
      name: "salary",
      type: "input",
      message: "How much does this role make annually?",
    },
    {
      name: "department",
      type: "list",
      message: "Which department will this be assigned to?",
      choices: departments,
    },
  ];

  inquirer.prompt(roleQs).then((answer) => {
    connection.query(
      query,
      {
        title: answer.role,
        salary: answer.salary,
        department_id: dept_obj[answer.department],
      },
      (err) => {
        if (err) throw err;
        console.log("You added a department!");
        init();
      }
    );
  });
}

let managers;
let managers_ids;
let manager_obj = {};

connection.query("SELECT * FROM employee", (err, res) => {
  managers_ids = res.map((element) => element.manager_id);
  managers = res.map((element) => element.first_name);
});

let roles;
let roles_ids;
let role_obj = {};

connection.query("SELECT * FROM role", (err, res) => {
  roles_ids = res.map((element) => element.department_id);
  roles = res.map((element) => element.title);
});

const addEmployee = () => {
  const query = `SELECT *
  FROM employee AS Manager
  LEFT JOIN role
  ON role.id = Manager.id;`;
  const insertQuery = `INSERT INTO employee SET ?`;

  for (let i = 0; i < managers.length; i++) {
    manager_obj[managers[i]] = managers_ids[i];
  }

  for (let i = 0; i < roles.length; i++) {
    role_obj[roles[i]] = roles_ids[i];
  }

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
        choices: roles,
      },
      {
        name: "manager",
        type: "rawlist",
        message: "Who is the employees manager?",
        choices: managers,
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      // console.log(role_obj[answer.role]);
      // console.log(manager_obj[answer.manager]);

      connection.query(
        insertQuery,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: role_obj[answer.role],
          manager_id: manager_obj[answer.manager],
        },
        (err) => {
          if (err) throw err;
          console.log("New Employee Added");
          init();
        }
      );
    });
  });
};
// USER INTERACTIONS ======================
init();
