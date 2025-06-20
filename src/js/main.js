document.addEventListener('DOMContentLoaded', function () {
    const datePicker = new DatePicker('.datepicker-input');

    const form = document.querySelector('.form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value
        };

        if (validateForm(formData)) {
            console.log('Form ma\'lumotlari:', formData);
            alert('Form muvaffaqiyatli yuborildi!');

            form.reset();
            datePicker.selectedDate = null;
        }
    });

    document.getElementById('date').addEventListener('dateSelected', function (e) {
        console.log('Tanlangan sana:', e.detail.date);
    });

    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('form__group--focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.parentElement.classList.remove('form__group--focused');
            }
        });
    });
});

function validateForm(data) {
    let isValid = true;

    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak');
        isValid = false;
    } else {
        clearError('name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'To\'g\'ri email manzilini kiriting');
        isValid = false;
    } else {
        clearError('email');
    }

    if (!data.date) {
        showError('date', 'Sanani tanlang');
        isValid = false;
    } else {
        clearError('date');
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const group = field.parentElement;

    clearError(fieldId);

    const errorElement = document.createElement('span');
    errorElement.className = 'form__error';
    errorElement.textContent = message;

    group.appendChild(errorElement);
    field.classList.add('form__input--error');
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const group = field.parentElement;
    const errorElement = group.querySelector('.form__error');

    if (errorElement) {
        errorElement.remove();
    }

    field.classList.remove('form__input--error');
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

function toggleMobileNav() {
    const nav = document.querySelector('.header__nav');
    nav.classList.toggle('header__nav--active');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(function () {
    const nav = document.querySelector('.header__nav');
    if (nav && nav.classList.contains('header__nav--active')) {
        nav.classList.remove('header__nav--active');
    }
}, 250));
