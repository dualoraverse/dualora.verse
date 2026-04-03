// Poster Data Collection
const defaultPosters = [];

let posters = JSON.parse(localStorage.getItem('posters')) || defaultPosters;

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

    const attachDeleteListeners = () => {
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                if (confirm('Are you sure you want to delete this poster?')) {
                    const index = posters.findIndex(p => p.id === id);
                    if (index > -1) {
                        posters.splice(index, 1);
                        savePosters();
                        renderPosters();
                    }
                }
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
                    <button class="btn-delete" data-id="${poster.id}" aria-label="Delete poster">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${poster.title}</h3>
                    <div class="card-footer">
                        <span class="price">${poster.price}</span>
                        <button class="btn-order" data-title="${poster.title}" aria-label="Order ${poster.title}">
                            Order Now <i class="fab fa-instagram"></i>
                        </button>
                    </div>
                </div>
            `;

            galleryContainer.appendChild(card);
        });

        attachOrderListeners();
        attachDeleteListeners();
    };

    // Initial Render
    renderPosters();

    // Modal Logic
    const modal = document.getElementById('add-photo-modal');
    const addPhotoBtn = document.getElementById('add-photo-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelPhotoBtn = document.getElementById('cancel-photo');
    const submitPhotoBtn = document.getElementById('submit-photo');

    const titleInput = document.getElementById('poster-title');
    const priceInput = document.getElementById('poster-price');
    const urlInput = document.getElementById('poster-url');

    const openModal = () => {
        modal.classList.add('show');
        titleInput.value = '';
        priceInput.value = '₹99';
        urlInput.value = '';
        titleInput.focus();
    };

    const closeModalFunc = () => {
        modal.classList.remove('show');
    };

    if (addPhotoBtn) {
        addPhotoBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalFunc);
    if (cancelPhotoBtn) cancelPhotoBtn.addEventListener('click', closeModalFunc);

    // Close on clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    if (submitPhotoBtn) {
        submitPhotoBtn.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const price = priceInput.value.trim() || '₹99';
            const imageUrl = urlInput.value.trim();

            if (!title || !imageUrl) {
                alert('Please enter a valid title and image URL');
                return;
            }

            // Add to array
            posters.unshift({
                id: Date.now(),
                title: title,
                price: price,
                imageUrl: imageUrl,
                alt: title
            });
            savePosters();

            // Refresh UI
            renderPosters();
            closeModalFunc();
        });
    }

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
