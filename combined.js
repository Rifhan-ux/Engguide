// URL ของ Google Apps Script Web App
const scriptURL = 'https://script.google.com/macros/s/AKfycbxTDp-D-0hX8_rdNN1UGoR_70uxJPSEZhQQDc8-ZpQSBxx2dzarDwpQcO6ueevN6I8mwA/exec';

let database = []; // จะเก็บข้อมูลจาก Web App

// ดึงข้อมูลจาก Web App
// ดึงข้อมูลจาก Web App
async function fetchDatabase() {
    try {
        const response = await fetch(scriptURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const rawData = await response.json(); // ดึงข้อมูลจาก Web App

        // กรองข้อมูลให้เหลือเฉพาะข้อมูลล่าสุดของแต่ละ name
        const uniqueData = {};
        rawData.forEach(entry => {
            uniqueData[entry.name] = entry; // ทับข้อมูลเดิมด้วยข้อมูลใหม่ (ใช้ key เป็น name)
        });

        // เปลี่ยนเป็น array สำหรับใช้งาน
        database = Object.values(uniqueData);

        console.log("Filtered Database (Latest Only):", database);

        // แจ้งเตือนข้อมูลในฐานข้อมูล
        const databaseText = database.map(
            entry => `Name: ${entry.name}, ID: ${entry.id}, House: ${entry.house}`
        ).join('\n');
                             alert(`Filtered Database:\n${databaseText}`); // โชว์แจ้งเตือนเมื่อโหลดหน้าเว็บ
    } catch (error) {
        console.error('Error fetching database:', error);
        alert("ไม่สามารถโหลดฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง.");
    }
}

  

// เรียก fetchDatabase เมื่อโหลดหน้าเว็บ
window.onload = fetchDatabase;

// Sorting Hat functionality
// Sorting Hat functionality
function sortHouse() {
    // ดึงค่าจากฟอร์ม
    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('password').value.trim();

    // ตรวจสอบว่ามีการกรอกข้อมูลครบหรือไม่
    if (!name || !id) {
        alert("Please fill in both fields.");
        return;
    }

    // Debugging: ตรวจสอบค่าจากฟอร์มและฐานข้อมูล
    console.log("Name input:", name);
    console.log("ID input:", id);
    console.log("Database:", database);

    // ค้นหาผู้ใช้ในฐานข้อมูล (เปรียบเทียบทั้งชื่อและเลขประจำตัว)
    const user = database.find(entry => entry.name === name && String(entry.id) === id);

    if (user) {
        const housePage = `${user.house.toLowerCase()}.html`; // กำหนด URL ของหน้าบ้าน (house)
        showLoadingScreen();
        setTimeout(() => {
            window.location.href = housePage;
        }, 2000); // หน่วงเวลา 2 วินาทีก่อนเปลี่ยนหน้า
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

// Audio and Subtitles
const audio = document.getElementById("backgroundAudio");
const audioButton = document.getElementById("audioControlButton");
const subtitles = document.getElementById("subtitles");

// ซับไตเติลและเวลา (หน่วยเป็นวินาที)
const lyrics = [
  { time: 0, text: "" },
  { time: 10.5, text: "One thousand years ago this story starts" },
  { time: 16, text: "There were four sorcerers with strong and wise hearts" },
  { time: 21, text: "Bold Gryffindor from wild moor" },
  { time: 24, text: "Fair Ravenclaw from glen" },
  { time: 26.5, text: "Sweet Hufflepuff from valley broad" },
  { time: 29, text: "Shrewd Slytherin from fen" },
  { time: 36, text: "They had a dream to teach all that they knew" },
  { time: 41, text: "Witches and wizards came far and it grew" },
  { time: 46, text: "'Til a castle stood tall by the shores of a lake" },
  { time: 52, text: "And a thousand years later the magic remains" },
  { time: 67, text: "Old Hogwarts Sorting Hat sing me a song" },
  { time: 72, text: "Speak in my head tell me where I belong" },
  { time: 77, text: "And when things look bad and there's nowhere to run" },
  { time: 82, text: "Unite all the houses and we'll fight as one" },
  { time: 97, text: "Brave Godric Gryffindor favoured the strong" },
  { time: 102, text: "Those who had courage and knew right from wrong" },
  { time: 108, text: "And Rowena Ravenclaw taught only the best" },
  { time: 113, text: "So kind Helga Hufflepuff would teach all the rest" },
  { time: 123, text: "But Salazar Slytherin had his own plans" },
  { time: 128, text: "He thought the Muggle-borns didn't understand" },
  { time: 133, text: "The subtleties of magic and so he devised" },
  { time: 138, text: "The Chamber of Secrets with a monster inside" },
  { time: 154, text: "Old Hogwarts Sorting Hat sing me a song" },
  { time: 158, text: "Speak in my head tell me where I belong" },
  { time: 164, text: "And when things look bad and there's nowhere to run" },
  { time: 169, text: "Unite all the houses and we'll fight as one" },
  { time: 195, text: "Old Hogwarts Sorting Hat sing me a song" },
  { time: 200, text: "Speak in my head tell me where I belong" },
  { time: 205, text: "And when things look bad and there's nowhere to run" },
  { time: 210, text: "Unite all the houses and we'll fight as one" },
  { time: 220, text: "Unite all the houses and we'll fight as one." },
];

let currentSubtitleIndex = 0;

function updateSubtitles() {
  const currentTime = audio.currentTime;

  if (
    currentSubtitleIndex < lyrics.length - 1 &&
    currentTime >= lyrics[currentSubtitleIndex + 1].time
  ) {
    currentSubtitleIndex++;
  }

  subtitles.innerText = lyrics[currentSubtitleIndex]?.text || "";
}

audioButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    audioButton.innerText = "Pause Sound";
  } else {
    audio.pause();
    audioButton.innerText = "Play Sound";
  }
});

audio.addEventListener("timeupdate", updateSubtitles);
