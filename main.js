document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 100);
        }
    });
    
    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (backToTop) {
            backToTop.classList.toggle('active', window.scrollY > 300);
        }
    });
    
    // Loan simulator
    const loanValueInput = document.getElementById('loan-value');
    const loanTermInput = document.getElementById('loan-term');
    const loanValueDisplay = document.getElementById('loan-value-display');
    const loanTermDisplay = document.getElementById('loan-term-display');
    const simulatorForm = document.getElementById('credit-simulator');
    const simulationResult = document.getElementById('simulation-result');
    const whatsappBtn = document.getElementById('whatsapp-simulator');

    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
    function updateLoanValue(value) { loanValueDisplay.textContent = formatCurrency(value); }
    function updateLoanTerm(value) { loanTermDisplay.textContent = `${value} meses`; }
    function calculateInstallment(amount, term, rate) {
        const monthlyRate = rate / 100;
        return amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    }
    function showResult(amount, term, rate, installment, total) {
        document.getElementById('result-amount').textContent = formatCurrency(amount);
        document.getElementById('result-term').textContent = `${term} meses`;
        document.getElementById('result-rate').textContent = `${rate.toFixed(2)}% a.m.`;
        document.getElementById('result-installment').textContent = formatCurrency(installment);
        document.getElementById('result-total').textContent = formatCurrency(total);
        simulationResult.style.display = 'block';
        window.scrollTo({ top: simulationResult.offsetTop - 80, behavior: 'smooth' });
    }

    if (simulatorForm && loanValueInput && loanTermInput) {
        loanValueInput.addEventListener('input', function() { updateLoanValue(this.value); });
        loanTermInput.addEventListener('input', function() { updateLoanTerm(this.value); });
        updateLoanValue(loanValueInput.value);
        updateLoanTerm(loanTermInput.value);

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                const amount = parseFloat(loanValueInput.value);
                const term = parseInt(loanTermInput.value);
                const purpose = document.getElementById('loan-purpose').value;
                const income = document.getElementById('income').value; // pega a renda
        
                let rate, purposeText;
                switch(purpose) {
                    case 'consignado': rate = 1.99; purposeText = "Empréstimo Consignado"; break;
                    case 'pessoal': rate = 3.5; purposeText = "Empréstimo Pessoal"; break;
                    case 'veiculo': rate = 1.2; purposeText = "Financiamento de Veículo"; break;
                    case 'imovel': rate = 0.8; purposeText = "Financiamento Imobiliário"; break;
                    default: rate = 2.5; purposeText = "Empréstimo";
                }
        
                const installment = calculateInstallment(amount, term, rate);
                const total = installment * term;
        
                const message = `Olá, gostaria de simular um ${purposeText}:\n\n• Valor: ${formatCurrency(amount)}\n• Prazo: ${term} meses\n• Renda Mensal: ${formatCurrency(parseFloat(income.replace(',', '.')))}`;
                
                const whatsappUrl = `https://wa.me/5541997501215?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
        

        simulatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(loanValueInput.value);
            const term = parseInt(loanTermInput.value);
            const purpose = document.getElementById('loan-purpose').value;
            let rate;
            switch(purpose) {
                case 'consignado': rate = 1.99; break;
                case 'pessoal': rate = 3.5; break;
                case 'veiculo': rate = 1.2; break;
                case 'imovel': rate = 0.8; break;
                default: rate = 2.5;
            }
            const installment = calculateInstallment(amount, term, rate);
            const total = installment * term;
            showResult(amount, term, rate, installment, total);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    if (slider && arrowLeft && arrowRight && testimonials.length > 0) {
        const getGap = () => parseFloat(getComputedStyle(slider).gap || 30);
        const itemWidth = () => testimonials[0].getBoundingClientRect().width + getGap();

        const updateSlider = (behavior = 'smooth') => {
            slider.scrollTo({ left: currentIndex * itemWidth(), behavior });
            arrowLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
            arrowRight.style.display = currentIndex >= testimonials.length - 1 ? 'none' : 'flex';
        };

        arrowRight.addEventListener('click', () => {
            if (currentIndex < testimonials.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
        arrowLeft.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', () => updateSlider('auto'));
        updateSlider('auto');
    }
});
