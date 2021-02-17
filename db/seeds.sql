ALTER TABLE employee
ADD FOREIGN KEY (role_id) REFERENCES role (id),
ADD FOREIGN KEY (manager_id) REFERENCES employee (id);

ALTER TABLE role
ADD FOREIGN KEY (department_id) REFERENCES department (id);

INSERT INTO employee (first_name, last_name)
VALUES ("Loreto", "Delgado"), ("Mallory", "Lutton"), ("Nicki", "Chlebek");

INSERT INTO role (title, salary)
VALUES ("Web Developer", 80000), ("Sales Lead", 70000), ("Accountant", 60000);

INSERT INTO department (name)
VALUES ("Engineering"), ("Sales"), ("Finance");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;