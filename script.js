
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
                //JQUERY: Fade out the story before navigating when jQuery is available
                const story = document.querySelector('.dynamic-bg main');

                if (story && window.jQuery) {
                    event.preventDefault();

                    $(story).fadeOut(250, function () {
                        window.location.href = destination;
                    });
                } else {
                    window.location.href = destination;
                }
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

            // JQUERY: Show a notification when a favourite changes
            if (window.jQuery) {
                const message = index > -1
                    ? 'Removed from favourites.'
                    : 'Added to favourites!';

                let notice = $('#favorite-notice');

                if (!notice.length) {
                    notice = $('<div>', {
                        id: 'favorite-notice',
                        role: 'status',
                        'aria-live': 'polite'
                    }).appendTo('body');
                }

                notice.stop(true, true)
                    .text(message)
                    .fadeIn(200)
                    .delay(1200)
                    .fadeOut(300);
            }
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

/*

this code creates a trail effect that follows the mouse cursor. 
It generates a series of div elements that represent the trail particles, 
and their positions are updated based on the mouse movement. The opacity 
and size of each particle decrease as they get further from the cursor, 
creating a fading trail effect.

*/


// ==========================================================================
// JQUERY Stuff
// ==========================================================================

// JQUERY: Check that jQuery is loaded before using it
if (window.jQuery) {

    $(document).ready(function () {

        // JQUERY:  Animate the sidebar when opening and closing
        $('#open-btn').on('click.jquerySidebar', function () {
            $('#sidebar').stop(true, true).slideDown(300);
        });

        $('#close-btn').on('click.jquerySidebar', function () {
            $('#sidebar').stop(true, true).slideUp(300);
        });


        // JQUERY:  Update the appearance of favourite buttons
        // The original js still manages saved favourites.
        $('.fav-btn').each(function () {
            $(this).attr(
                'aria-pressed',
                $(this).hasClass('active') ? 'true' : 'false'
            );
        });

        $('.fav-btn').on('click.jqueryFavorites', function () {
            const button = this;

            // Wait until the original favourite handler updates the class.
            setTimeout(function () {
                $(button).attr(
                    'aria-pressed',
                    $(button).hasClass('active') ? 'true' : 'false'
                );
            }, 0);
        });


        // JQUERY: Fade in story content when the page loads
        $('.dynamic-bg main').stop(true, true).hide().fadeIn(300);


        // JQUERY: 4. Add a search box to filter game cards
        if ($('#game-search').length === 0 && $('.game-card').length > 0) {
            $('<input>', {
                id: 'game-search',
                type: 'search',
                placeholder: 'Search games...',
                'aria-label': 'Search games'
            }).insertBefore($('.game-card').first().parent());
        }

        $('#game-search').on('input', function () {
            const query = $(this).val().toLowerCase().trim();

            $('.game-card').each(function () {
                const title = $(this).find('.button-text')
                    .text()
                    .toLowerCase();

                $(this).toggle(title.includes(query));
            });
        });

    });

}
