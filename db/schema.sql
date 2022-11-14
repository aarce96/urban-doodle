DROP DATABASE IF EXISTS etracker_db;
CREATE DATABASE etracker_db;
USE etracker_db;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
    );

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
    );

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INTEGER,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
    manager_id INTEGER NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);