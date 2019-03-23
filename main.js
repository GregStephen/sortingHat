const startSortBtn = document.getElementById("startSortBtn");
const sortBtn = document.getElementById("sortBtn");
const expelBtns = document.getElementsByClassName("expelBtn");
const form = document.getElementById("studentForm");
const error = document.getElementById("error");
const firstYearForm = document.getElementById("firstYearForm");
let studentNameForm = document.getElementById("studentName");
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const studentCards = [];
const expelledStudents = [];


//////////////// Event Listeners ///////////////

startSortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "block";
    // firstYearForm.scrollIntoView(false);
});

sortBtn.addEventListener('click', function(e){
    // checks to see if the input is not empty
    if (form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        let student = createStudentObject(studentNameForm.value);
        resetInputField();
        studentCards.unshift(student);
        alphabatize();
        console.log(studentCards);
        createStudentCard(studentCards);
        // adds an eventListener to each newly created expel button
        for (const expelBtn of expelBtns) {
            expelBtn.addEventListener('click', function(e){
                e.preventDefault();
                let expelledStudent = this.parentElement.parentElement.id;
                console.log("expel", this.parentElement.parentElement.id);
                expel(expelledStudent);
                firstYearForm.style.display = "block";
            })
        } 
    }else {
        studentNameForm.className += " error";
        studentNameForm.placeholder = "Please Enter A Name"
    }
});



///////////// FUNCTIONS ////////////

const printToDom = (divId, textToPrint) => {
    let selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const getRandomNum = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const resetInputField = () => {
    firstYearForm.style.display = "none";
    studentNameForm.placeholder = "Neville Longbottom";
    studentNameForm.classList.remove("error");
    studentNameForm.value = "";
}; 

console.log(getRandomNum(4));
console.log(houses[getRandomNum(4)]);

const createStudentObject = (name) => {
    let student = {};
    let house = houses[getRandomNum(4)];
    student.name = name;
    student.house = house;
    return student;
};

const createStudentCard = (array) => {
    let domString = '';
    array.forEach(student => {
        domString += `<div class="col-12 col-sm-6 col-lg-4">`;
        domString +=    `<div id="${student.name}" class="card">`;
        domString +=        `<div class="card-body ${student.house.toLowerCase()}">`;
        domString +=            `<h2 class="card-title">${student.name}</h2>`;
        domString +=            `<h4 class="card-text">${student.house}</h4>`;
        domString +=            `<a href="#" class="btn col-sm-6 btn-light expelBtn">Expel</a>`;
        domString +=        `</div>`;
        domString +=    `</div>`;
        domString += `</div>`;
    });
    printToDom("studentCards", domString);
};

const expel = (studentId) => {
    console.log("studentId:", studentId )
    console.log("studentCards:", studentCards);
    console.log(studentCards.findIndex(x => x.name === `${studentId}`));
    let expelledStudentIndex = studentCards.findIndex(x => x.name === `${studentId}`);
    let expelledStudentObject = studentCards.splice(expelledStudentIndex, 1);
    console.log("ExStObj", expelledStudentObject);
    expelledStudents.push(expelledStudentObject);
    console.log("Voldemorts Army", expelledStudents);
    let expelledStudent = document.getElementById(studentId);
    expelledStudent.style.display = "none";
    alert(`"${studentId} has been expelled from Hoggy Hoggy Warts!"`)
};

const alphabatize = () => {
    studentCards.sort(function(a, b){
       var a = a.house.toLowerCase();
     var b = b.house.toLowerCase();
       if (a < b) //sort string ascending
            return -1 
       if (a > b)
           return 1
       return 0 //default return value (no sorting)
   });
 };