//Child Class Engineer of the Parent Class Employee
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, gitHubName){
        super(name,id,email);
        this.github = gitHubName;
    }
    getGithub(){
        return this.github;
    }
    
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;