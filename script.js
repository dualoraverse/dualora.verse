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
    },
    {
        id: 4,
        title: 'Her\'s first Hero!',
        imageUrl: 'POS_4.png',
        alt: 'Her\'s first Hero!'
    },
    {
        id: 5,
        title: 'AK the Aura❤️‍🔥🏁!',
        imageUrl: 'POS_5.png',
        alt: 'AK the Aura❤️‍🔥🏁!'
    },
    {
        id: 6,
        title: 'Elemental 🫧🫠',
        imageUrl: 'POS_6.png',
        alt: 'Elemental 🫧🫠'
    }
];

let posters = JSON.parse(localStorage.getItem('posters'));
if (!posters || posters.length === 0) {
    posters = [...defaultPosters];
}

const savePosters = () => {
    localStorage.setItem('posters', JSON.stringify(posters));
};

// Sync missing default posters to localStorage to ensure newly added posters show up
if (posters && posters.length > 0) {
    let isModified = false;
    defaultPosters.forEach(dp => {
        if (!posters.some(p => p.imageUrl === dp.imageUrl)) {
            posters.push(dp);
            isModified = true;
        }
    });
    if (isModified) savePosters();
}

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

    // Zoom Feature Logic
    const imageModal = document.getElementById('image-modal');
    const zoomImage = document.getElementById('expanded-image');
    const imageModalClose = document.getElementById('image-modal-close');

    const attachZoomListeners = () => {
        const posterImages = document.querySelectorAll('.poster-image');
        posterImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                zoomImage.src = img.src;
                imageModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });
    };

    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => {
            imageModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    const renderPosters = () => {
        galleryContainer.innerHTML = '';
        posters.forEach(poster => {
            const card = document.createElement('div');
            card.className = 'poster-card';

            card.innerHTML = `
                <div class="image-container">
                    <img src="${poster.imageUrl}" alt="${poster.alt}" class="poster-image" loading="lazy">
                    <div class="card-overlay">
                        <div class="overlay-actions">
                            <button class="btn-order" data-title="${poster.title}" aria-label="Order ${poster.title}">
                                Order <i class="fab fa-instagram"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${poster.title}</h3>
                </div>
            `;

            galleryContainer.appendChild(card);
        });

        attachOrderListeners();
        attachZoomListeners();
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
