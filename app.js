const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
// Create arrays that will hold html cards for each employee
var managerList = [];
var engineerList = [];
var internList = [];

// Main app function
function startApp() {
    inquirer.prompt({
        // Ask which type of employee the user wants to enter, or allow them to save a file or exit the app
        name: "employeeType",
        type: "list",
        message: "Which type of employee would you like to add?",
        choices: ["Manager", "Engineer", "Intern", "Save and Exit", "Exit"]
    }).then(function (data) {
        if (data.employeeType === "Manager") {
            addManager();
        }
        else if (data.employeeType === "Engineer") {
            addEngineer();
        }
        else if (data.employeeType === "Intern") {
            addIntern();
        } else if (data.employeeType === "Save and Exit") {
            // Generate the HTML passing the employee arrays, write it to a file in the /output folder, then exit the app
            var HTML = generateHTML(managerList, engineerList, internList)
            console.log("Success! Your team profile is complete!")
            fs.writeFileSync(path.join(__dirname, "output/teamprofile.html"), HTML, function (err) {
                if (err) { return console.log(err) }
            });
            process.exit()
        } else {
            // Reset all html cards and exit the app
            managerList = []
            engineerList = []
            internList = []
            process.exit()
        }
    });
};

function addManager() {
    // Ask the user for Manager details, then push the html card output to the managerList array
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the new Manager's name:"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter the new Manager's id:"
        },
        {
            name: "office",
            type: "input",
            message: "Please enter the new Manager's office number:"
        }
    ]).then(function (data) {
        // Make a new manager with the user responses and manager subclass
        var newManager = new Manager(data.name, data.id, data.office)

        var newManagerCard = `<div class="card text-white bg-dark my-3 mx-auto" style="max-width: 18rem;">
        <div class="card-header">${newManager.name}</div>
        <div class="card-body">
          <p class="card-text">Employee ID: #${this.id}</p>
          <p class="card-title">Portfolio: <a href="https://github.com/${newManager.github}">${newManager.github}</a></p>
        </div>
      </div>`

    
        managerList.push(newManagerCard)
        // Restart the app
        console.log("Add another Employee?")
        startApp()
    })

};

function addEngineer() {
    // Ask for Engineer details, then push the html card output to the engineerList array
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the new Engineer's name:"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter the new Engineer's id:"
        },
        {
            name: "username",
            type: "input",
            message: "Please enter the new Engineer's Github username:"
        }
    ]).then(function (data) {
        // Make a new Engineer with the user response and Engineer subclass
        var newEngineer = new Engineer(data.name, data.id, data.username)
        var newEngineerCard = `<div class="card text-white bg-dark my-3 mx-auto" style="max-width: 18rem;">
        <div class="card-header">${newEngineer.name}</div>
        <div class="card-body">
          <p class="card-text">Employee ID: #${newEngineer.id}</p>
          <p class="card-title">Portfolio: <a href="https://github.com/${newEngineer.github}">${newEngineer.github}</a></p>
        </div>
      </div>`

        engineerList.push(newEngineerCard)
        // Restart the app
        console.log("Add another Employee?")
        startApp()
    })
};

function addIntern() {
    // Ask for intern details, then push the html card output to the internList array
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the intern's name:"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter the intern's id:"
        },
        {
            name: "school",
            type: "input",
            message: "Please enter the name of the intern's school:"
        }
    ]).then(function (data) {
        // Make a new Intern with the user response and Intern subclass
        var newIntern = new Intern(data.name, data.id, data.school)
        var newInternCard = `<div class="card text-white bg-dark my-3 mx-auto" style="max-width: 18rem;">
        <div class="card-header">${newIntern.name}</div>
        <div class="card-body">
          <p class="card-text">Employee ID: #${newIntern.id}</p>
          <p class="card-title">Portfolio: <a href="https://github.com/${newIntern.github}">${newIntern.github}</a></p>
        </div>
      </div>`
        internList.push(newInternCard)
        // Restart the app
        console.log("Add another Employee?")
        startApp()
    })
};
// Function takes in 3 parameters (the 3 employee arrays which are all html cards) 
//                       and creates an HTML page with the employee cards included
function generateHTML(managers, engineers, interns) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body class="bg-dark">
        <div class="container-fluid text-center bg-dark py-3">
            <h1 class="text-light">Your Team Profile</h1>
        </div>
        
        <div class="container-fluid bg-secondary">
            <div class="row border-top">
                <div class="col text-center" id="managers">
                    <div class="row bg-dark py-1"><h3 class="text-light mx-auto">Manager</h3></div>
                  ${managers.join("\n")}
                </div>
                <div class="col text-center" id="engineers">
                    <div class="row bg-dark py-1"><h3 class="text-light mx-auto">Engineers</h3></div>
                    ${engineers.join("\n")}
                </div>
                <div class="col text-center" id="interns">
                    <div class="row bg-dark py-1"><h3 class="text-light mx-auto">Interns</h3></div>
                    ${interns.join("\n")}
                </div>
            </div>
        </div>
    
    </body>
    </html>`};
// Start the app
startApp()