// VayoCare - Interactive Scripts

// Custom Cursor - Fixed version
const initCustomCursor = () => {
    const cursor = document.getElementById('customCursor');
    
    if (!cursor) {
        console.error('Custom cursor element not found');
        return;
    }
    
    console.log('Custom cursor initialized');
    
    // Set initial position off-screen
    cursor.style.left = '-100px';
    cursor.style.top = '-100px';
    cursor.style.opacity = '1';
    cursor.style.display = 'block';
    
    // Track mouse movement - attach to document
    const handleMouseMove = (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Show when mouse enters window  
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .tab-button, .card, .process-step, .usp-card, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });
};

// Initialize cursor immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}

// Scroll Progress
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Scroll Indicator - Initialize after DOM is ready
let sections, indicatorDots;

const initScrollIndicator = () => {
    sections = document.querySelectorAll('.hero, .section, .transition, .mission, .cta, .footer');
    indicatorDots = document.querySelectorAll('.indicator-dot');

    console.log('Sections found:', sections.length);
    console.log('Indicator dots found:', indicatorDots.length);
    
    if (sections.length === 0 || indicatorDots.length === 0) {
        console.error('Scroll indicator elements not found!');
        return;
    }
    
    // Initial update
    updateScrollIndicator();
    
    // Add scroll listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateScrollIndicator);
    }, { passive: true });
    
    // Click indicator dots to navigate
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

// Full-page scroll functionality with rubber band effect
let touchStartY = 0;
let isScrolling = false;
let scrollTimeout = null;
let lastWheelTime = 0;
let accumulatedDelta = 0;
let rubberBandOffset = 0;

const getCurrentSection = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Find the section that's most visible in the viewport
    let currentIndex = 0;
    let maxVisibility = 0;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight / windowHeight;
        
        if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentIndex = index;
        }
    });
    
    return currentIndex;
};

const applyRubberBand = (section, offset) => {
    // Apply rubber band transform with resistance
    // Negative offset to move section in opposite direction (away from scroll)
    const resistance = 0.5; // 50% of actual scroll for more visible effect
    const maxOffset = 150; // Maximum pixels to stretch
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, -offset * resistance));
    
    section.style.transform = `translateY(${limitedOffset}px)`;
    section.style.transition = 'none';
};

const resetRubberBand = (section) => {
    section.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    section.style.transform = 'translateY(0)';
};

const snapToSection = (index) => {
    if (index >= 0 && index < sections.length) {
        isScrolling = true;

        // Reset rubber band on all sections
        sections.forEach(section => resetRubberBand(section));

        // Manually scroll to section using window.scrollTo
        const targetPosition = sections[index].offsetTop;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Reset scrolling flag after animation completes
        setTimeout(() => {
            isScrolling = false;
            accumulatedDelta = 0;
            rubberBandOffset = 0;
        }, 1000);
    }
};

window.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent default scroll behavior
    
    // If already transitioning to another section, ignore all scroll events
    if (isScrolling) return;
    
    const now = Date.now();
    const currentSection = getCurrentSection();
    const currentSectionElement = sections[currentSection];
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Accumulate scroll delta
    accumulatedDelta += e.deltaY;
    rubberBandOffset += e.deltaY;
    lastWheelTime = now;
    
    // Apply rubber band effect to current section
    if (!isScrolling) {
        applyRubberBand(currentSectionElement, rubberBandOffset);
    }
    
    // Set timeout to snap when user stops scrolling
    scrollTimeout = setTimeout(() => {
        if (isScrolling) return;
        
        const threshold = 30; // Threshold for page change trigger
        
        // Determine which section to snap to based on accumulated scroll
        if (Math.abs(accumulatedDelta) > threshold) {
            if (accumulatedDelta > 0 && currentSection < sections.length - 1) {
                // Scrolled down enough - go to next section
                snapToSection(currentSection + 1);
            } else if (accumulatedDelta < 0 && currentSection > 0) {
                // Scrolled up enough - go to previous section
                snapToSection(currentSection - 1);
            } else {
                // Not enough scroll - snap back to current section
                resetRubberBand(currentSectionElement);
                accumulatedDelta = 0;
                rubberBandOffset = 0;
            }
        } else {
            // Small scroll - snap back to current section
            resetRubberBand(currentSectionElement);
            accumulatedDelta = 0;
            rubberBandOffset = 0;
        }
    }, 80); // Wait 80ms after last wheel event for faster response
}, { passive: false }); // Changed to passive: false to allow preventDefault

// Handle touch events for mobile
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) {
        const currentSection = getCurrentSection();
        
        if (diff > 0 && currentSection < sections.length - 1) {
            // Swipe up - scroll down
            snapToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
            // Swipe down - scroll up
            snapToSection(currentSection - 1);
        }
    }
}, { passive: true });

// Handle keyboard navigation
window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    const currentSection = getCurrentSection();
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        snapToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        snapToSection(currentSection - 1);
    }
});

// Animate "There's a better way" text on scroll
const observeZoomAnimation = () => {
    const bigText = document.querySelector('.big-text');
    const transitionSection = document.querySelector('.transition');
    
    if (!bigText || !transitionSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible - add animation class
                bigText.classList.remove('animate');
                // Force reflow to restart animation
                void bigText.offsetWidth;
                bigText.classList.add('animate');
            } else {
                // Section is not visible - remove animation class
                bigText.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of section is visible
    });
    
    observer.observe(transitionSection);
};

// Initialize zoom animation observer
observeZoomAnimation();

// Update active dot on scroll
const updateScrollIndicator = () => {
    // Calculate which section is currently visible based on scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Calculate current section based on scroll position
    // Each section is roughly 100vh, so divide scroll by window height
    let currentSection = Math.round(scrollPosition / windowHeight);
    
    // Clamp to valid range
    currentSection = Math.max(0, Math.min(currentSection, sections.length - 1));
    
    indicatorDots.forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

// Sticky Navigation
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.num');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Tabs Switching
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const targetId = tab.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.style.display = 'grid';
            // Trigger reflow for animation
            setTimeout(() => {
                targetPanel.classList.add('active');
            }, 10);
        }
    });
});

// Email Form Handling
const heroForm = document.getElementById('heroForm');
const waitlistForm = document.getElementById('waitlistForm');
const openFormBtn = document.getElementById('openFormBtn');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('joinModal');

// Open modal
if (openFormBtn) {
    openFormBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal on background click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate submission
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span>✓ Successfully Added!</span>';
    button.style.background = '#4caf50';
    button.disabled = true;
    
    console.log('Form submitted:', data);
    
    // Reset form and close modal after 2 seconds
    setTimeout(() => {
        e.target.reset();
        button.innerHTML = originalText;
        button.style.background = '';
        button.disabled = false;
        
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 2000);
};

if (heroForm) {
    heroForm.addEventListener('submit', handleFormSubmit);
}

if (waitlistForm) {
    waitlistForm.addEventListener('submit', handleFormSubmit);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Keyboard navigation for sections
document.addEventListener('keydown', (e) => {
    const currentScroll = window.scrollY;
    let currentSection = -1;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -50 && rect.top <= 50) {
            currentSection = index;
        }
    });
    
    if (currentSection === -1) {
        currentSection = 0;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
            sections[currentSection + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
            sections[currentSection - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Animate comparison cards on view
const comparisonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            comparisonObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.compare').forEach(compare => {
    comparisonObserver.observe(compare);
});

// Initialize - trigger animations for visible elements
document.addEventListener('DOMContentLoaded', () => {
    // Check if hero is visible (it usually is on load)
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
            }
        }, 100);
    }
    
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));
});

// Log page view (for analytics integration)
console.log('VayoCare Landing Page Loaded');
console.log('Made with ♥ for elderly care');


