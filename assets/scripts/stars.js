// Three.js Star Field Animation
let scene, camera, renderer;
let stars = [];

function initStars() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('stars-container').appendChild(renderer.domElement);
    
    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // More subtle star colors - primarily white with slight tint variations
    const starColors = [
        0xFFFFFF,  // White
        0xF8F8FF,  // Ghost White
        0xFAFAFF,  // Snow White
        0xF0F8FF,  // Alice Blue (very subtle blue tint)
        0xF5F5F5,  // White Smoke
    ];
    
    // Create stars with smaller sizes
    for (let i = 0; i < 800; i++) {
        // Much smaller stars
        const size = 0.05 + Math.random() * 0.15;
        const starGeometry = new THREE.SphereGeometry(size, 8, 8);
        
        // Randomly select a color for each star
        const colorIndex = Math.floor(Math.random() * starColors.length);
        const starMaterial = new THREE.MeshBasicMaterial({ 
            color: starColors[colorIndex],
            transparent: true,
            opacity: 0.3 + Math.random() * 0.4
        });
        
        const star = new THREE.Mesh(starGeometry, starMaterial);
        
        // Add a very subtle glow effect to some stars (less frequently)
        if (Math.random() > 0.85) {
            const glowSize = size * (1.2 + Math.random() * 0.3);
            const glowGeometry = new THREE.SphereGeometry(glowSize, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: starColors[colorIndex],
                transparent: true,
                opacity: 0.07,
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            star.add(glow);
        }
        
        // Random position but in a spherical distribution
        const radius = 40 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        star.position.x = radius * Math.sin(phi) * Math.cos(theta);
        star.position.y = radius * Math.sin(phi) * Math.sin(theta);
        star.position.z = radius * Math.cos(phi);
        
        // Store initial position for animation
        star.userData = {
            radius: radius,
            theta: theta,
            phi: phi,
            rotationSpeed: 0.0002 + Math.random() * 0.0005,
            // Add pulse effect data (more subtle)
            pulseSpeed: 0.005 + Math.random() * 0.01,
            pulseAmount: 0.05 + Math.random() * 0.1,
            pulseOffset: Math.random() * Math.PI * 2, // Random starting point in the pulse cycle
            originalSize: size
        };
        
        scene.add(star);
        stars.push(star);
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Smooth fade-in effect for stars container
    const starsContainer = document.getElementById('stars-container');
    starsContainer.style.opacity = '0';
    
    // Start animation
    animate();
    
    // Fade in the stars after a small delay
    setTimeout(() => {
        starsContainer.classList.add('fade-in');
    }, 100);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001; // Current time in seconds
    
    // Rotate and animate stars - keeping the same motion
    stars.forEach(star => {
        const userData = star.userData;
        userData.theta += userData.rotationSpeed;
        
        star.position.x = userData.radius * Math.sin(userData.phi) * Math.cos(userData.theta);
        star.position.y = userData.radius * Math.sin(userData.phi) * Math.sin(userData.theta);
        star.position.z = userData.radius * Math.cos(userData.phi);
        
        // Add very subtle pulsing effect to stars (much less frequent)
        if (Math.random() > 0.998) { // Very occasional twinkle
            star.scale.set(1.1, 1.1, 1.1);
            setTimeout(() => {
                if (star) star.scale.set(1, 1, 1);
            }, 120);
        }
        
        // Continuous pulsing effect for some stars (more subtle)
        if (userData.pulseAmount > 0.08) { // Only apply to stars with higher pulse amount (random selection)
            const pulse = Math.sin(time * userData.pulseSpeed + userData.pulseOffset) * userData.pulseAmount + 1;
            star.scale.set(pulse, pulse, pulse);
        }
    });
    
    // Slowly rotate the entire scene for added effect (keeping same motion)
    scene.rotation.y += 0.0003;
    scene.rotation.x = Math.sin(time * 0.1) * 0.01; // Subtle wobble
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add scroll-based opacity adjustment
function adjustStarsOnScroll() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    // Get scroll position as percentage of page
    const scrollPosition = window.scrollY;
    const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.clientHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight
    ) - window.innerHeight;
    
    // Calculate opacity based on scroll position
    // Full opacity at top, fades to 30% at bottom
    const scrollPercentage = scrollPosition / docHeight;
    const minOpacity = 0.3; // Minimum opacity at bottom of page
    const maxOpacity = 0.6; // Maximum opacity at top of page
    const opacity = maxOpacity - (scrollPercentage * (maxOpacity - minOpacity));
    
    starsContainer.style.opacity = opacity.toString();
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }
    
    // Create container div if it doesn't exist
    if (!document.getElementById('stars-container')) {
        const starsContainer = document.createElement('div');
        starsContainer.id = 'stars-container';
        document.body.insertBefore(starsContainer, document.body.firstChild);
    }
    
    // Initialize the star field
    initStars();
    
    // Add scroll listener for opacity adjustment
    window.addEventListener('scroll', adjustStarsOnScroll);
}); 