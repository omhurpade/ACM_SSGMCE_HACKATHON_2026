document.addEventListener('DOMContentLoaded', () => {
    console.log('Hackathon website loaded');

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass');
        } else {
            header.classList.remove('glass');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Countdown Timer
    const countdownDate = new Date("Mar 7, 2026 09:00:00").getTime();

    // Create timer elements if they don't exist (append to hero content)
    const heroContent = document.querySelector('.hero-content');
    const timerContainer = document.createElement('div');
    timerContainer.className = 'countdown-timer';
    timerContainer.style.display = 'flex';
    timerContainer.style.gap = '20px';
    timerContainer.style.justifyContent = 'center';
    timerContainer.style.marginTop = '30px';
    timerContainer.style.marginBottom = '30px';

    ['Days', 'Hours', 'Minutes', 'Seconds'].forEach(unit => {
        const unitDiv = document.createElement('div');
        unitDiv.style.textAlign = 'center';
        unitDiv.innerHTML = `
            <div id="${unit.toLowerCase()}" style="font-size: 2.5rem; font-weight: bold; color: #ffffff; font-family: 'Orbitron', sans-serif;">00</div>
            <div style="font-size: 0.8rem; text-transform: uppercase;">${unit}</div>
        `;
        timerContainer.appendChild(unitDiv);
    });

    // Insert after the date paragraph
    const datePara = heroContent.querySelector('p');
    heroContent.insertBefore(timerContainer, datePara.nextSibling);

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(updateTimer);
            timerContainer.innerHTML = "<div style='font-size: 2rem; color: #ffffff;'>Event Started!</div>";
        }
    }, 1000);
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

    // Mobile Menu Toggle (Basic implementation)
    // Create hamburger icon
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.display = 'none'; // Hidden on desktop by CSS media query usually, but we'll control via js/css mix

    // Add logic to show/hide based on screen size could be done in CSS, but let's add the element
    nav.insertBefore(hamburger, nav.querySelector('.btn'));

    // Mobile specific styles injection for hamburger
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .hamburger { display: block !important; }
            .nav-links { 
                position: fixed; 
                top: 80px; 
                right: -100%; 
                width: 100%; 
                height: calc(100vh - 80px); 
                background: rgba(10, 10, 10, 0.95); 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                transition: right 0.3s ease; 
                backdrop-filter: blur(10px);
            }
            .nav-links.active { right: 0; }
            .nav-links li { margin: 20px 0; }
            .nav-links a { font-size: 1.5rem; }
            nav .btn { display: none; } /* Hide register button in nav on mobile for space, or move it to menu */
        }
    `;
    document.head.appendChild(style);

    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when nk clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // Scroll Animation Observer
    const revealElements = document.querySelectorAll('.card, .section-padding h2, .timeline-item');

    // Add reveal class to elements
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Chatbot Logic
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat
    if (chatbotFab) {
        chatbotFab.addEventListener('click', () => {
            chatbotContainer.classList.add('active');
            chatbotFab.style.display = 'none';
            chatInput.focus();
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
            chatbotFab.style.display = 'flex';
        });
    }

    // Send Message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add User Message
        addMessage(message, 'user-message');
        chatInput.value = '';

        // Bot Response
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addMessage(response, 'bot-message');
        }, 500);
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        if (input.includes('schedule') || input.includes('time') || input.includes('when')) {
            return "The hackathon starts on March 7th at 9:00 AM and ends on March 8th. Check the Schedule section for details!";
        } else if (input.includes('prize') || input.includes('win') || input.includes('reward')) {
            return "1st Place: 3,000 + Swag Kits. 2nd Place: 2,000. 3rd Place: 1,000. All participants get certificates!";
        } else if (input.includes('track') || input.includes('theme') || input.includes('topic')) {
            return "We have tracks for AI/ML, Web 3.0, HealthTech, Green Tech, Game Dev, and Open Innovation.";
        } else if (input.includes('register') || input.includes('sign up') || input.includes('join')) {
            return "You can register by clicking the 'Register Now' button at the top right!";
        } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return "Hello there! Ready to hack? Ask me anything about TechNova 2026.";
        } else {
            return "I'm not sure about that. Try asking about schedule, prizes, tracks, or registration.";
        }
    }

});
