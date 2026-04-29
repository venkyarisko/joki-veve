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
        this.lastScrollY = window.scrollY;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            this.scrollOffset = (currentScroll - this.lastScrollY) * 0.5;
            this.lastScrollY = currentScroll;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init(); // Re-init on resize to adjust density
    }

    init() {
        this.particles = [];
        // Lower density for better performance
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 25000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 2 + 0.5;
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

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.canvas, this.mouse, this.scrollOffset);
            this.particles[i].draw(this.ctx);
        }
        this.connect();
        
        // Decay scroll offset
        this.scrollOffset *= 0.9;
    }

    connect() {
        let opacityValue = 1;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                let distance = ((this.particles[a].x - this.particles[b].x) * (this.particles[a].x - this.particles[b].x))
                    + ((this.particles[a].y - this.particles[b].y) * (this.particles[a].y - this.particles[b].y));
                
                if (distance < 15000) { // Fixed small distance for better performance
                    opacityValue = 1 - (distance / 15000);
                    this.ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue * 0.15 + ')';
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

        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height) {
            this.y = 0; // Wrap around for scroll effect
        } else if (this.y < 0) {
            this.y = canvas.height;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('bg-canvas');
});
