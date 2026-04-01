/*========== menu icon navbar ==========*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const darkModeIcon = document.querySelector('#darkMode-icon');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const phoneDialogLink = document.querySelector('#phone-dialog-link');
const addressDialogLink = document.querySelector('#address-dialog-link');
const phoneDialog = document.querySelector('#phone-dialog');
const addressDialog = document.querySelector('#address-dialog');
const dialogPairs = [
    {
        trigger: phoneDialogLink,
        dialog: phoneDialog,
        close: document.querySelector('#phone-dialog-close'),
        cancel: document.querySelector('#phone-dialog-cancel'),
    },
    {
        trigger: addressDialogLink,
        dialog: addressDialog,
        close: document.querySelector('#address-dialog-close'),
        cancel: document.querySelector('#address-dialog-cancel'),
    },
];

menuIcon.onclick = () => {
    menuIcon.querySelector('i').classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========== scroll sections active link ==========*/
window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (id && top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*========== sticky navbar ==========*/
    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    menuIcon.querySelector('i').classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*========== swiper ==========*/
if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

/*========== dark light mode ==========*/
darkModeIcon.onclick = () => {
    darkModeIcon.querySelector('i').classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

const openDialog = dialog => {
    if (!dialog) {
        return;
    }

    dialog.classList.add('active');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeDialog = dialog => {
    if (!dialog) {
        return;
    }

    dialog.classList.remove('active');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

dialogPairs.forEach(({ trigger, dialog, close, cancel }) => {
    if (trigger && dialog) {
        trigger.addEventListener('click', event => {
            event.preventDefault();
            openDialog(dialog);
        });
    }

    if (close && dialog) {
        close.addEventListener('click', () => closeDialog(dialog));
    }

    if (cancel && dialog) {
        cancel.addEventListener('click', () => closeDialog(dialog));
    }

    if (dialog) {
        dialog.addEventListener('click', event => {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    }
});

document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') {
        return;
    }

    dialogPairs.forEach(({ dialog }) => {
        if (dialog && dialog.classList.contains('active')) {
            closeDialog(dialog);
        }
    });
});

/*========== scroll reveal ==========*/
ScrollReveal({
    reset: false,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .resume-grid, .contact-details, .motion-channel, .motion-video-card', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content, .portfolio-intro', { origin: 'right' });
