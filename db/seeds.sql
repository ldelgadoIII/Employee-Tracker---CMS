-- Add Values

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Loreto", "Delgado", 1, 2), ("Mallory", "Lutton", 2, 0), ("Nicki", "Chlebek", 3, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 80000, 1), ("Sales Lead", 70000, 2), ("Accountant", 60000, 3);

INSERT INTO department (name)
VALUES ("Engineering"), ("Sales"), ("Finance");

-- View all employees feature
SELECT employee.first_name AS "First Name", 
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
ON role.department_id = department.id;

-- Select manager and role tables
SELECT role.title, 
Manager.first_name
FROM employee AS Manager
LEFT JOIN role
ON role.id = Manager.id;