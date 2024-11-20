(function () {
    window.addEventListener('load', function () {
        const pageLoaded = performance.mark('pageLoaded');
        const loadTime = pageLoaded.startTime / 1000;

        const footer = document.querySelector('footer');
        footer.innerHTML = `Page load time is ${loadTime.toFixed(2)} seconds.`;

        const currentPath = document.location.pathname.split('/').pop();
        const menuItems = document.querySelectorAll(".top-navigation ul li a");
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });
    });
})();