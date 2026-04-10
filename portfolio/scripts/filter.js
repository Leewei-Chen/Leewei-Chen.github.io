document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.filter-link');
    const projects = document.querySelectorAll('.project-item');
    const mainContent = document.querySelector('.main-content');
    
    // Select the submenu container for mobile reset
    const filtersMenu = document.querySelector('.filters'); 

    // Reusable Scroll Function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 1. Logic for the main "Works" button
    const worksButton = document.querySelector('.nav-link.active'); 
    if (worksButton) {
        worksButton.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') || href === 'index.html') {
                e.preventDefault();
                scrollToTop();
                
                // Reset all filters to 'all'
                filterLinks.forEach(l => l.classList.remove('active'));
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.classList.add('active');
                
                projects.forEach(p => p.classList.remove('hide'));
            }
        });
    }

    // 2. Logic for Category Filter Links
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();

            // UI Update: Toggle Active Class
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Filtering Logic
            const selectedFilter = this.getAttribute('data-filter');
            projects.forEach(project => {
                if (selectedFilter === 'all' || project.classList.contains(selectedFilter)) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            });

            // 3. Mobile "Sticky Menu" Fix
            // This forces the menu to close after a selection is made on touch devices
            if (window.innerWidth <= 1024 && filtersMenu) {
                // Manually override CSS hover states
                filtersMenu.style.maxHeight = "0";
                filtersMenu.style.opacity = "0";
                filtersMenu.style.pointerEvents = "none";

                // Reset the override after the transition completes
                // so the menu can be opened again normally
                setTimeout(() => {
                    filtersMenu.style.maxHeight = "";
                    filtersMenu.style.opacity = "";
                    filtersMenu.style.pointerEvents = "";
                }, 600); 
            }
        });
    });
});