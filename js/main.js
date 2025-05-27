// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio items data
const portfolioItems = [
    {
        image: 'images/tribal.webp',
        title: 'Arte Tribal',
        description: 'Design tribal personalizado'
    },
    {
        image: 'images/realista.jpg',
        title: 'Realismo',
        description: 'Retrato realista em preto e cinza'
    },
    {
        image: 'images/aquarela.jpg',
        title: 'Aquarela',
        description: 'Técnica de aquarela moderna'
    }
    // Add more portfolio items as needed
];

// Populate portfolio grid
const portfolioGrid = document.querySelector('.portfolio-grid');

function createPortfolioItems() {
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all portfolio items
function observePortfolioItems() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        observer.observe(item);
    });
}

// Form submission handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('.submit-button');
const originalButtonText = submitButton.textContent;

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mudar o texto do botão para indicar carregamento
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Sucesso
            contactForm.reset();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        } else {
            // Erro do servidor
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    } finally {
        // Restaurar o botão
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createPortfolioItems();
    observePortfolioItems();
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
}); 