var mysql = require("mysql");
const inquirer = require("inquirer");
// var db = require("./Assets/db.js");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "abc123",
    database: "department_db"
});

// Creating connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

run();
// initial function to run codes
function run() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "userChoice",
                message: "What do you want to do?",
                choices: [
                    "View all Employee",
                    "View Departments",
                    "View Employees",
                    "View Roles",
                    "Add Department",
                    "Add employee",
                    "Add roles",
                    "Update emproyee role",
                    "exit"
                ],
            },
        ])
        .then(function (answer) {
            // conditions for each choices of initial questions
            switch (answer.userChoice) {
                case "View all Employee":
                    fullDisplay();
                    break;

                case "View Departments":
                    viewDepartment();
                    break;

                case "View Employees":
                    viewEmployee();
                    break;

                case "View Roles":
                    viewRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Add roles":
                    addRole();
                    break;

                case "Update emproyee role":
                    updateRole();
                    break;

                case "exit":
                    exitSystem();
                    break;
            }
        });
}


function fullDisplay() {
    var defaultDisplay = `SELECT
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
ON d.ID = p.id;`;
    connection.query(defaultDisplay, function (err, res) {
        if (err) throw err;
        console.table(res);
        // connection.end();
        run();
    });
}


// * addDepartment()
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "type depatment name"
            }
        ]).then(function (answer) {
            var insertDepartment = `INSERT INTO departmentTable (department) VALUES ("?");`;
            connection.query(insertDepartment, [answer.department], function (err, res) {
                if (err) throw err;
                run();
            });
        });
}

// * addEmployee function
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "Type first name"
            },
            {
                type: "input",
                name: "lastName",
                message: "Type last name"
            },
            {
                type: "input",
                name: "manager",
                message: "Type manager"
            },
            {
                type: "rawlist",
                name: "roleId",
                message: "Choose id of role",
                choices: [1, 2, 3, 4, 5],
            }
        ]).then(function (answer) {
            var insertEmployee = `INSERT INTO employeesTable (first_name, last_name, manager, role_id ) VALUES ("?","?","?","?");`;
            connection.query(insertEmployee, [answer.firstname, answer.lastName, answer.manager, answer.roleId], function (err, res) {
                if (err) throw err;
                // console.table(answer)
                run();
            });
        });
}

// * addRole function
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Type title"
            },
            {
                type: "input",
                name: "salary",
                message: "Type salary"
            }
        ]).then(function (answer) {
            var insertRole = `INSERT INTO rolesTable (title, salary ) VALUES ("?","?");`;
            connection.query(insertRole, [answer.title, answer.salary], function (err, res) {
                if (err) throw err;
                run();
            });
        });
}

// * viewEmployee function 
function viewEmployee() {
    var viewEmployee = "SELECT * FROM employeesTable;";
    connection.query(viewEmployee, function (err, res) {
        if (err) throw err;
        console.table(res)
        run();
    });
}


// * viewRole()
function viewRole() {
    var viewRole = "SELECT * FROM rolesTable;";
    connection.query(viewRole, function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
    });
}



// * viewDepartment()
function viewDepartment() {
    var viewDepartment = "SELECT * FROM departmentTable;";
    connection.query(viewDepartment, function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
    })
}


// * updateRole()
function updateRole() {
    inquirer
        .prompt([
            {
                type: "rawlist",
                name: "change_id",
                message: "Choose id of role",
                choices: [1, 2, 3, 4, 5],
            },
            {
                type: "input",
                name: "change_title",
                message: "change title"
            },
            {
                type: "input",
                name: "change_salary",
                message: "change salary"
            },
        ]).then(function (answer) {
            var updateRole = `UPDATE rolesTable
    SET title= "?", salary = "?"
    WHERE id = "?";`;
            connection.query(updateRole, [answer.change_title, answer.change_salary, answer.change_id], function (err, res) {
                if (err) throw err;
                run();
            });
        });
}

// * exit()
function exitSystem() {
    console.log("Operation is finished and disconnected.")
    connection.end();
}

