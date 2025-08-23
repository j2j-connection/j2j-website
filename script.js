// Modern Website Interactions
class ModernWebsite {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSmoothScrolling();
        this.setupHeaderEffects();
        this.setupAnimations();
        this.setupInteractiveElements();
        this.setupFloatingElements();
        this.setupAIAssistant();
        this.setupVideoCarousel();
    }
    
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link, .cta-button');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    setupHeaderEffects() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.backdropFilter = 'blur(30px)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.8)';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
        
        // Observe cards for staggered animation
        const cards = document.querySelectorAll('.feature-card, .contact-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    setupInteractiveElements() {
        // Feature card interactions
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
                this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            });
        });
        
        // App screen interactions
        const appScreens = document.querySelectorAll('.app-screen');
        appScreens.forEach(screen => {
            screen.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.05)';
                this.style.borderColor = 'var(--primary-gold)';
            });
            
            screen.addEventListener('mouseleave', function() {
                if (this.classList.contains('secondary')) {
                    this.style.transform = 'translateY(20px) scale(1)';
                } else {
                    this.style.transform = 'translateY(0) scale(1)';
                }
                this.style.borderColor = 'var(--border-light)';
            });
        });
        
        // Team member interactions
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.borderColor = 'var(--primary-gold)';
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'var(--border-light)';
            });
        });
    }
    
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            floatingElements.forEach(element => {
                const speed = element.getAttribute('data-speed');
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
    
    setupAIAssistant() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        const loadingIndicator = document.getElementById('loadingIndicator');
        
        // Email validation function
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        
        // Send message function
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) {
                chatInput.style.borderColor = 'rgba(255, 165, 0, 0.5)';
                chatInput.placeholder = 'Please enter a message...';
                setTimeout(() => {
                    chatInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    chatInput.placeholder = 'Type your message here...';
                }, 2000);
                return;
            }
            
            // Validate email if message contains @ symbol
            if (message.includes('@') && !isValidEmail(message)) {
                addMessage(message, 'user');
                chatInput.value = '';
                loadingIndicator.style.display = 'flex';
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                    addMessage('That doesn\'t look like a valid email address. Could you please double-check and try again?', 'assistant');
                }, 1500);
                return;
            }
            
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Show loading indicator
            loadingIndicator.style.display = 'flex';
            
            // Simulate AI response (replace with actual AI API call)
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                const response = generateAIResponse(message);
                addMessage(response, 'assistant');
            }, 1500);
        };
        
        // Add message to chat
        const addMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (sender === 'assistant' && text.includes('calendly.com/tom-j2j')) {
                // Special handling for Calendly links
                contentDiv.innerHTML = `
                    <p>${text}</p>
                    <div style="margin-top: 1rem;">
                        <a href="https://calendly.com/tom-j2j/30min" target="_blank" 
                           style="background: var(--gradient-primary); color: var(--text-dark); 
                                  padding: 0.75rem 1.5rem; border-radius: 12px; text-decoration: none; 
                                  display: inline-block; font-weight: 600;">
                            📅 Schedule Now
                        </a>
                    </div>
                `;
            } else {
                contentDiv.innerHTML = `<p>${text}</p>`;
            }
            
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
        
        // Generate AI response (replace with actual AI API)
        const generateAIResponse = (message) => {
            const lowerMessage = message.toLowerCase();
            
            // Scheduling
            if (lowerMessage.includes('schedule') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
                return "Perfect! Here's our Calendly link to book a consultation call: https://calendly.com/tom-j2j/30min";
            }
            // BIKR benefits and features (check before generic BIKR)
            else if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('feature')) {
                return "BIKR provides 4 key benefits: 1) Qualified lead generation with specific bike issues identified, 2) Faster service process with pre-diagnosed customers, 3) Higher conversion rates through real-time Lightspeed pricing, 4) 24/7 expert knowledge scaling. Schedule a demo: https://calendly.com/tom-j2j/30min";
            }
            // BIKR pricing and conversion (check before generic BIKR)
            else if (lowerMessage.includes('pricing') || lowerMessage.includes('conversion') || lowerMessage.includes('leads')) {
                return "BIKR provides real-time Lightspeed pricing integration, which builds customer confidence and increases booking rates. It turns website visitors into qualified leads with specific bike issues identified. Schedule a demo to see the conversion impact: https://calendly.com/tom-j2j/30min";
            }
            // Time saving and efficiency (check before generic BIKR)
            else if (lowerMessage.includes('time') || lowerMessage.includes('efficiency') || lowerMessage.includes('faster') || lowerMessage.includes('speed')) {
                return "BIKR saves bike shops 10-20 minutes per intake/diagnosis by triaging issues online. Pre-diagnosed customers arrive with realistic price expectations, reducing consultation time. Schedule a demo to see the time savings: https://calendly.com/tom-j2j/30min";
            }
            // BIKR specific (generic BIKR questions)
            else if (lowerMessage.includes('bikr') || lowerMessage.includes('diagnostic')) {
                return "BIKR is our AI-powered diagnostic agent for bike shops. It solves the problem of shops spending 10-20 minutes per intake/diagnosis by triaging issues online and producing structured diagnostic summaries. It turns website visitors into ready-to-book repairs using Lightspeed pricing integration. Here's the Calendly link to schedule a demo: https://calendly.com/tom-j2j/30min";
            }
            // Demo requests
            else if (lowerMessage.includes('demo') && !lowerMessage.includes('bikr')) {
                return "I can schedule demos for BIKR diagnostics or community AI solutions. Here's our Calendly link: https://calendly.com/tom-j2j/30min";
            }
            // Pricing questions
            else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('how much')) {
                return "Pricing depends on your specific needs and integration requirements. Let's schedule a call to discuss: https://calendly.com/tom-j2j/30min";
            }
            // POS integration (check before time/efficiency)
            else if (lowerMessage.includes('pos') || lowerMessage.includes('square') || lowerMessage.includes('lightspeed') || lowerMessage.includes('integrate') || lowerMessage.includes('shopify') || lowerMessage.includes('system')) {
                return "We integrate with Lightspeed, Square, and other POS systems. BIKR works with your existing setup. Let's discuss your integration: https://calendly.com/tom-j2j/30min";
            }
            // Bike shop specific
            else if (lowerMessage.includes('bike shop') || lowerMessage.includes('bicycle') || lowerMessage.includes('repair')) {
                return "BIKR helps bike shops with AI diagnostics and POS integration. It improves customer service and streamlines operations. Schedule a demo: https://calendly.com/tom-j2j/30min";
            }
            // Inventory management
            else if (lowerMessage.includes('inventory') || lowerMessage.includes('stock') || lowerMessage.includes('management')) {
                return "Our AI solutions include inventory management and operational tools. Let's discuss your specific needs: https://calendly.com/tom-j2j/30min";
            }
            // Community solutions
            else if (lowerMessage.includes('community') || lowerMessage.includes('center') || lowerMessage.includes('organization')) {
                return "We build AI solutions for community needs - local businesses, organizations, etc. Our tools integrate with existing systems. Here's the Calendly link to discuss your specific needs: https://calendly.com/tom-j2j/30min";
            }
            // Company info
            else if (lowerMessage.includes('j2j') || lowerMessage.includes('what do you do') || lowerMessage.includes('about')) {
                return "J2J builds AI tools that actually work for real communities. We focus on bike shops (BIKR diagnostics) and community organizations. Schedule a call to learn more: https://calendly.com/tom-j2j/30min";
            }
            // Contact/team
            else if (lowerMessage.includes('contact') || lowerMessage.includes('team')) {
                return "I'll connect you with our team. Send me your email and I'll have someone reach out within 24 hours.";
            }
            // Email/phone provided (check this before AI questions)
            else if (lowerMessage.includes('@') || (lowerMessage.includes('email') && lowerMessage.includes('.')) || lowerMessage.includes('phone') || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(lowerMessage)) {
                return "Got it. Our team will contact you within 24 hours.";
            }
            // AI questions
            else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
                return "We build practical AI solutions for communities - diagnostic tools, POS integration, and operational systems. Let's discuss your AI needs: https://calendly.com/tom-j2j/30min";
            }
            // Default fallback
            else {
                return "I can help with scheduling calls, BIKR demos, or connecting you with our team. What do you need?";
            }
        };
        
        // Event listeners
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Quick action buttons
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                let message = '';
                
                switch(action) {
                    case 'schedule':
                        message = "I'd like to schedule a consultation call";
                        break;
                    case 'bikr':
                        message = "Tell me more about BIKR diagnostics";
                        break;
                    case 'contact':
                        message = "I want to contact your team";
                        break;
                }
                
                if (message) {
                    addMessage(message, 'user');
                    loadingIndicator.style.display = 'flex';
                    setTimeout(() => {
                        loadingIndicator.style.display = 'none';
                        const response = generateAIResponse(message);
                        addMessage(response, 'assistant');
                    }, 1500);
                }
            });
        });
    }
    
    setupVideoCarousel() {
        console.log('🎥 Setting up video carousel...');
        this.currentIndex = 0;
        this.videoItems = document.querySelectorAll('.video-item');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds between transitions
        
        console.log(`📊 Found ${this.videoItems.length} video items`);
        console.log(`📊 Found ${this.dots.length} dots`);
        
        if (this.videoItems.length > 0) {
            console.log('✅ Initializing carousel...');
            this.initCarousel();
        } else {
            console.log('❌ No video items found');
        }
    }
    
    initCarousel() {
        // Initialize all videos
        this.initializeVideos();
        
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const carousel = document.querySelector('.video-carousel-hero');
        carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    initializeVideos() {
        // Set up all videos to start from beginning
        this.videoItems.forEach((item, index) => {
            const video = item.querySelector('video');
            if (video) {
                video.currentTime = 0;
                video.muted = true;
                video.loop = true;
                
                // Add error handling for video loading
                video.addEventListener('error', (e) => {
                    console.warn(`Video failed to load: ${video.src}`);
                    // Create fallback content
                    const fallback = document.createElement('div');
                    fallback.className = 'video-fallback';
                    fallback.innerHTML = `
                        <div class="fallback-content">
                            <div class="fallback-icon">🎥</div>
                            <p>Video content loading...</p>
                        </div>
                    `;
                    item.appendChild(fallback);
                });
                
                video.addEventListener('loadstart', () => {
                    // Remove any existing fallback when video starts loading
                    const fallback = item.querySelector('.video-fallback');
                    if (fallback) fallback.remove();
                });
                
                // Only autoplay the first video initially
                if (index === 0) {
                    video.play().catch(e => console.log('Initial video play failed:', e));
                } else {
                    video.pause();
                }
            }
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.videoItems[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Pause current video
        const currentVideo = this.videoItems[this.currentIndex].querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
        }
        
        // Update current index
        this.currentIndex = index;
        
        // Handle circular navigation
        if (this.currentIndex < 0) {
            this.currentIndex = this.videoItems.length - 1;
        } else if (this.currentIndex >= this.videoItems.length) {
            this.currentIndex = 0;
        }
        
        // Add active class to new slide and dot
        this.videoItems[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
        
        // Play new video after a short delay for smooth transition
        const newVideo = this.videoItems[this.currentIndex].querySelector('video');
        if (newVideo) {
            newVideo.currentTime = 0;
            // Small delay to ensure smooth transition
            setTimeout(() => {
                newVideo.play().catch(e => console.log('Video play failed:', e));
            }, 100);
        }
        
        this.updateDisplay();
    }
    
    next() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    previous() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const carousel = document.querySelector('.video-carousel-hero');
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.next();
            } else {
                // Swipe right - previous slide
                this.previous();
            }
        }
    }

}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.init();
    }
    
    init() {
        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        this.nav.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.menuToggle.querySelectorAll('span');
        if (this.menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    closeMenu() {
        this.nav.classList.remove('active');
        this.menuToggle.classList.remove('active');
        
        const spans = this.menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.hero) {
                this.hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Back to Top Button
class BackToTopButton {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (this.button) {
            this.init();
        }
    }
    
    init() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ModernWebsite();
    new MobileMenu();
    new ParallaxEffect();
    new BackToTopButton();
});
