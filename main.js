const startSortBtn = document.getElementById("startSortBtn");
const firstYearForm = document.getElementById("firstYearForm");
let studentNameForm = document.getElementById("studentName");
const sortBtn = document.getElementById("sortBtn");
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
let student = {};
const studentCards = [];

//////////////// Event Listeners ///////////////

startSortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "block";
});

sortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "none";
    createStudentObject(studentNameForm.value);
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
    let house = houses[getRandomNum(3)];
    student.name = name;
    student.house = house;
    student.isExpelled = false;
    
};

const createStudentCard = (array) => {
    let domString = '';
    array.forEach(student => {
        domString += `<div>`;
        domString += `<h2>${student.name}</h2>`;
        domString += `<h2>${student.house}</h2>`;
        domString += `<h2>${student.isExpelled}</h2>`;
        domString += `</div>`;
    });
    printToDom("studentCards", domString);
}


