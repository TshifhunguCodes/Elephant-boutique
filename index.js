// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Room Data with Images
const roomsData = [
    {
        id: 1,
        title: "Standard Twin Room",
        description: "Comfortable and spacious room with two twin beds, perfect for friends or colleagues traveling together.",
        price: "ZAR 950",
        priceDetail: "per night",
        features: [
            "2 twin beds",
            "20 m² room size",
            "Air conditioning",
            "Private bathroom",
            "Free WiFi",
            "Flat-screen TV",
            "Free toiletries",
            "Shower"
        ],
        amenities: [
            "Tea/Coffee maker",
            "Desk",
            "Safe deposit box",
            "Hairdryer",
            "Wake-up service",
            "Ironing facilities"
        ],
        images: [
            "images/p3.webp",
            "images/p4.jpg",
            "images/p7.webp"
        ],
        badge: "Popular"
    },
    {
        id: 2,
        title: "Standard King Room",
        description: "Elegant room with a comfortable king-size bed, ideal for couples or solo travelers seeking extra space.",
        price: "ZAR 1200",
        priceDetail: "per night",
        features: [
            "1 king-size bed",
            "20 m² room size",
            "Air conditioning",
            "Private bathroom",
            "Free WiFi",
            "Flat-screen TV",
            "Free toiletries",
            "Shower"
        ],
        amenities: [
            "Tea/Coffee maker",
            "Desk",
            "Safe deposit box",
            "Hairdryer",
            "Wake-up service",
            "Ironing facilities"
        ],
        images: [
            "images/p1.jpg",
            "images/p2.jpg",
            "images/p4.jpg"
        ],
        badge: "Couples Choice"
    }
];

// Function to create room cards
function createRoomCards() {
    const roomsGrid = document.getElementById('rooms-grid');
    
    // Clear any existing content to prevent duplicates
    roomsGrid.innerHTML = '';
    
    roomsData.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.setAttribute('data-room-id', room.id);
        
        roomCard.innerHTML = `
            <div class="room-image">
                <div class="room-image-container">
                    <img src="${room.images[0]}" alt="${room.title}" class="room-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="image-placeholder" style="display: none;">
                        <i class="fas fa-image"></i>
                        <p>${room.title} Image</p>
                    </div>
                </div>
                ${room.badge ? `<div class="room-badge">${room.badge}</div>` : ''}
            </div>
            <div class="room-content">
                <h3 class="room-title">${room.title}</h3>
                <p class="room-description">${room.description}</p>
                
                <div class="room-features">
                    ${room.features.slice(0, 4).map(feature => `
                        <div class="room-feature">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="room-price">
                    <span class="price-amount">${room.price}</span>
                    <span class="price-detail">${room.priceDetail}</span>
                </div>
                
                <div class="room-actions">
                    <button class="view-details" data-room-id="${room.id}">View Details</button>
                    <button class="book-now" data-room-id="${room.id}">Book Now</button>
                </div>
            </div>
        `;
        
        roomsGrid.appendChild(roomCard);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const roomId = this.getAttribute('data-room-id');
            openRoomModal(roomId);
        });
    });
    
    // Add event listeners to book now buttons
    document.querySelectorAll('.book-now').forEach(button => {
        button.addEventListener('click', function() {
            const roomId = this.getAttribute('data-room-id');
            const room = roomsData.find(r => r.id == roomId);
            alert(`Booking ${room.title} for ${room.price} per night. You will be redirected to the booking page.`);
        });
    });
}

// Modal functionality
const modal = document.getElementById('room-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modal-body');

function openRoomModal(roomId) {
    const room = roomsData.find(r => r.id == roomId);
    
    if (room) {
        modalBody.innerHTML = `
            <div class="room-modal-content">
                <div class="room-modal-gallery">
                    <div class="room-modal-main-image">
                        <div class="modal-image-container">
                            <img src="${room.images[0]}" alt="${room.title}" class="modal-main-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="image-placeholder" style="display: none;">
                                <i class="fas fa-image"></i>
                                <p>${room.title} - Main Image</p>
                            </div>
                        </div>
                    </div>
                    <div class="room-modal-thumbnails">
                        ${room.images.map((image, index) => `
                            <div class="room-modal-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                                <div class="thumbnail-container">
                                    <img src="${image}" alt="${room.title} - Image ${index + 1}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="image-placeholder" style="display: none;">
                                        <i class="fas fa-image"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="room-modal-details">
                    <h2 class="room-modal-title">${room.title}</h2>
                    <div class="room-modal-price">${room.price} <small>${room.priceDetail}</small></div>
                    <p class="room-modal-description">${room.description}</p>
                    
                    <div class="room-modal-section">
                        <h3>Room Features</h3>
                        <ul class="room-features-grid">
                            ${room.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="room-modal-section">
                        <h3>Additional Amenities</h3>
                        <ul class="room-features-grid">
                            ${room.amenities.map(amenity => `<li><i class="fas fa-check"></i> ${amenity}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="room-modal-actions">
                        <button class="book-button">Book This Room</button>
                        <button class="close-modal-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add event listener to modal book button
        modalBody.querySelector('.book-button').addEventListener('click', function() {
            alert(`Booking ${room.title} for ${room.price} per night. You will be redirected to complete your booking.`);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Add event listener to modal close button
        modalBody.querySelector('.close-modal-btn').addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Add event listeners to thumbnail images
        const thumbnails = modalBody.querySelectorAll('.room-modal-thumbnail');
        thumbnails.forEach((thumb) => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                const imageSrc = this.getAttribute('data-image');
                const mainImage = modalBody.querySelector('.modal-main-img');
                const mainPlaceholder = modalBody.querySelector('.room-modal-main-image .image-placeholder');
                
                mainImage.src = imageSrc;
                mainImage.alt = `${room.title} - Selected Image`;
                mainImage.style.display = 'block';
                if (mainPlaceholder) mainPlaceholder.style.display = 'none';
            });
        });
    }
}

// Close modal when clicking the X
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Title Animation with Particles
function createTitleParticles() {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'title-particles';
    heroText.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Random delay
    const delay = Math.random() * 5;
    
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = '0';
    
    // Random size
    const size = 2 + Math.random() * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    container.appendChild(particle);
}

// Enhanced title reveal with typewriter effect
function enhanceTitleAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        // Create typewriter effect
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter after initial reveal
        setTimeout(typeWriter, index * 800 + 300);
    });
}

// Interactive title hover effects
function addTitleInteractivity() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            line.style.transform = 'scale(1.05)';
            line.style.textShadow = '4px 4px 8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(210, 105, 30, 0.8)';
            line.style.transition = 'all 0.3s ease';
        });
        
        line.addEventListener('mouseleave', () => {
            line.style.transform = 'scale(1)';
            line.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.5)';
        });
    });
}

// Initialize enhanced title animations
function initEnhancedTitle() {
    createTitleParticles();
    // enhanceTitleAnimation(); // Uncomment for typewriter effect
    addTitleInteractivity();
}

// Enhanced Logo Animation System
function initEnhancedLogo() {
    createLogoParticles();
    setupLogoInteractions();
    addLogoCharacters();
}

// Create floating particles around logo
function createLogoParticles() {
    const logoMain = document.querySelector('.logo-main');
    if (!logoMain) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'logo-particles';
    logoMain.appendChild(particlesContainer);

    // Create 8 particles around the logo
    for (let i = 0; i < 8; i++) {
        createLogoParticle(particlesContainer, i);
    }
}

function createLogoParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'logo-particle';
    
    // Position particles around the logo
    const angle = (index / 8) * Math.PI * 2;
    const distance = 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    // Random delay and duration
    const delay = Math.random() * 3;
    const duration = 3 + Math.random() * 2;
    
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Random size and color variation
    const size = 2 + Math.random() * 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Color variation
    const colors = ['#8B4513', '#8B4513', '#8B4513', '#A0522D'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    
    container.appendChild(particle);
}

// Setup logo hover and click interactions
function setupLogoInteractions() {
    const logoMain = document.querySelector('.logo-main');
    if (!logoMain) return;
    
    // Enhanced hover effects
    logoMain.addEventListener('mouseenter', () => {
        logoMain.classList.add('hover');
        triggerLogoAnimation();
    });
    
    logoMain.addEventListener('mouseleave', () => {
        logoMain.classList.remove('hover');
    });
    
    // Click animation
    logoMain.addEventListener('click', (e) => {
        e.preventDefault();
        triggerLogoClickAnimation();
        
        // Scroll to top with smooth animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard navigation
    logoMain.setAttribute('tabindex', '0');
    logoMain.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerLogoClickAnimation();
        }
    });
}

// Add individual character spans for letter animations
function addLogoCharacters() {
    const logoText = document.querySelector('.logo-text');
    if (!logoText) return;
    
    const text = logoText.textContent;
    logoText.innerHTML = '';
    
    // Create span for each character
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'logo-char';
        charSpan.textContent = text[i];
        charSpan.style.animationDelay = `${i * 0.1}s`;
        logoText.appendChild(charSpan);
    }
}

// Trigger special logo animation
function triggerLogoAnimation() {
    const logoChars = document.querySelectorAll('.logo-char');
    
    logoChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.animation = 'charBounce 0.6s ease';
            setTimeout(() => {
                char.style.animation = '';
            }, 600);
        }, index * 50);
    });
}

// Logo click animation sequence
function triggerLogoClickAnimation() {
    const logoMain = document.querySelector('.logo-main');
    if (!logoMain) return;
    
    // Add loading state
    logoMain.classList.add('loading');
    
    // Simulate loading completion
    setTimeout(() => {
        logoMain.classList.remove('loading');
        logoMain.classList.add('success');
        
        // Reset after animation
        setTimeout(() => {
            logoMain.classList.remove('success');
        }, 1000);
    }, 800);
}

// Logo scroll effect - subtle scale on scroll
function initLogoScrollEffect() {
    const logoMain = document.querySelector('.logo-main');
    if (!logoMain) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scale = Math.max(0.9, 1 - scrollY / 1000);
        
        logoMain.style.transform = `scale(${scale})`;
        logoMain.style.opacity = Math.max(0.7, 1 - scrollY / 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize rooms (ONLY ONCE)
    createRoomCards();
    
    // Initialize animations
    initEnhancedTitle();
    initEnhancedLogo();
    initLogoScrollEffect();
    
    // Add smooth scrolling for anchor links
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(250, 240, 230, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 240, 230, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(139, 69, 19, 0.1)';
        }
    });
    
    // Form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const roomType = document.getElementById('room-type').value;
            
            if (!checkIn || !checkOut) {
                alert('Please select both check-in and check-out dates.');
                return;
            }
            
            const roomTypeText = roomType ? ` for ${document.getElementById('room-type').options[document.getElementById('room-type').selectedIndex].text}` : '';
            alert(`Checking availability${roomTypeText} from ${checkIn} to ${checkOut}. You will be redirected to room selection.`);
        });
    }
    
    // View all facilities button
    const viewAllFacilities = document.querySelector('.view-all-facilities');
    if (viewAllFacilities) {
        viewAllFacilities.addEventListener('click', () => {
            alert('Showing all 10 facilities:\n\n• Free Parking\n• Free WiFi\n• Garden\n• Patio\n• Air Conditioning\n• Private Bathroom\n• TV\n• Free Toiletries\n• Shower\n• 24-hour Reception');
        });
    }
    
    // Date validation for booking form
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkOutInput.min = today;
        
        checkInInput.addEventListener('change', function() {
            checkOutInput.min = this.value;
        });
    }
    
    // Nav CTA buttons
    document.querySelectorAll('.nav-cta, a[href="#booking"]').forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') === '#booking') {
                e.preventDefault();
                document.querySelector('#booking').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Social media links
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('You will be redirected to our social media page.');
        });
    });
    
    // Footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Facilities Image Loading Handler
function loadFacilitiesImage() {
    const facilitiesImage = document.querySelector('.facilities-image .about-img');
    if (!facilitiesImage) return;
    
    const placeholder = facilitiesImage.parentElement;
    
    // Create new image to preload
    const loader = new Image();
    loader.src = facilitiesImage.src;
    
    loader.onload = function() {
        facilitiesImage.classList.add('loaded');
        console.log('Facilities image loaded successfully');
    };
    
    loader.onerror = function() {
        console.warn('Facilities image failed to load:', facilitiesImage.src);
        facilitiesImage.style.display = 'none';
        // Ensure the placeholder text is still visible
        const caption = placeholder.querySelector('p');
        if (caption) {
            caption.style.background = 'var(--light-color)';
            caption.style.color = 'var(--gray-color)';
        }
    };
}

// Update your DOMContentLoaded to include this:
document.addEventListener('DOMContentLoaded', () => {
    createRoomCards();
    initEnhancedTitle();
    initEnhancedLogo();
    initLogoScrollEffect();
    loadFacilitiesImage(); // Add this line
    // ... rest of your code
});