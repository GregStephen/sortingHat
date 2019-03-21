const startSortBtn = document.getElementById("startSortBtn");
const firstYearForm = document.getElementById("firstYearForm");
let studentNameForm = document.getElementById("studentName");
const sortBtn = document.getElementById("sortBtn");
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const studentCards = [];

//////////////// Event Listeners ///////////////

startSortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "block";
});

sortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "none";
    let student = createStudentObject(studentNameForm.value);
    studentCards.unshift(student);
    console.log(studentCards);
    createStudentCard(studentCards);

});


///////////// FUNCTIONS ////////////

const printToDom = (divId, textToPrint) => {
    let selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const getRandomNum = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

console.log(getRandomNum(3));
console.log(houses[getRandomNum(3)]);

const createStudentObject = (name) => {
    let student = {};
    let house = houses[getRandomNum(3)];
    student.name = name;
    student.house = house;
    student.isExpelled = false;
    return student;
};

const createStudentCard = (array) => {
    let domString = '';
    array.forEach(student => {
        domString += `<div class="card col-3">`;
        domString +=    `<div class="card-body">`
        domString +=        `<h3 class="card-title">${student.name}</h3>`;
        domString +=        `<h4 class="card-text">${student.house}</h4>`;
        domString +=        `<a href="#" class="btn btn-light">Expell</a>`;
        domString +=    `</div>`;
        domString += `</div>`;
    });
    printToDom("studentCards", domString);
}


