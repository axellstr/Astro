// Contract copy function
function copyContract() {
    const contractText = document.getElementById('contract-text').innerText;
    navigator.clipboard.writeText(contractText);
    
    const indicator = document.getElementById('copy-indicator');
    const copyIcon = document.querySelector('.copy-icon');
    
    // Show the copied indicator
    indicator.style.opacity = '1';
    
    // Change to checkmark icon
    copyIcon.classList.add('success');
    
    // Reset after 2 seconds
    setTimeout(() => {
        indicator.style.opacity = '0';
        copyIcon.classList.remove('success');
    }, 2000);
}

// GSAP Animations
document.addEventListener("DOMContentLoaded", function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initially hide buttons with CSS classes
    const heroButtons = document.querySelectorAll('.hero-buttons .cta-button');
    const socialButtons = document.querySelectorAll('.social-buttons .cta-button');
    const footerIcons = document.querySelectorAll('.footer-social .social-icon');
    
    // Add visibility classes
    heroButtons.forEach(btn => btn.classList.add('hidden-button'));
    socialButtons.forEach(btn => btn.classList.add('hidden-button'));
    footerIcons.forEach(icon => icon.classList.add('hidden-button'));
    
    // Add this style to the head
    const style = document.createElement('style');
    style.textContent = `
        .hidden-button {
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    initAnimations();
    
    // Market Stats functionality initialization (existing code)
    initMarketStats();
});

// Initialize all animations
function initAnimations() {
    // Initial page load animation
    animateHeroSection();
    
    // Scroll-triggered animations
    animateMissionSection();
    animateRoadmapSection();
    animateFaqSection();
    animateCtaSection();
    animateFooter();
}

// Hero section animations
function animateHeroSection() {
    const tl = gsap.timeline({defaults: {ease: "power3.out"}});
    
    tl.from(".contract-copy", {
        y: -20,
        opacity: 1,
        duration: 0.8,
        delay: 0.2
    });
    
    tl.from(".pepe-image img", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, "-=0.4");
    
    tl.from(".hero-tag", {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, "-=0.8");
    
    tl.from("h1", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.6");
    
    tl.from(".subtext", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.6");
    
    // Fix button animation - use a new approach with class removal
    tl.to(".hero-buttons .cta-button", {
        opacity: 1,
        y: 0,
        visibility: "visible",
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        onStart: function() {
            // Remove hidden class as animation starts
            document.querySelectorAll('.hero-buttons .cta-button').forEach(btn => {
                btn.classList.remove('hidden-button');
            });
        }
    }, "-=0.4");
}

// Mission section animations
function animateMissionSection() {
    gsap.from(".mission-content", {
        scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    gsap.from(".mission-section h2", {
        scrollTrigger: {
            trigger: ".mission-section h2",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)"
    });
    
    gsap.from(".mission-text p", {
        scrollTrigger: {
            trigger: ".mission-text",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
}

// Roadmap section animations
function animateRoadmapSection() {
    gsap.from(".roadmap-section h2", {
        scrollTrigger: {
            trigger: ".roadmap-section",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8
    });
    
    // Animate timeline items with stagger
    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".timeline",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
    });
    
    // Animate timeline dots separately
    gsap.from(".timeline-dot", {
        scrollTrigger: {
            trigger: ".timeline",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(2)"
    });
}

// FAQ section animations
function animateFaqSection() {
    gsap.from(".faq-section h2", {
        scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8
    });
    
    gsap.from(".faq-item", {
        scrollTrigger: {
            trigger: ".faq-container",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
    });
}

// CTA section animations
function animateCtaSection() {
    gsap.from(".cta-container", {
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    gsap.from(".cta-section h2", {
        scrollTrigger: {
            trigger: ".cta-section h2",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
    
    gsap.from(".cta-text", {
        scrollTrigger: {
            trigger: ".cta-text",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3
    });
    
    // Fix social button animations with the same new approach
    gsap.to(".social-buttons .cta-button", {
        scrollTrigger: {
            trigger: ".social-buttons",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        visibility: "visible",
        stagger: 0.2,
        duration: 0.6,
        delay: 0.4,
        ease: "back.out(1.7)",
        onStart: function() {
            // Remove hidden class as animation starts
            document.querySelectorAll('.social-buttons .cta-button').forEach(btn => {
                btn.classList.remove('hidden-button');
            });
        }
    });
}

// Footer animations
function animateFooter() {
    gsap.to(".footer-social .social-icon", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        visibility: "visible",
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.4)",
        onStart: function() {
            // Remove hidden class as animation starts
            document.querySelectorAll('.footer-social .social-icon').forEach(icon => {
                icon.classList.remove('hidden-button');
            });
        }
    });
    
    gsap.from(".footer-content p", {
        scrollTrigger: {
            trigger: ".footer-content",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.2
    });
}

// Market Stats functionality
function initMarketStats() {
    const PAIR_ID = '0x4b0aaf3ebb163dd45f663b38b6d93f6093ebc2d3'; // Base blockchain pair address
    const API_URL = `https://api.dexscreener.com/latest/dex/pairs/base/${PAIR_ID}`;
    const REFRESH_INTERVAL = 60000; // 60 seconds

    // Elements
    const priceValue = document.getElementById('price-value');
    const priceChange = document.getElementById('price-change');
    const volumeValue = document.getElementById('volume-value');
    const liquidityValue = document.getElementById('liquidity-value');
    const marketcapValue = document.getElementById('marketcap-value');
    const updateTime = document.getElementById('update-time');
    
    // Skip if market stats section is commented out
    if (!priceValue) return;
    
    // Add a refresh status indicator to the market-stats-container
    const statsContainer = document.querySelector('.market-stats-container');
    const refreshStatus = document.createElement('div');
    refreshStatus.classList.add('refresh-status');
    refreshStatus.innerHTML = `
        <div class="refresh-countdown">
            <span class="countdown-text">Refreshing in </span>
            <span class="countdown-timer">60</span>
            <span class="countdown-text">s</span>
        </div>
        <button class="manual-refresh">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 20a8 8 0 0 0 8-8c0-3.86-2.76-7.5-6.4-8.56C13.28 3.35 13 3.61 13 4v3.17c0 .45.54.67.85.35A4.53 4.53 0 0 1 16.17 12c0 2.52-2.1 4.58-4.65 4.5a4.48 4.48 0 0 1-4.32-4.53c.06-1.47.85-2.75 1.93-3.48.31-.23.27-.8-.08-.95A7.98 7.98 0 0 0 4 12a8 8 0 0 0 8 8z"/>
            </svg>
            <span>Refresh Now</span>
        </button>
    `;
    statsContainer.appendChild(refreshStatus);
    
    // Add a loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');
    loadingOverlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">Updating market data...</div>
    `;
    statsContainer.appendChild(loadingOverlay);
    
    // Get new elements
    const countdownTimer = document.querySelector('.countdown-timer');
    const manualRefreshBtn = document.querySelector('.manual-refresh');
    
    // Format numbers with commas
    function formatNumberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Format currency
    function formatCurrency(value) {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}K`;
        } else {
            return `$${value.toFixed(2)}`;
        }
    }

    // Format price based on value
    function formatPrice(price) {
        if (price < 0.0001) {
            return `$${price.toFixed(8)}`;
        } else if (price < 0.01) {
            return `$${price.toFixed(6)}`;
        } else if (price < 1) {
            return `$${price.toFixed(4)}`;
        } else {
            return `$${price.toFixed(2)}`;
        }
    }

    // Update element with smooth animation
    function updateElementWithAnimation(element, newValue) {
        // Store old value for animation
        const oldValue = element.textContent;
        
        // Create temporary hidden clone to measure new width
        const temp = element.cloneNode(true);
        temp.textContent = newValue;
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        document.body.appendChild(temp);
        
        // Determine if value increased or decreased
        let direction = '';
        if (element.id === 'price-value' || element.id === 'volume-value' || 
            element.id === 'liquidity-value' || element.id === 'marketcap-value') {
            const oldNum = parseFloat(oldValue.replace(/[^0-9.-]+/g, ""));
            const newNum = parseFloat(newValue.replace(/[^0-9.-]+/g, ""));
            direction = newNum > oldNum ? 'increase' : newNum < oldNum ? 'decrease' : '';
        }
        
        // Apply animation
        element.classList.add('updating');
        if (direction) { // Only add direction class if it's not empty
            element.classList.add(direction);
        }
        
        // Update content with animation
        setTimeout(() => {
            element.textContent = newValue;
            document.body.removeChild(temp);
            
            // Remove animation classes after animation completes
            setTimeout(() => {
                element.classList.remove('updating');
                if (direction) {
                    element.classList.remove(direction);
                }
            }, 600);
        }, 200);
    }

    // Show loading state
    function showLoading() {
        loadingOverlay.classList.add('active');
    }
    
    // Hide loading state
    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }
    
    // Display error message
    function showError(message = "Couldn't fetch data. Will retry soon.") {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-message');
        errorMsg.textContent = message;
        
        statsContainer.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.classList.add('fade-out');
            setTimeout(() => {
                statsContainer.removeChild(errorMsg);
            }, 500);
        }, 5000);
    }
    
    // Countdown timer
    let countdownInterval;
    let secondsLeft = REFRESH_INTERVAL / 1000;
    
    function startCountdown() {
        // Clear any existing interval
        if (countdownInterval) clearInterval(countdownInterval);
        
        // Reset seconds
        secondsLeft = REFRESH_INTERVAL / 1000;
        countdownTimer.textContent = secondsLeft;
        
        // Start new countdown
        countdownInterval = setInterval(() => {
            secondsLeft--;
            countdownTimer.textContent = secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // Fetch and update market data
    let isRefreshing = false;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    async function fetchMarketData() {
        // Prevent multiple concurrent fetches
        if (isRefreshing) return;
        
        isRefreshing = true;
        showLoading();
        
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.pairs && data.pairs.length > 0) {
                const pairData = data.pairs[0];
                
                // Update price
                const price = parseFloat(pairData.priceUsd);
                updateElementWithAnimation(priceValue, formatPrice(price));
                
                // Update price change
                const priceChange24h = parseFloat(pairData.priceChange.h24);
                const changeText = `${priceChange24h > 0 ? '+' : ''}${priceChange24h.toFixed(2)}%`;
                updateElementWithAnimation(priceChange, changeText);
                
                if (priceChange24h > 0) {
                    priceChange.classList.add('positive-change');
                    priceChange.classList.remove('negative-change');
                } else if (priceChange24h < 0) {
                    priceChange.classList.add('negative-change');
                    priceChange.classList.remove('positive-change');
                } else {
                    priceChange.classList.remove('positive-change');
                    priceChange.classList.remove('negative-change');
                }
                
                // Update volume
                const volume24h = parseFloat(pairData.volume.h24);
                updateElementWithAnimation(volumeValue, formatCurrency(volume24h));
                
                // Update liquidity
                const liquidity = parseFloat(pairData.liquidity.usd);
                updateElementWithAnimation(liquidityValue, formatCurrency(liquidity));
                
                // Update market cap
                const marketCap = pairData.fdv ? parseFloat(pairData.fdv) : 
                                (pairData.marketCap ? parseFloat(pairData.marketCap) : 0);
                updateElementWithAnimation(marketcapValue, formatCurrency(marketCap));
                
                // Update timestamp
                const now = new Date();
                const timeString = now.toLocaleTimeString();
                updateTime.textContent = timeString;
                
                // Reset retry count on success
                retryCount = 0;
                
                // Start new countdown
                startCountdown();
            } else {
                throw new Error("No data returned from API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            showError();
            
            // Increment retry count
            retryCount++;
            
            // If we've reached max retries, wait longer before next attempt
            if (retryCount >= MAX_RETRIES) {
                setTimeout(() => {
                    retryCount = 0;  // Reset retry counter
                }, REFRESH_INTERVAL * 2);  // Wait double the refresh interval
            }
        } finally {
            hideLoading();
            isRefreshing = false;
            
            // Schedule next update if not already at max retries
            if (retryCount < MAX_RETRIES) {
                setTimeout(fetchMarketData, REFRESH_INTERVAL);
            }
        }
    }
    
    // Manual refresh
    manualRefreshBtn.addEventListener('click', () => {
        clearInterval(countdownInterval);
        fetchMarketData();
    });
    
    // Initial data fetch
    fetchMarketData();
    
    // Start the countdown
    startCountdown();
}

// Intro overlay logic
window.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const music = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');
    const speakerOn = document.getElementById('speaker-on');
    const speakerOff = document.getElementById('speaker-off');

    // Prevent scrolling/interacting with the page while overlay is visible
    document.body.style.overflow = 'hidden';

    enterBtn.addEventListener('click', function() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 600); // matches transition
        if (music) {
            music.currentTime = 0;
            music.volume = 0.05;
            music.play().catch(e => {
                console.warn('Music play failed:', e);
            });
        }
    });

    if (muteBtn && music && speakerOn && speakerOff) {
        muteBtn.addEventListener('click', function() {
            music.muted = !music.muted;
            if (music.muted) {
                speakerOn.style.display = 'none';
                speakerOff.style.display = '';
                muteBtn.classList.add('muted');
            } else {
                speakerOn.style.display = '';
                speakerOff.style.display = 'none';
                muteBtn.classList.remove('muted');
            }
        });
        // Set initial state
        if (music.muted) {
            muteBtn.classList.add('muted');
            speakerOn.style.display = 'none';
            speakerOff.style.display = '';
        } else {
            muteBtn.classList.remove('muted');
            speakerOn.style.display = '';
            speakerOff.style.display = 'none';
        }
    }
}); 