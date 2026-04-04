// ==========================================
// PARTICLE BACKGROUND ANIMATION
// ==========================================

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 65;
        this.mobileParticleCount = 25;
        this.connectionDistance = 210;
        this.mouse = { x: null, y: null, radius: 50 };
        this.isHovering = false;

        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';

        this.container.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.container.addEventListener('mouseleave', () => this.handleMouseOut());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.safeZone = {
            left: this.canvas.width * 0.42,
            right: this.canvas.width * 0.58,
            top: this.canvas.height * 0.3,
            bottom: this.canvas.height * 0.58
        };
    }

    createParticles() {
        this.particles = [];
        const particleCount = window.innerWidth <= 900 ? this.mobileParticleCount : this.particleCount;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height, this.safeZone));
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleMouseEnter() {
        this.isHovering = true;
        this.mouse.radius = 95;
    }

    handleMouseOut() {
        this.isHovering = false;
        this.mouse.x = null;
        this.mouse.y = null;
        this.mouse.radius = 50;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height, this.mouse);
            particle.draw(this.ctx);
        });

        // Draw connections
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.strokeStyle = isDark
                        ? `rgba(139, 92, 246, ${opacity * 0.36})`
                        : `rgba(99, 102, 241, ${opacity * 0.24})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight, safeZone) {
        const start = Particle.getSidePosition(canvasWidth, canvasHeight, safeZone);

        this.x = start.x;
        this.y = start.y;
        this.size = Math.random() * 6 + 3;
        this.speedX = (Math.random() - 0.5) * 0.32;
        this.speedY = (Math.random() - 0.5) * 0.32;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.safeZone = safeZone;
    }

    static getSidePosition(canvasWidth, canvasHeight, safeZone) {
        const side = Math.random() < 0.5 ? 'left' : 'right';
        const margin = 30;
        const verticalPadding = canvasHeight * 0.08;
        const x = side === 'left'
            ? Math.random() * Math.max(safeZone.left - margin, margin)
            : safeZone.right + Math.random() * Math.max(canvasWidth - safeZone.right - margin, margin);
        const y = verticalPadding + Math.random() * Math.max(canvasHeight - verticalPadding * 2, 1);

        return { x, y };
    }

    update(canvasWidth, canvasHeight, mouse) {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;

            if (distance < mouse.radius) {
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;
                this.x -= directionX;
                this.y -= directionY;
            }
        }

        // Return to base position
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        this.x += dx * 0.05;
        this.y += dy * 0.05;

        // Move particles
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Keep the central hero text area clearer by nudging particles to the sides.
        if (
            this.baseX > this.safeZone.left &&
            this.baseX < this.safeZone.right &&
            this.baseY > this.safeZone.top &&
            this.baseY < this.safeZone.bottom
        ) {
            this.baseX += this.baseX < canvasWidth / 2 ? -0.35 : 0.35;
        }

        // Bounce off edges
        if (this.baseX < 0 || this.baseX > canvasWidth) {
            this.speedX *= -1;
            this.baseX = Math.max(0, Math.min(canvasWidth, this.baseX));
        }
        if (this.baseY < 0 || this.baseY > canvasHeight) {
            this.speedY *= -1;
            this.baseY = Math.max(0, Math.min(canvasHeight, this.baseY));
        }
    }

    draw(ctx) {
        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        // Particle glow effect
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3.8
        );

        if (isDark) {
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.9)');
            gradient.addColorStop(0.45, 'rgba(99, 102, 241, 0.5)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        } else {
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
            gradient.addColorStop(0.45, 'rgba(99, 102, 241, 0.5)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==========================================
// GRADIENT ANIMATION BACKGROUND
// ==========================================

class GradientAnimation {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;

        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = '0.15';
        this.canvas.style.pointerEvents = 'none';

        this.container.insertBefore(this.canvas, this.container.firstChild);

        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    animate() {
        this.time += 0.005;

        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        // Create animated gradient
        const gradient = this.ctx.createLinearGradient(
            0, 0,
            this.canvas.width * Math.cos(this.time),
            this.canvas.height * Math.sin(this.time)
        );

        if (isDark) {
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
            gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.3)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0.3)');
        } else {
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.2)');
            gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.2)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)');
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// FLOATING SHAPES ANIMATION
// ==========================================

class FloatingShapes {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.shapeCount = 15;

        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = '0.1';
        this.canvas.style.pointerEvents = 'none';

        this.container.insertBefore(this.canvas, this.container.firstChild);

        this.resize();
        this.createShapes();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createShapes() {
        this.shapes = [];
        const shapeTypes = ['circle', 'square', 'triangle'];

        for (let i = 0; i < this.shapeCount; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 100 + 50,
                type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
                speedY: Math.random() * 0.5 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const theme = document.documentElement.getAttribute('data-theme');
        const isDark = theme === 'dark';

        this.shapes.forEach(shape => {
            // Update position
            shape.y -= shape.speedY;
            shape.rotation += shape.rotationSpeed;

            // Reset if off screen
            if (shape.y + shape.size < 0) {
                shape.y = this.canvas.height + shape.size;
                shape.x = Math.random() * this.canvas.width;
            }

            // Draw shape
            this.ctx.save();
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);

            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size / 2);
            if (isDark) {
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            }

            this.ctx.fillStyle = gradient;
            this.ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(99, 102, 241, 0.15)';
            this.ctx.lineWidth = 2;

            if (shape.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            } else if (shape.type === 'square') {
                this.ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                this.ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            } else if (shape.type === 'triangle') {
                this.ctx.beginPath();
                this.ctx.moveTo(0, -shape.size / 2);
                this.ctx.lineTo(shape.size / 2, shape.size / 2);
                this.ctx.lineTo(-shape.size / 2, shape.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
            }

            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// INITIALIZE PARTICLE SYSTEM
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        new ParticleSystem(particlesContainer);
    }
});
