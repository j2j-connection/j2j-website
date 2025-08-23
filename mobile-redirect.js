// 📱 Mobile Detection and Redirect Script
(function() {
    // Check if we're already on mobile.html to prevent redirect loops
    if (window.location.pathname.includes('mobile.html')) {
        return;
    }
    
    // Mobile detection function
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const screenWidth = window.innerWidth || screen.width;
        
        // Check user agent for mobile indicators
        const mobileKeywords = [
            'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 
            'windows phone', 'mobile', 'opera mini'
        ];
        
        const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
        
        // Check screen width (mobile-first approach)
        const isMobileScreen = screenWidth <= 768;
        
        // Check for touch support
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return isMobileUA || (isMobileScreen && isTouchDevice);
    }
    
    // Check for manual override (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const forceDesktop = urlParams.get('desktop') === 'true';
    const forceMobile = urlParams.get('mobile') === 'true';
    
    if (forceMobile || (!forceDesktop && isMobileDevice())) {
        // Add current hash to preserve deep links
        const currentHash = window.location.hash;
        const mobileUrl = 'mobile.html' + currentHash;
        
        // Redirect to mobile version
        window.location.replace(mobileUrl);
    }
})();