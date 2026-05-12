const mainContent = document.querySelector('.main-content');
mainContent.addEventListener('scroll', function() {
    let scrollTop = mainContent.scrollTop;
    if (scrollTop === 0) {
        // at the top
        document.querySelector('.topbar-top').classList.remove('hidden');
        document.querySelector('.storebar').classList.remove('shifted');
    } else {
        // scrolled down
        document.querySelector('.topbar-top').classList.add('hidden');
        document.querySelector('.storebar').classList.add('shifted');
    }
});

// Topbar Hamburger Menu
const topbarHamburgerMenu = document.getElementById('topbar-hamburger-menu');
const topbarMobileMenuDropdown = document.getElementById('topbar-mobile-menu-dropdown');

if (topbarHamburgerMenu) {
    topbarHamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        topbarHamburgerMenu.classList.toggle('active');
        topbarMobileMenuDropdown.classList.toggle('active');
    });
}

// Close topbar mobile menu when clicking menu links
const topbarMobileMenuLinks = document.querySelectorAll('.topbar-mobile-menu-link');
topbarMobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (topbarHamburgerMenu) {
            topbarHamburgerMenu.classList.remove('active');
        }
        if (topbarMobileMenuDropdown) {
            topbarMobileMenuDropdown.classList.remove('active');
        }
    });
});

// Close topbar menu when clicking outside
document.addEventListener('click', function(e) {
    const topbarTop = document.querySelector('.topbar-top');
    if (topbarTop && !topbarTop.contains(e.target) && topbarHamburgerMenu && topbarMobileMenuDropdown) {
        topbarHamburgerMenu.classList.remove('active');
        topbarMobileMenuDropdown.classList.remove('active');
    }
});


// Storebar dropdown logic
const storebarItems = document.querySelectorAll('.storebar-item');
let openDropdown = null;

storebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close any open dropdown
        if (openDropdown && openDropdown !== item) {
            openDropdown.classList.remove('open');
            const ddId = openDropdown.getAttribute('data-dropdown');
            const dd = document.getElementById('dropdown-' + ddId);
            if (dd) dd.style.display = 'none';
        }
        
        // Toggle this dropdown
        const storebar = document.querySelector('.storebar');
        if (!item.classList.contains('open')) {
            item.classList.add('open');
            const ddId = item.getAttribute('data-dropdown');
            const dd = document.getElementById('dropdown-' + ddId);
            if (dd) dd.style.display = 'flex';
            if (storebar) storebar.classList.add('dropdown-open');
            openDropdown = item;
        } else {
            item.classList.remove('open');
            const ddId = item.getAttribute('data-dropdown');
            const dd = document.getElementById('dropdown-' + ddId);
            if (dd) dd.style.display = 'none';
            if (storebar) storebar.classList.remove('dropdown-open');
            openDropdown = null;
        }
    });
});

// Click outside to close
document.addEventListener('click', function(e) {
    const storebar = document.querySelector('.storebar');
    if (openDropdown) {
        openDropdown.classList.remove('open');
        const ddId = openDropdown.getAttribute('data-dropdown');
        const dd = document.getElementById('dropdown-' + ddId);
        if (dd) dd.style.display = 'none';
        if (storebar) storebar.classList.remove('dropdown-open');
        openDropdown = null;
    }
});

// Hamburger menu toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburgerMenu.classList.toggle('active');
        mobileMenuDropdown.classList.toggle('active');
    });
}

// Close mobile menu when clicking menu items
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item, .mobile-menu-link');
mobileMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // For mobile menu buttons, trigger the corresponding dropdown
        if (item.classList.contains('mobile-menu-item')) {
            e.stopPropagation();
            const ddId = item.getAttribute('data-dropdown');
            const storebar = document.querySelector('.storebar');
            const dd = document.getElementById('dropdown-' + ddId);
            
            // Close the mobile menu
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
            }
            if (mobileMenuDropdown) {
                mobileMenuDropdown.classList.remove('active');
            }
            
            // Open the dropdown
            if (dd) {
                dd.style.display = 'flex';
                if (storebar) storebar.classList.add('dropdown-open');
                openDropdown = dd;
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const storebar = document.querySelector('.storebar');
    if (!storebar.contains(e.target) && hamburgerMenu && mobileMenuDropdown) {
        hamburgerMenu.classList.remove('active');
        mobileMenuDropdown.classList.remove('active');
    }
});