// ==========================================================================
// 1. SIDEBAR NAVIGATION CONTROLS
// ==========================================================================
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

// open sidebar and render updated links
if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        updateSidebarFavorites(); // refresh sidebar 
    });
}

// close sidebar
if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// form visibility toggle functionality 
function toggleForm() {
    var form = document.getElementById("myForm");
    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}


// ==========================================================================
// 2. CHOICE BUTTONS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const choiceButtons = document.querySelectorAll('.choice-btn');

    choiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const clickedButton = event.currentTarget;
            const destination = clickedButton.getAttribute('data-route');
            const pointModifier = parseInt(clickedButton.getAttribute('data-points')) || 0;

            let currentCount = parseInt(localStorage.getItem('myCounter')) || 0;
            currentCount += pointModifier;
            localStorage.setItem('myCounter', currentCount);

            if (destination) {
                window.location.href = destination;
            } else {
                console.error("Error: This button is missing a 'data-route' attribute!");
            }
        });
    });
});


// ==========================================================================
// 3.SIDEBAR LOGIC
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    const gameCards = document.querySelectorAll('.game-card');

    // make sure sidebar lists match storage immediately when loading the page
    updateSidebarFavorites();

    gameCards.forEach(card => {
        const gameId = card.getAttribute('data-id');
        const favBtn = card.querySelector('.fav-btn');

        // safety check to ensure button element markup exists
        if (!favBtn) return;

        // check active states on load
        if (favorites.some(fav => fav.id === gameId)) {
            favBtn.textContent = '♥';
            favBtn.classList.add('active');
        }

        favBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            event.stopPropagation(); 

            // get structural metadata out of  HTML card nodes
            const gameTitle = card.querySelector('.button-text').textContent;
            const gameUrl = card.getAttribute('href');

            // find match index using object array comparison
            const index = favorites.findIndex(fav => fav.id === gameId);

            if (index > -1) {
                favorites.splice(index, 1);
                favBtn.textContent = '♡';
                favBtn.classList.remove('active');
            } else {
                // save an object containing metadata 
                favorites.push({ id: gameId, title: gameTitle, url: gameUrl });
                favBtn.textContent = '♥';
                favBtn.classList.add('active');
            }

            localStorage.setItem('myFavorites', JSON.stringify(favorites));
            updateSidebarFavorites(); // dynamic runtime UI redraw
        });
    });
});

// structural helper function to build dynamic anchors inside sidebar menu
function updateSidebarFavorites() {
    const sidebarNav = document.querySelector('.sidebar-links');
    if (!sidebarNav) return;

    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

    // clear previous elements so lists don't append duplicates
    sidebarNav.innerHTML = '';

    if (favorites.length === 0) {
        sidebarNav.innerHTML = '<p style="padding: 15px 25px; color: #888; font-size: 14px;">No favorites added yet.</p>';
        return;
    }

    // loop through list arrays and inject them directly into your pop-out layout wrapper
    favorites.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = `♥ ${item.title}`;
        // I love these little hearts, they are so cute
        sidebarNav.appendChild(link);
    });
}


//unit 4 other persons code stuff
//https://effect-labs.com/en/pages/blog/curseur-personnalise-js.html
//2.) trail effect

const trailLength = 20;
const trails = [];

// Create trail elements
for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail-particle';
    trail.style.opacity = 1 - (i / trailLength);
    trail.style.width = (12 - (i * 0.5)) + 'px';
    trail.style.height = trail.style.width;
    document.body.appendChild(trail);
    trails.push({ el: trail, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let x = mouseX, y = mouseY;

    trails.forEach((trail, i) => {
        const nextX = x;
        const nextY = y;

        trail.el.style.left = trail.x + 'px';
        trail.el.style.top = trail.y + 'px';

        x = trail.x;
        y = trail.y;

        trail.x += (nextX - trail.x) * 0.35;
        trail.y += (nextY - trail.y) * 0.35;
    });

    requestAnimationFrame(animateTrail);
}
animateTrail();