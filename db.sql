-- delete existing db
DROP DATABASE IF EXISTS employee_trackerDB;
-- create employee tracker db
CREATE DATABASE employee_trackerDB;
-- use db
USE employee_trackerDB;
-- create employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
)
-- create role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10, 4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
)
-- create department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
)