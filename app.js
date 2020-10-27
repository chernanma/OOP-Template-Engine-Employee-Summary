const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const logo = require('asciiart-logo');
const employeesArr =[];

//Adding Logo using  Asciiart module
console.log(
    logo({
        name: 'Employee Summary Template',        
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'red',
        logoColor: 'bold-red',
        textColor: 'white',
    })
    .emptyLine()
    .right('version 1.0.0')
    .emptyLine()
    .left('by Cesar H Martinez')
    .render()
);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function initialQuestions() {
    inquirer
      .prompt([
        {
            type: "input",
            name: "name",
            message: "What's your manager's name ?"
        },    
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID ?"
          },
          {
            type: "input",
            name: "email",
            message: "What is your manager's email ?"
          },
          {
            type: "input",
            name: "number",
            message: "What is your manager's office number ?"            
          },
          { 
            type: "list",
            name: "type_member",
            message: "What type of team member would would you like to add ? (use arrow keys)",
            choices: ["Engineer","Intern","I don't want to add any more team memeber"]
          },        
      ])
      .then(function(data){
          let manager = new Manager(data.name,data.id,data.email,data.number);
          employeesArr.push(manager);
          if (data.type_member==="Engineer"){
              engineerPrompt();
          }else if(data.type_member==="Intern"){
              internPrompt();
          }else{
            render(employeesArr);   
            fs.rmdirSync("output",{recursive:true,});        
            fs.mkdirSync(path.join(__dirname, "output"));              
            return fs.writeFileSync(outputPath,render(employeesArr));                        
 
          }         
         
      });    
      
  }

function engineerPrompt (){
    inquirer
    .prompt([
      {
          type: "input",
          name: "name",
          message: "What's your Engineer name ?"
      },    
      {
          type: "input",
          name: "id",
          message: "What is your Engineer's ID ?"
        },
        {
          type: "input",
          name: "email",
          message: "What is your Engineer's email ?"
        },
        {
          type: "input",
          name: "github",
          message: "What is your Engineer's Github username ?"            
        },
        { 
          type: "list",
          name: "type_member",
          message: "What type of team member would would you like to add ? (use arrow keys)",
          choices: ["Engineer","Intern","I don't want to add any more team memeber"]
        },        
    ])
    .then(function(data){
        let engineer = new Engineer(data.name,data.id,data.email,data.github);
        employeesArr.push(engineer);
        if (data.type_member==="Engineer"){
            engineerPrompt();
        }else if(data.type_member==="Intern"){
            internPrompt();
        }else{
          render(employeesArr);   
          fs.rmdirSync("output",{recursive:true,});        
          fs.mkdirSync(path.join(__dirname, "output"));              
          return fs.writeFileSync(outputPath,render(employeesArr)); 
        }         
    });

}

function internPrompt (){
    inquirer
    .prompt([
      {
          type: "input",
          name: "name",
          message: "What's your Intern name ?"
      },    
      {
          type: "input",
          name: "id",
          message: "What is your Intern's ID ?"
        },
        {
          type: "input",
          name: "email",
          message: "What is your Intern's email ?"
        },
        {
          type: "input",
          name: "school",
          message: "What is your Intern's school name ?"            
        },
        { 
          type: "list",
          name: "type_member",
          message: "What type of team member would would you like to add ? (use arrow keys)",
          choices: ["Engineer","Intern","I don't want to add any more team memeber"]
        },        
    ])
    .then(function(data){
        let intern = new Intern(data.name,data.id,data.email,data.github);
        employeesArr.push(intern);
        if (data.type_member==="Engineer"){
            engineerPrompt();
        }else if(data.type_member==="Intern"){
            internPrompt();
        }else{
            render(employeesArr);   
            fs.rmdirSync("output",{recursive:true,});        
            fs.mkdirSync(path.join(__dirname, "output"));              
            return fs.writeFileSync(outputPath,render(employeesArr)); 
        }         
    });

}

  initialQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
