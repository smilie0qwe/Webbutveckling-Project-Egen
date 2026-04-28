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
        if (!item.classList.contains('open')) {
            item.classList.add('open');
            const ddId = item.getAttribute('data-dropdown');
            const dd = document.getElementById('dropdown-' + ddId);
            if (dd) dd.style.display = 'flex';
            openDropdown = item;
        } else {
            item.classList.remove('open');
            const ddId = item.getAttribute('data-dropdown');
            const dd = document.getElementById('dropdown-' + ddId);
            if (dd) dd.style.display = 'none';
            openDropdown = null;
        }
    });
});

// Click outside to close
document.addEventListener('click', function(e) {
    if (openDropdown) {
        openDropdown.classList.remove('open');
        const ddId = openDropdown.getAttribute('data-dropdown');
        const dd = document.getElementById('dropdown-' + ddId);
        if (dd) dd.style.display = 'none';
        openDropdown = null;
    }
});