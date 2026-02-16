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
    if (header) { // Safety check for header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('glass');
            } else {
                header.classList.remove('glass');
            }
        });
    }


    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        console.log('FAQ items found:', faqItems.length);
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        });
    } else {
        console.warn('No FAQ items found');
    }

    // Countdown Timer
    const countdownDate = new Date("Mar 7, 2026 09:00:00").getTime();

    // Create timer elements if they don't exist (append to hero content)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
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
        if (datePara) {
            heroContent.insertBefore(timerContainer, datePara.nextSibling);
        } else {
            heroContent.appendChild(timerContainer);
        }

        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const dEl = document.getElementById('days');
            const hEl = document.getElementById('hours');
            const mEl = document.getElementById('minutes');
            const sEl = document.getElementById('seconds');

            if (dEl) dEl.innerText = String(days).padStart(2, '0');
            if (hEl) hEl.innerText = String(hours).padStart(2, '0');
            if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
            if (sEl) sEl.innerText = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(updateTimer);
                timerContainer.innerHTML = "<div style='font-size: 2rem; color: #ffffff;'>Event Started!</div>";
            }
        }, 1000);
    }

    // Mobile Menu Toggle
    const nav = document.querySelector('nav');
    const navLinksContainer = document.querySelector('.nav-links');

    if (nav && navLinksContainer) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        // Styling handled in CSS now

        const btnForInsert = nav.querySelector('.btn');
        if (btnForInsert) {
            nav.insertBefore(hamburger, btnForInsert);
        } else {
            nav.appendChild(hamburger);
        }


        function toggleMobileMenu() {
            navLinksContainer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) { // Safety check for icon
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }

        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Unified Navigation Logic
    const homeView = document.getElementById('home-view');
    const teamView = document.getElementById('team-view');
    const navLinksList = document.querySelectorAll('.nav-links a');
    const logoLink = document.querySelector('.logo a');

    if (homeView && teamView && navLinksList.length > 0) { // Safety check for navigation elements
        // Make functions global or accessible if needed, but here simple closure is fine
        function showView(viewName) {
            console.log('Switching to view:', viewName); // Debug log
            if (!homeView || !teamView) return;

            // Hide/Show Views
            if (viewName === 'team') {
                homeView.classList.add('hidden');
                teamView.classList.remove('hidden');
                window.scrollTo(0, 0);

                // Load Team Content if not loaded
                if (!teamView.hasChildNodes() || teamView.innerHTML.includes('Failed to load')) {
                    console.log('Fetching team.html...'); // Debug log
                    fetch('team.html')
                        .then(response => {
                            console.log('Fetch response:', response.status); // Debug log
                            if (!response.ok) throw new Error('Failed to load team content');
                            return response.text();
                        })
                        .then(html => {
                            console.log('Team content loaded'); // Debug log
                            teamView.innerHTML = html;
                            // Re-initialize observers for new content
                            const newCards = teamView.querySelectorAll('.card');
                            newCards.forEach(card => {
                                card.classList.add('reveal');
                                if (typeof revealObserver !== 'undefined') revealObserver.observe(card);

                                // Add Tilt Effect
                                card.addEventListener('mousemove', (e) => {
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = ((y - centerY) / centerY) * -10;
                                    const rotateY = ((x - centerX) / centerX) * 10;
                                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                                });
                                card.addEventListener('mouseleave', () => {
                                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                                });
                            });
                        })
                        .catch(error => {
                            console.error('Error loading team page:', error);
                            teamView.innerHTML = '<div class="container"><h2 style="text-align:center;color:white;margin-top:50px;">Failed to load Team content.<br>If you are opening this file locally, browsers block this for security.<br>Please use "Live Server" or host on GitHub.</h2></div>';
                        });
                }

            } else {
                teamView.classList.add('hidden');
                homeView.classList.remove('hidden');

                // Handle Scrolling for Home Sections
                if (viewName.startsWith('#')) {
                    // If it's just #, don't scroll
                    if (viewName === '#') return;

                    const section = document.querySelector(viewName);
                    if (section) {
                        // Timeout to ensure display:none is removed before calculating scroll
                        setTimeout(() => {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }, 10);
                    }
                } else if (viewName === 'home') {
                    window.scrollTo(0, 0);
                }
            }
        }

        // Attach Click Handlers to All Nav Links
        navLinksList.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                // Close mobile menu if open
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    // We need to access toggle function or cleaner logic.
                    // Since toggle is scoped, let's just manipulate class directly here or move function out.
                    // Simple fix: trigger click on hamburger if visible? Or just remove class
                    navLinksContainer.classList.remove('active');
                    const hamburger = document.querySelector('.hamburger i');
                    if (hamburger) {
                        hamburger.classList.remove('fa-times');
                        hamburger.classList.add('fa-bars');
                    }
                }

                // Route
                if (href === '#team') {
                    showView('team');
                } else {
                    showView(href);
                }
            });
        });

        // Handle Logo Click
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                showView('home');
            });
        }
    }

    const revealElements = document.querySelectorAll('.card, .section-padding h2, .timeline-item');
    if (revealElements.length > 0) { // Safety check for reveal elements
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
    }

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) { // Safety check for cards
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
    }

    // Chatbot Logic
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotFab && chatbotContainer) {
        console.log('Chatbot elements found');
        // Toggle Chat
        chatbotFab.addEventListener('click', () => {
            console.log('Chatbot FAB clicked');
            chatbotContainer.classList.add('active');
            chatbotFab.style.display = 'none';
            if (chatInput) chatInput.focus();
        });

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatbotContainer.classList.remove('active');
                chatbotFab.style.display = 'flex';
            });
        }

        // Send Message
        function sendMessage() {
            if (!chatInput) return;
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
            if (!chatMessages) return;
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
    } else {
        console.error('Chatbot elements not found');
    }

});
