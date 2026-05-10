// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});
// Also immediately trigger for currently visible elements
setTimeout(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
}, 100);

// Navbar transition on scroll
const navbar = document.querySelector('.nav-container');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Button Ripple Effect
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;

        let ripples = document.createElement('span');
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;
        ripples.classList.add('ripple-effect');
        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 600);
    });
});


// Form Handlers
function handleCorporateForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('corp-name').value;
    const company = document.getElementById('corp-company').value;
    const btn = e.target.querySelector('button[type="submit"]');
    
    // Simulate API request
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Processing...';
    lucide.createIcons();
    btn.disabled = true;

    setTimeout(() => {
        alert(`Thank you, ${name}! Your requirements for ${company} have been securely sent.\nOur intelligent matching system is already parsing your needs.`);
        e.target.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

function updateFileName(input) {
    const fileMessage = input.previousElementSibling;
    if (input.files && input.files.length > 0) {
        fileMessage.textContent = input.files[0].name;
        input.parentElement.classList.add('active');
    } else {
        fileMessage.textContent = "Click here to upload your PDF or DOC";
        input.parentElement.classList.remove('active');
    }
}

function handleSeekerForm(e) {
    e.preventDefault();
    
    const email = document.getElementById('seeker-email').value;
    const resumeObj = document.getElementById('seeker-resume').files[0];
    const btn = e.target.querySelector('button[type="submit"]');

    if (!resumeObj) {
        alert("Please upload your resume to enter the network.");
        return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Uploading...';
    lucide.createIcons();
    btn.disabled = true;

    setTimeout(() => {
        alert(`Success! Resume ${resumeObj.name} is uploaded to the HireLinkin neural network.\nWe will notify ${email} with your first tier-1 match.`);
        e.target.reset();
        
        const fileMessage = document.querySelector('.file-message');
        if(fileMessage) fileMessage.textContent = "Click here to upload your PDF or DOC";
        const dropArea = document.querySelector('.file-drop-area');
        if(dropArea) dropArea.classList.remove('active');
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1800);
}
