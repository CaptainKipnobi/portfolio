document.addEventListener('DOMContentLoaded', function () {
    // Initialiseer EmailJS
    emailjs.init("87d3x7icjWAOa-KCH"); // Vervang dit met je public key

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    }

    themeToggle.addEventListener('click', function () {
        html.classList.toggle('dark');
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

    // Mobile navigation toggle
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

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Form submission handling met EmailJS
    // Form submission handling met EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.textContent = 'Sending...';
            button.disabled = true;

            // Eerste: Verstuur email naar JOU (nieuw contact bericht)
            emailjs.send("service_ryo2577", "template_8dg1nw7", { // PAS DIT AAN
                name: name,                // ((name)) in jouw template
                email: email,              // ((email)) in jouw template
                message: message,          // ((message)) in jouw template
                from_name: name,           // Extra voor consistentie
                from_email: email,         // Extra voor consistentie
                to_email: "imadaha18_@outlook.com" // Jouw email
            }).then(() => {
                console.log("Notification email sent to you successfully.");

                // Tweede: Verstuur auto-reply naar BEZOEKER
                return emailjs.send("service_ryo2577", "template_8h3dp7f", { // PAS DIT AAN
                    to_name: name,          // (name) in auto-reply template
                    to_email: email,        // Gebruiker's email
                    message: message        // Inhoud van hun bericht
                });

            }).then(() => {
                console.log("Confirmation email sent to user successfully.");
                button.textContent = 'Message Sent!';
                contactForm.reset();

                // Laat een succesmelding zien
                alert('Thank you! Your message has been sent. You will receive a confirmation email shortly.');


            }).finally(() => {
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            });
        });
    }

    // Scroll events voor header shadow en reveal animaties
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

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
    checkScroll();

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terminal animatie
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
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };
        setTimeout(typeCommand, 1000);
    } else {
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
                    terminal.querySelector('.command').insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
                }
            };
            setTimeout(typeCommand, 1000);
        }
    }
});
