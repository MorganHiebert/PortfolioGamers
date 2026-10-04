//elements
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

//open sb
openBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

//close sb
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

//form toggle 
function toggleForm() {
    var form = document.getElementById("myForm");
        if (form.style.display === "block") {
            form.style.display = "none";
        } 
        else {
            form.style.display = "block";
        }
}