// ============================================
// Madam's Boutique - JavaScript Code
// Beginner-friendly version with clear comments
// ============================================

// Step 1: Wait until the webpage is fully loaded before running our code
// This ensures all HTML elements exist before we try to use them
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded! JavaScript is starting...');
    
    // Call different functions to set up features
    setupSmoothScrolling();
    setupGalleryFilter();
    setupGalleryModal();
    setupContactForm();
    setupScrollToTop();
    setupNavbarEffects();
});

// ============================================
// FUNCTION 1: Smooth Scrolling for Links
// ============================================
// This makes links that jump to sections scroll smoothly instead of jumping instantly
function setupSmoothScrolling() {
    // Find all links that start with "#" (like #designers, #about)
    var allLinks = document.querySelectorAll('a[href^="#"]');
    
    // Loop through each link and add a click event
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(event) {
            // Get the link's destination (e.g., "#designers")
            var linkDestination = this.getAttribute('href');
            
            // If it's just "#" or empty, don't do anything
            if (linkDestination === '#' || linkDestination === '#!') {
                event.preventDefault();
                return;
            }
            
            // Find the target section on the page
            var targetSection = document.querySelector(linkDestination);
            
            // If the section exists, scroll to it smoothly
            if (targetSection) {
                event.preventDefault(); // Stop the default jump behavior
                
                // Calculate position, accounting for fixed navbar (80px)
                var scrollPosition = targetSection.offsetTop - 80;
                
                // Scroll smoothly to that position
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ============================================
// FUNCTION 2: Gallery Filter Buttons
// ============================================
// This allows users to filter gallery images by category (All, Bridal, Party, etc.)
function setupGalleryFilter() {
    // Find all filter buttons and gallery items
    var filterButtons = document.querySelectorAll('.btn-filter');
    var galleryItems = document.querySelectorAll('.gallery-item');
    
    // If there are no filter buttons, exit the function
    if (filterButtons.length === 0) {
        return;
    }
    
    // Loop through each filter button
    for (var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            // Remove "active" class from ALL buttons
            for (var j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('active');
            }
            
            // Add "active" class to the clicked button
            this.classList.add('active');
            
            // Get which category was clicked (e.g., "bridal", "party", "all")
            var selectedCategory = this.getAttribute('data-filter');
            
            // Loop through all gallery items and show/hide them
            for (var k = 0; k < galleryItems.length; k++) {
                var itemCategory = galleryItems[k].getAttribute('data-category');
                
                // If "all" is selected OR the item's category matches, show it
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    galleryItems[k].style.display = 'block';
                } else {
                    // Otherwise, hide it
                    galleryItems[k].style.display = 'none';
                }
            }
        });
    }
}

// ============================================
// FUNCTION 3: Gallery Image Modal (Popup)
// ============================================
// When user clicks a gallery image, show it in a larger popup window
function setupGalleryModal() {
    // Find all gallery images and modal elements
    var galleryImages = document.querySelectorAll('.gallery-img[data-bs-toggle="modal"]');
    var modalImage = document.getElementById('modalImage');
    var modalTitle = document.getElementById('modalTitle');
    
    // If these elements don't exist, exit the function
    if (galleryImages.length === 0 || !modalImage || !modalTitle) {
        return;
    }
    
    // Loop through each gallery image
    for (var i = 0; i < galleryImages.length; i++) {
        galleryImages[i].addEventListener('click', function() {
            // Get the image source and title from clicked image
            var imageSource = this.getAttribute('data-img') || this.getAttribute('src');
            var imageTitle = this.getAttribute('data-title') || this.getAttribute('alt');
            
            // Update the modal image and title
            if (modalImage) {
                modalImage.setAttribute('src', imageSource);
                modalImage.setAttribute('alt', imageTitle);
            }
            
            if (modalTitle) {
                modalTitle.textContent = imageTitle;
            }
        });
    }
}

// ============================================
// FUNCTION 4: Contact Form Validation
// ============================================
// This validates the contact form before submission
function setupContactForm() {
    var contactForm = document.getElementById('contactForm');
    
    // If form doesn't exist, exit
    if (!contactForm) {
        return;
    }
    
    // When form is submitted, run validation
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop form from submitting normally
        
        // Get all form field values
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var subject = document.getElementById('subject').value.trim();
        var message = document.getElementById('message').value.trim();
        
        // Validation: Check if any field is empty
        if (name === '' || email === '' || phone === '' || subject === '' || message === '') {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Validation: Check if email format is correct
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validation: Check if phone number has at least 10 digits
        var phoneDigits = phone.replace(/\D/g, ''); // Remove non-digits
        if (phoneDigits.length < 10) {
            showFormMessage('Please enter a valid phone number (at least 10 digits).', 'error');
            return;
        }
        
        // If all validations pass, show success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Clear the form
        contactForm.reset();
        
        // In a real website, you would send the data to a server here
        console.log('Form submitted successfully:', {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });
    });
}

// Helper function to show messages to the user
function showFormMessage(messageText, messageType) {
    var messageDiv = document.getElementById('formMessage');
    
    if (!messageDiv) {
        return;
    }
    
    // Set the message text and style based on type (success = green, error = red)
    if (messageType === 'success') {
        messageDiv.className = 'mt-3 alert alert-success';
    } else {
        messageDiv.className = 'mt-3 alert alert-danger';
    }
    
    messageDiv.textContent = messageText;
    messageDiv.style.display = 'block';
    
    // Hide the message after 5 seconds
    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ============================================
// FUNCTION 5: Scroll to Top Button
// ============================================
// Creates a button that appears when user scrolls down, clicking it scrolls back to top
function setupScrollToTop() {
    // Check if button already exists
    var scrollButton = document.querySelector('.scroll-to-top');
    
    // If button doesn't exist, create it
    if (!scrollButton) {
        scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);
    }
    
    // When user scrolls, show or hide the button
    window.addEventListener('scroll', function() {
        // If scrolled more than 300px down, show the button
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            // Otherwise, hide it
            scrollButton.classList.remove('show');
        }
    });
    
    // When button is clicked, scroll to top smoothly
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FUNCTION 6: Navbar Scroll Effects
// ============================================
// Adds shadow to navbar when user scrolls down for better visibility
function setupNavbarEffects() {
    var navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        return;
    }
    
    // When user scrolls, change navbar appearance
    window.addEventListener('scroll', function() {
        // If scrolled more than 100px, add shadow
        if (window.pageYOffset > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            // Otherwise, remove shadow
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = '#ffffff';
        }
    });
}

// ============================================
// BONUS: Close Mobile Menu on Link Click
// ============================================
// When user clicks a link in mobile menu, automatically close the menu
document.addEventListener('DOMContentLoaded', function() {
    var allNavLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
    
    for (var i = 0; i < allNavLinks.length; i++) {
        allNavLinks[i].addEventListener('click', function() {
            var mobileMenu = document.querySelector('.navbar-collapse');
            
            // If mobile menu is open, close it
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                // Use Bootstrap's collapse functionality to close
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    var bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    }
});

// ============================================
// END OF CODE
// ============================================
// This JavaScript file is complete and ready to use!
// All functions are simple and well-commented for beginners to understand.
