// Local database
const database = [
  { name: "Rifhan Ardae", id: "57747", house: "Ravenclaw" },
  { name: "1", id: "1", house: "Gryffindor" },
  { name: "2", id: "2", house: "Ravenclaw" },
  { name: "3", id: "3", house: "Hufflepuff" },
  { name: "4", id: "4", house: "Slytherin" }
];

// Sorting Hat functionality
function sortHouse() {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('password').value.trim();

  if (!name || !id) {
    alert("Please fill in both fields.");
    return;
  }

  // Find the user in the database
  const user = database.find(entry => entry.name === name && entry.id === id);

  if (user) {
    const housePage = `${user.house.toLowerCase()}.html`;

    // Show the loading screen
    showLoadingScreen();

    // Simulate loading time before redirecting
    setTimeout(() => {
      window.location.href = housePage;
    }, 2000); // Wait for 2 seconds before redirect
  } else {
    alert("Invalid name or ID. Please try again.");
  }
}

// Particle Effect
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.02;
  }

  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function createParticles() {
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  createParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Show the loading screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.display = 'flex';
}
