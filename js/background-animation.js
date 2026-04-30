/**
 * Background Animation - Interactive Particle System
 * Designed for high performance and premium aesthetics.
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.scrollOffset = 0;
        this.targetScrollOffset = 0;
        this.lastScrollY = window.scrollY;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        
        const moveEvent = this.isMobile ? 'touchmove' : 'mousemove';
        window.addEventListener(moveEvent, (e) => {
            const clientX = this.isMobile ? e.touches[0].clientX : e.clientX;
            const clientY = this.isMobile ? e.touches[0].clientY : e.clientY;
            this.mouse.x = clientX;
            this.mouse.y = clientY;
        });

        if (this.isMobile) {
            window.addEventListener('touchend', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        // Optimized scroll handling
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            this.targetScrollOffset = (currentScroll - this.lastScrollY) * 0.5;
            this.lastScrollY = currentScroll;
        }, { passive: true });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init(); 
    }

    init() {
        this.particles = [];
        // Lower density for better performance, especially on mobile
        const density = this.isMobile ? 40000 : 25000;
        const numberOfParticles = Math.min((this.canvas.width * this.canvas.height) / density, this.isMobile ? 40 : 100);
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * (this.isMobile ? 1.5 : 2) + 0.5;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = (Math.random() * 0.4) - 0.2;
            const directionY = (Math.random() * 0.4) - 0.2;
            const color = 'rgba(0, 242, 255, ' + (Math.random() * 0.3 + 0.1) + ')';

            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Smoothly interpolate scroll offset
        this.scrollOffset += (this.targetScrollOffset - this.scrollOffset) * 0.1;

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.canvas, this.mouse, this.scrollOffset);
            this.particles[i].draw(this.ctx);
        }
        
        // Skip connections on low-end mobile if needed, but let's try optimized first
        this.connect();
        
        // Decay target scroll offset
        this.targetScrollOffset *= 0.9;
    }

    connect() {
        let opacityValue = 1;
        const maxDistance = this.isMobile ? 10000 : 15000;
        
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a + 1; b < this.particles.length; b++) {
                let dx = this.particles[a].x - this.particles[b].x;
                let dy = this.particles[a].y - this.particles[b].y;
                let distance = dx * dx + dy * dy;
                
                if (distance < maxDistance) {
                    opacityValue = 1 - (distance / maxDistance);
                    this.ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue * (this.isMobile ? 0.1 : 0.15) + ')';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(canvas, mouse, scrollOffset) {
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY - (scrollOffset * 0.2);

        // Wrap around
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Mouse interaction (only if mouse is active)
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const moveX = (dx / distance) * force * 2;
                const moveY = (dy / distance) * force * 2;
                this.x -= moveX;
                this.y -= moveY;
            }
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('bg-canvas');
});
