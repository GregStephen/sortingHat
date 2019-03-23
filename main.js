const startSortBtn = document.getElementById("startSortBtn");
const sortBtn = document.getElementById("sortBtn");
const expelBtns = document.getElementsByClassName("expelBtn");
const form = document.getElementById("studentForm");
const error = document.getElementById("error");
const firstYearForm = document.getElementById("firstYearForm");
let studentNameForm = document.getElementById("studentName");
const modalClose = document.getElementById("modalClose");
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
let studentNum = 0;
const studentCards = [];
const expelledStudents = [];
const voldemortsArmy = document.getElementById("armyHeader");
const sortByHouseBtn = document.getElementById("houseBtn");
const sortByNameBtn = document.getElementById("nameBtn");

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
        console.log("namerdio", sortByNameBtn.checked)
        console.log("houserdio", sortByHouseBtn.checked)
        if (sortByNameBtn.checked = true) {
            alphabetize("name");
        } else {
            alphabetize("house");
        }
        createStudentCard(studentCards, "studentCards");
        // adds an eventListener to each newly created expel button
        addExpelClickListen();
    } else {
        studentNameForm.className += " error";
        studentNameForm.placeholder = "Please Enter A Name"
    }
});

modalClose.addEventListener('click', function(e){
    e.preventDefault();
    voldemortsArmy.style.display = "block";
    createStudentCard(studentCards, "studentCards");
    createStudentCard(expelledStudents, "voldemortsArmy");
    firstYearForm.style.display = "block"; 
    addExpelClickListen();
});

///////////// FUNCTIONS ////////////

const addExpelClickListen = () => {
    for (const expelBtn of expelBtns) {
        expelBtn.addEventListener('click', function(e){
            e.preventDefault();
            let expelledStudent = this.parentElement.parentElement.id;
            console.log("expelledStd", expelledStudent)
            expel(expelledStudent);
        })
    } 
};

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

const createStudentObject = (name) => {
    studentNum += 1;
    let student = {};
    let house = houses[getRandomNum(4)];
    student.id = studentNum.toString();
    student.name = name;
    student.house = house;
    return student;
};

const createStudentCard = (array, divId) => {
    let domString = '';
    array.forEach(student => {
        domString += `<div class="col-12 col-sm-6 col-lg-4">`;
        domString +=    `<div id="${student.id}" class="card">`;
        domString +=        `<div class="card-body ${student.house.toLowerCase()}">`;
        domString +=            `<h2 class="card-title">${student.name}</h2>`;
        domString +=            `<h4 class="card-text">${student.house}</h4>`;
        domString +=            `<a href="#" data-toggle="modal" data-target="#areYouSureModal" class="btn col-sm-6 btn-light expelBtn">Expel</a>`;
        domString +=        `</div>`;
        domString +=    `</div>`;
        domString += `</div>`;
    });
    printToDom(divId, domString);
};

const expel = (studentId) => {
    let expelledStudentIndex = studentCards.findIndex(x => x.id === `${studentId}`);
    console.log ("index", expelledStudentIndex);
    let expelledStudentArray = studentCards.splice(expelledStudentIndex, 1);
    console.log("obj", expelledStudentArray[0]);
    let expelledStudentObj = expelledStudentArray[0];
    createModalBody(expelledStudentObj);
    expelledStudentObj.house = "Voldemorts"; 
    expelledStudents.push(expelledStudentObj);
};

const alphabetize = (key) => {
    studentCards.sort(function(a, b){
        var a = a[key].toLowerCase();
        var b = b[key].toLowerCase();
        if (a < b) 
            return -1 
        if (a > b)
            return 1
        return 0 
    });
 };

 const createModalBody = (student) => {
    let domString = "";
    console.log("student", student);
    if (student.house === "Slytherin"){
        domString += `<h3>${student.name} has been expelled from Hoggy Hoggy Warts!</h3>`;
        domString += `<h4>200 points have been deducted from ${student.house}!</h4>`;
        domString += `<hr>`
        domString += `<h6>Oh! ${student.house}! Who would have guessed!?</h6>`;
    } else {
    domString += `<h3>${student.name} has been expelled from Hoggy Hoggy Warts!</h3>`;
    domString += `<h3>200 points have been deducted from ${student.house}!</h3>`;
    }
    printToDom("expelledMessage", domString);
 }