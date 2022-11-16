INSERT INTO departments (department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 20000, 1),
('Sales Rep', 7000, 1),
('Lead Engineer', 180000, 2),
('Software Engineer', 100000, 2),
('Account Manager', 150000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 175000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
('Cristiano', 'Ronaldo', 1, NULL),
('Karim', 'Benzema', 2, 1),
('Gareth', 'Bale', 3, NULL),
('Sergio', 'Ramos', 4, 3),
('Raphaël', 'Varane', 5, NULL),
('Luka', 'Modrić', 6, 5),
('Toni', 'Kroos', 7, NULL),
('Keylor', 'Navas', 8, 7);