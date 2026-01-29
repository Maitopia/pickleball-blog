// Main script for The Court Report

// Newsletter form handler
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    alert(`🎉 Thanks for subscribing! We'll send pickleball tips to ${email}`);
    e.target.reset();
}

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
    } else {
        header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Add glowing effect on hover for neon elements
document.addEventListener('DOMContentLoaded', () => {
    // Add particle effect background (optional enhancement)
    createStarField();
});

// Create subtle star field background effect
function createStarField() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 100;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
    
    // Animate stars
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Twinkle effect
            star.opacity += (Math.random() - 0.5) * 0.02;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // Move star slowly
            star.y += star.speed;
            
            // Reset if off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

console.log('🏓 The Court Report loaded successfully!');
console.log('💡 Tip: Click "Admin" to create and manage articles!');
