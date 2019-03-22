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
});

sortBtn.addEventListener('click', function(e){
    // checks to see if the input is not empty
    if (form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        let student = createStudentObject(studentNameForm.value);
        resetInputField();
        studentCards.unshift(student);
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

console.log(getRandomNum(3));
console.log(houses[getRandomNum(3)]);

const createStudentObject = (name) => {
    let student = {};
    let house = houses[getRandomNum(3)];
    student.name = name;
    student.house = house;
    return student;
};

const createStudentCard = (array) => {
    let domString = '';
    array.forEach(student => {
        domString += `<div id="${student.name}" class="card col-4">`;
        domString +=    `<div class="card-body">`
        domString +=        `<h3 class="card-title">${student.name}</h3>`;
        domString +=        `<h4 class="card-text">${student.house}</h4>`;
        domString +=        `<a href="#" class="btn btn-light expelBtn">Expel</a>`;
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
