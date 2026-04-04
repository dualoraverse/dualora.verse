// Poster Data Collection
const defaultPosters = [
    {
        id: 1,
        title: 'Origin of Her Courage',
        imageUrl: 'POS_1.png',
        alt: 'Origin of Her Courage'
    },
    {
        id: 2,
        title: 'Aesthetic Poster',
        imageUrl: 'POS_2.png',
        alt: 'Aesthetic Poster'
    },
    {
        id: 3,
        title: 'Love quotes💗🫠!',
        imageUrl: 'POS_3.png',
        alt: 'Love quotes💗🫠!'
    }
];

let posters = JSON.parse(localStorage.getItem('posters'));
if (!posters || posters.length === 0) {
    posters = [...defaultPosters];
}

const savePosters = () => {
    localStorage.setItem('posters', JSON.stringify(posters));
};

// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

const switchTheme = () => {
    if (htmlElement.classList.contains('light-mode')) {
        htmlElement.classList.remove('light-mode');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.classList.add('light-mode');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
};

// Check for saved theme preference
if (localStorage.getItem('theme') === 'light') {
    htmlElement.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
}

themeToggleBtn.addEventListener('click', switchTheme);

// Ordering Configuration (Under construction)

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    const attachOrderListeners = () => {
        const orderButtons = document.querySelectorAll('.btn-order');
        orderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const instaUrl = "https://www.instagram.com/dualora.verse?igsh=YzlsNHlueW9kbzhr";
                window.open(instaUrl, '_blank');
            });
        });
    };



    const renderPosters = () => {
        galleryContainer.innerHTML = '';
        posters.forEach(poster => {
            const card = document.createElement('div');
            card.className = 'poster-card';

            card.innerHTML = `
                <div class="image-container">
                    <img src="${poster.imageUrl}" alt="${poster.alt}" class="poster-image" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${poster.title}</h3>
                    <div class="card-footer">
                        <button class="btn-order" data-title="${poster.title}" aria-label="Order ${poster.title}">
                            Order Now <i class="fab fa-instagram"></i>
                        </button>
                    </div>
                </div>
            `;

            galleryContainer.appendChild(card);
        });

        attachOrderListeners();
    };

    // Initial Render
    renderPosters();



    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
