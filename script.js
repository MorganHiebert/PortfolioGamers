//elements
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

//open sb
if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

//close sb
if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

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


//background count and routing
document.addEventListener("DOMContentLoaded", () => {
    
    //find choice buttons
    const choiceButtons = document.querySelectorAll('.choice-btn');

    //on click for each button
    choiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
           //which one was clicked
            const clickedButton = event.currentTarget;

            //where you are going
            const destination = clickedButton.getAttribute('data-route');
            const pointModifier = parseInt(clickedButton.getAttribute('data-points')) || 0;

            //calculate score
            let currentCount = parseInt(localStorage.getItem('myCounter')) || 0;
            currentCount += pointModifier;
            localStorage.setItem('myCounter', currentCount);

            //page redirect
            if (destination) {
                window.location.href = destination;
            } else {
                console.error("Error: This button is missing a 'data-route' attribute!");
            }
        });
    });
});
