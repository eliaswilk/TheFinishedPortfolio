const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const jumpSound = document.getElementById("jumpSound");
const bikeSound = document.getElementById("bikeSound");
const startButton = document.getElementById("start-button");
const livesCounter = document.getElementById("lives-counter");
const timerDisplay = document.getElementById("timer");

let gameStarted = false;
let lives = 3; // Initialize lives
let isCooldown = false; // Initialize cooldown status
let timerInterval; // Timer interval variable
let timerSeconds = 0; // Timer variable

function updateLivesDisplay() {
  livesCounter.innerText = `Lives: ${lives}`;
}

function updateTimerDisplay() {
  timerDisplay.innerText = `Timer: ${timerSeconds}s`;
}

function jump() {
  if (!gameStarted) return;
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay(); // Update timer display
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0; // Reset timer
  updateTimerDisplay(); // Update timer display
}

let isAlive;

function startGame() {
  if (gameStarted) return; // Prevent starting the game multiple times
  gameStarted = true;
  lives = 3; // Reset lives when the game starts
  timerSeconds = 0; // Reset timer when the game starts
  updateLivesDisplay(); // Update lives display
  updateTimerDisplay(); // Update timer display
  bikeSound.play();

  startButton.style.opacity = '0';
  setTimeout(() => {
    startButton.style.display = 'none';
  }, 300);

  cactus.classList.add("animate");

  startTimer(); // Start the timer

  isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (!isCooldown && cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
      lives--; // Decrement lives
      updateLivesDisplay(); // Update lives display
      if (lives === 0) {
        // If no lives are left, show game over and reset game
        stopTimer(); // Stop the timer
        alert('Game Over');
        gameStarted = false;
        bikeSound.pause();
        bikeSound.currentTime = 0;
        clearInterval(isAlive);
        cactus.classList.remove("animate");
        startButton.style.display = 'block';
        startButton.style.opacity = '1';
      } else {
        // Set cooldown period
        isCooldown = true;
        setTimeout(() => {
          isCooldown = false;
        }, 500); // 0.5 second cooldown
      }
    }
  }, 10);
}

startButton.addEventListener("click", startGame);

document.addEventListener("keydown", function (event) {
  if (!gameStarted) startGame();
  jump();
});
