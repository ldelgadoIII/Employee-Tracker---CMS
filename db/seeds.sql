-- Add Values
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Loreto", "Delgado", 1, 2), ("Mallory", "Lutton", 2, 0), ("Nicki", "Chlebek", 3, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 80000, 1), ("Sales Lead", 70000, 2), ("Accountant", 60000, 3);

INSERT INTO department (name)
VALUES ("Engineering"), ("Sales"), ("Finance");