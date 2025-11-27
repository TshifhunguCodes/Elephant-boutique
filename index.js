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

// Room Data
const roomsData = [
    {
        id: 1,
        title: "Standard Twin Room",
        features: [
            "2 twin beds",
            "20 m²",
            "Air conditioning",
            "Private bathroom",
            "Free Wifi",
            "Free toiletries",
            "Shower",
            "TV"
        ],
        guests: "▲▲",
        price: "ZAR 950",
        taxes: "+ZAR 83 taxes and fees",
        total: "ZAR 1,007",
        options: [
            {
                type: "non-refundable",
                label: "Non-refundable",
                details: ["Pay online"]
            },
            {
                type: "refundable",
                label: "Fully refundable (by Booking.com) before November 28, 2025",
                details: ["Can't combine with other offers", "Pay online"]
            }
        ]
    },
    {
        id: 2,
        title: "Standard King Room",
        features: [
            "1 queen bed",
            "20 m²",
            "Air conditioning",
            "Private bathroom",
            "Free Wifi",
            "Free toiletries",
            "Shower",
            "TV"
        ],
        guests: "▲▲",
        price: "ZAR 950",
        taxes: "+ZAR 83 taxes and fees",
        total: "ZAR 1,007",
        options: [
            {
                type: "non-refundable",
                label: "Non-refundable",
                details: ["Pay online"]
            },
            {
                type: "refundable",
                label: "Fully refundable (by Booking.com) before November 28, 2025",
                details: ["Can't combine with other offers", "Pay online"]
            }
        ]
    }
];

// Function to create room booking cards
function createRoomBookingCards() {
    const roomsBooking = document.getElementById('rooms-booking');
    
    roomsData.forEach(room => {
        room.options.forEach((option, optionIndex) => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-booking-card';
            roomCard.setAttribute('data-room-id', room.id);
            roomCard.setAttribute('data-option-index', optionIndex);
            
            roomCard.innerHTML = `
                <div class="room-header">
                    <h3 class="room-title">${room.title}</h3>
                    <div class="room-features-list">
                        ${room.features.map(feature => `<span>${feature}</span>`).join('')}
                    </div>
                </div>
                <div class="room-body">
                    <div class="room-guests">
                        <span>${room.guests}</span>
                        <span>Number of guests</span>
                    </div>
                    <div class="room-price">
                        <span class="price-main">${room.price}</span>
                        <span class="price-details">${room.taxes}</span>
                        <span class="price-details">${room.total} total</span>
                    </div>
                    <div class="room-options">
                        <div class="option-item ${option.type === 'non-refundable' ? 'non-refundable' : 'refundable'}">
                            <span>${option.type === 'non-refundable' ? '☉' : '✓'}</span>
                            <div>
                                <div>${option.label}</div>
                                ${option.details.map(detail => `<div style="font-size: 0.8rem; color: #666;">- ${detail}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="room-select">
                        <div class="select-checkbox" data-room-id="${room.id}" data-option-index="${optionIndex}"></div>
                    </div>
                </div>
            `;
            
            roomsBooking.appendChild(roomCard);
        });
    });
    
    // Add event listeners to select checkboxes
    document.querySelectorAll('.select-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            const roomId = this.getAttribute('data-room-id');
            const optionIndex = this.getAttribute('data-option-index');
            
            // Remove selection from all checkboxes
            document.querySelectorAll('.select-checkbox').forEach(cb => {
                cb.classList.remove('selected');
            });
            
            // Add selection to clicked checkbox
            this.classList.add('selected');
            
            // Show booking confirmation
            const room = roomsData.find(r => r.id == roomId);
            const option = room.options[optionIndex];
            
            setTimeout(() => {
                alert(`Selected: ${room.title}\nOption: ${option.label}\nPrice: ${room.total} total\n\nYou will be redirected to complete your booking.`);
            }, 300);
        });
    });
}

// Modal functionality
const modal = document.getElementById('room-modal');
const closeModal = document.querySelector('.close-modal');

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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createRoomBookingCards();
    
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
            
            if (!checkIn || !checkOut) {
                alert('Please select both check-in and check-out dates.');
                return;
            }
            
            alert(`Checking availability from ${checkIn} to ${checkOut}. You will be redirected to room selection.`);
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
});