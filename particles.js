const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full-screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold particles
const particlesArray = [];

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `rgba(99, 99, 99, ${Math.random()})`; // Orange color
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Re-position particles when they move off-screen
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize particles
function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

// Handle resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start animation
init();
animate();
