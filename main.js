const startSortBtn = document.getElementById("startSortBtn");
const firstYearForm = document.getElementById("firstYearForm");

startSortBtn.addEventListener('click', function(e){
    e.preventDefault();
    firstYearForm.style.display = "block";
});
