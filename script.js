document.addEventListener('DOMContentLoaded', function () {
    // ========== EMAILJS INITIALISATIE ==========
    // EmailJS initialiseren met jouw public key
    emailjs.init("87d3x7icjWAOa-KCH"); // Vervang dit indien nodig met je juiste public key

    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function () {
        html.classList.toggle('dark');

        // Update the icon
        if (html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0070f3');
        }
    });

    // ========== MOBILE NAVIGATION ==========
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', function () {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== FORM SUBMISSION MET EMAILJS ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Button element voor feedback
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            const originalHTML = button.innerHTML;

            // Toon loading state
            button.textContent = 'Sending...';
            button.disabled = true;

            try {
                // 1. VERSTUUR NAAR JOU (Contact Us template)
                console.log('Versturen naar jou...');
                const emailToYou = await emailjs.send(
                    "service_ryo2577", // Jouw service ID
                    "template_contact_to_you", // Template voor jou
                    {
                        name: name,
                        email: email,
                        message: message,
                        from_name: name,
                        from_email: email,
                        to_email: "imadaha18_@outlook.com"
                    }
                );
                console.log('Email naar jou succesvol:', emailToYou.status);

                // 2. VERSTUUR AUTO-REPLY NAAR BEZOEKER
                console.log('Versturen auto-reply...');
                const autoReply = await emailjs.send(
                    "service_ryo2577", // Zelfde service ID
                    "template_auto_reply", // Template voor bezoeker
                    {
                        to_name: name,
                        to_email: email,
                        message: message
                    }
                );
                console.log('Auto-reply succesvol:', autoReply.status);

                // Succesmelding
                button.textContent = '✓ Message Sent!';
                button.style.backgroundColor = '#10B981'; // Groen voor succes

                // Reset form
                contactForm.reset();

                // Toon popup melding
                showNotification('Message sent successfully! You will receive a confirmation email.', 'success');

            } catch (error) {
                console.error('EmailJS Error:', error);
                button.textContent = '✗ Error - Try Again';
                button.style.backgroundColor = '#EF4444'; // Rood voor error
                showNotification('Failed to send message. Please try again later.', 'error');
            } finally {
                // Herstel button na 3 seconden
                setTimeout(() => {
                    button.textContent = originalText;
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                    button.style.backgroundColor = ''; // Reset kleur
                }, 3000);
            }
        });
    }

    // ========== NOTIFICATION FUNCTIE ==========
    function showNotification(message, type = 'success') {
        // Creëer notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;

        // Voeg toe aan body
        document.body.appendChild(notification);

        // Verwijder na 5 seconden
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // ========== SCROLL ANIMATIONS ==========
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        // Header shadow
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        // Reveal animations for sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    // Run on page load
    checkScroll();

    // Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ========== TERMINAL ANIMATION ==========
    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = document.querySelector('.terminal-content');
    const commandSpan = document.querySelector('.command-text');

    if (terminalContainer && terminalContent && commandSpan) {
        const commandText = "Thy shall be burdened with glorious purpose!";

        let i = 0;
        const typeCommand = () => {
            if (i < commandText.length) {
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            } else {
                // Add blinking cursor after typing
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };

        // Start typing after a delay
        setTimeout(typeCommand, 1000);
    } else {
        // Fallback for original terminal structure
        const terminal = document.querySelector('.terminal-body');
        if (terminal) {
            const commandText = terminal.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = '';

            let i = 0;
            const typeCommand = () => {
                if (i < commandText.length) {
                    terminal.querySelector('.command').textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                } else {
                    // Add blinking cursor after typing
                    terminal.querySelector('.command').insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
                }
            };

            // Start typing after a delay
            setTimeout(typeCommand, 1000);
        }
    }
});