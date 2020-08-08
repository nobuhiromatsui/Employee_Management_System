DROP DATABASE IF EXISTS department_db;
CREATE database department_db;

USE department_db;

CREATE TABLE departmentTable (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE rolesTable (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NULL,
  salary VARCHAR(100),
  department_id INT,
  PRIMARY KEY (id)
);


CREATE TABLE employeesTable (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role_id INT,
  manager VARCHAR(100),
  PRIMARY KEY (id)
  );



INSERT INTO departmentTable (department)
VALUES ("finance");

INSERT INTO departmentTable (department)
VALUES ("engineer");

-- roles.data
INSERT INTO rolesTable (title,salary,department_id )
VALUES ("engineer", "130000", "2");

INSERT INTO rolesTable (title,salary,department_id )
VALUES ("manager", "150000", "1");

-- employees.data
INSERT INTO employeesTable (first_name,last_name, role_id, manager )
VALUES ("Yo","Yoma","3", "jan");

INSERT INTO employeesTable (first_name,last_name, role_id, manager )
VALUES ("Joe","Jo","2", "Jacob");


SELECT * FROM departmentTable;
SELECT * FROM rolesTable;
SELECT * FROM employeesTable;


-- Join tables
SELECT
   o.id,
      p.first_name,
   p.last_name,
   o.department,
   d.title,
   d.salary,
   p.manager
FROM
   departmentTable AS o  
LEFT JOIN
   rolesTable AS d  
ON o.id = d.ID
RIGHT JOIN
   employeesTable AS p  
ON d.ID = p.id;



