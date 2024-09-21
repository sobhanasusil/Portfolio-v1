// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Modal Functionality with Accessibility
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('button.close-modal').focus(); // Focus on close button for accessibility

    // Escape key to close modal
    document.addEventListener('keydown', function escCloseHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modalId);
            document.removeEventListener('keydown', escCloseHandler); // Remove handler to avoid stacking
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => closeModal(button.dataset.modal));
});

// Form Validation Example with LocalStorage
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!email || !message) {
            alert('Please fill in all fields');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address');
        } else {
            alert('Form submitted successfully!');
            localStorage.removeItem('formData'); // Clear data on successful submission
            form.reset(); // Reset the form after submission
        }
    });

    // Save form data to LocalStorage
    form.addEventListener('input', function() {
        const formData = {
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
    });

    // Retrieve saved form data from LocalStorage
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
        document.getElementById('email').value = savedFormData.email;
        document.getElementById('message').value = savedFormData.message;
    }
}

// Email Validation Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// JavaScript for Animated Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme from LocalStorage on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    darkModeToggle.classList.add('dark');
}

// Testimonials Carousel Controls
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

document.querySelector('.carousel-control-prev').addEventListener('click', () => {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem === 0) ? carouselItems.length - 1 : currentItem - 1;
    carouselItems[currentItem].classList.add('active');
});

document.querySelector('.carousel-control-next').addEventListener('click', () => {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem === carouselItems.length - 1) ? 0 : currentItem + 1;
    carouselItems[currentItem].classList.add('active');
});

// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
