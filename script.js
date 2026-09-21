/* ==========================================================================
   FREESIA NIKOL 🌼 - INTERACTIVITY & NAVIGATION SCRIPT
   ========================================================================== */

// --- Sequential Screen Flow Order ---
const SCREEN_SEQUENCE = [
  "screen-login",
  "screen-welcome",
  "screen-msg-1",
  "screen-msg-2",
  "screen-msg-3",
  "screen-msg-4",
  "screen-msg-5",
  "screen-msg-6",
  "screen-msg-7",
  "screen-msg-8",
  "screen-msg-9",
  "screen-msg-10",
  "screen-msg-11",
  "screen-msg-12",
  "screen-msg-13",
  "screen-trap",
  "screen-flower-anim",
  "screen-find-button",
  "screen-final-question",
  "screen-celebration"
];

let currentScreenIndex = 0;
let trapYesScale = 1;
let finalYesScale = 1;

// Initialize Ambient Particles on Load
document.addEventListener("DOMContentLoaded", () => {
  createAmbientParticles();
  setupHiddenButtonField();
});

// --- Ambient Background Particles Generator ---
function createAmbientParticles() {
  const container = document.getElementById("ambient-container");
  if (!container) return;

  const particleSymbols = ["🌼", "✨", "💛", "🌸", "🍃", "💛"];
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span");
    p.className = "ambient-particle";
    p.innerText = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${6 + Math.random() * 6}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    p.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
    container.appendChild(p);
  }
}

// --- Screen Switcher ---
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(s => s.classList.remove("active"));

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  // Handle screen specific trigger events
  if (screenId === "screen-flower-anim") {
    start5SecondFlowerAnimation();
  } else if (screenId === "screen-celebration") {
    triggerCelebrationAndPoem();
  }
}

function nextScreen() {
  if (currentScreenIndex < SCREEN_SEQUENCE.length - 1) {
    currentScreenIndex++;
    showScreen(SCREEN_SEQUENCE[currentScreenIndex]);
  }
}

// --- 1. Login Page Logic ---
function handleLogin() {
  const input = document.getElementById("password-input");
  const errorMsg = document.getElementById("login-error");
  const enteredPassword = input ? input.value : "";

  // Password MUST be exactly: "Norie Tham Llido"
  if (enteredPassword === "Norie Tham Llido") {
    if (errorMsg) errorMsg.classList.add("hidden");
    nextScreen();
  } else {
    if (errorMsg) {
      errorMsg.classList.remove("hidden");
      // Trigger shake animation
      errorMsg.style.animation = "none";
      void errorMsg.offsetWidth; // re-flow
      errorMsg.style.animation = "shake 0.4s ease-in-out";
    }
  }
}

// --- 2. Trap Page Logic ---
function handleTrapNo() {
  const yesBtn = document.getElementById("trap-yes-btn");
  if (yesBtn) {
    trapYesScale += 0.35;
    yesBtn.style.transform = `scale(${trapYesScale})`;
    yesBtn.style.zIndex = "100";
  }
}

function handleTrapYes() {
  // Reset transform
  const yesBtn = document.getElementById("trap-yes-btn");
  if (yesBtn) yesBtn.style.transform = "scale(1)";
  trapYesScale = 1;

  nextScreen();
}

// --- 3. 5-Second Yellow Flower Animation ---
function start5SecondFlowerAnimation() {
  const canvas = document.getElementById("full-flower-canvas");
  if (!canvas) return;

  // Clear existing items apart from text
  const textElem = canvas.querySelector(".flower-curtain-center");
  canvas.innerHTML = "";
  if (textElem) canvas.appendChild(textElem);

  const icons = ["🌼", "💛", "🍃", "✨", "🌸", "🌻"];
  const numFlowers = 45;

  for (let i = 0; i < numFlowers; i++) {
    const el = document.createElement("span");
    el.innerText = icons[Math.floor(Math.random() * icons.length)];
    el.style.position = "absolute";
    el.style.left = `${Math.random() * 92}%`;
    el.style.top = `${Math.random() * 90}%`;
    el.style.fontSize = `${1.5 + Math.random() * 2.5}rem`;
    el.style.zIndex = "1";
    el.style.opacity = "0.9";
    el.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
    el.style.animation = `float ${2 + Math.random() * 2}s ease-in-out infinite alternate`;
    canvas.appendChild(el);
  }

  // Automatically advance after 5 seconds (5000ms)
  setTimeout(() => {
    nextScreen();
  }, 5000);
}

// --- 4. Find The Button Screen ---
function setupHiddenButtonField() {
  const field = document.getElementById("hidden-button-field");
  if (!field) return;

  field.innerHTML = "";
  const totalItems = 35;
  const targetIndex = Math.floor(Math.random() * (totalItems - 5)) + 3; // Random spot inside

  for (let i = 0; i < totalItems; i++) {
    if (i === targetIndex) {
      const btn = document.createElement("button");
      btn.className = "btn hidden-target-btn";
      btn.innerText = "CLICK HERE 🌼";
      btn.onclick = () => nextScreen();
      field.appendChild(btn);
    } else {
      const deco = document.createElement("span");
      deco.className = "deco-flower";
      deco.innerText = Math.random() > 0.3 ? "🌼" : "🍃";
      field.appendChild(deco);
    }
  }
}

// --- 5. Final Question Screen Logic ---
function handleFinalNo() {
  const yesBtn = document.getElementById("final-yes-btn");
  if (yesBtn) {
    finalYesScale += 0.4;
    yesBtn.style.transform = `scale(${finalYesScale})`;
    yesBtn.style.zIndex = "100";
  }
}

function handleFinalYes() {
  const yesBtn = document.getElementById("final-yes-btn");
  if (yesBtn) yesBtn.style.transform = "scale(1)";
  finalYesScale = 1;

  nextScreen();
}

// --- 6. Celebration & Poem Reveal ---
function triggerCelebrationAndPoem() {
  // Spawn continuous celebration particles
  const container = document.getElementById("ambient-container");
  if (container) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("span");
      p.className = "ambient-particle";
      p.innerText = ["🌼", "💛", "✨", "🌸"][Math.floor(Math.random() * 4)];
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${3 + Math.random() * 3}s`;
      p.style.fontSize = `${1.2 + Math.random() * 1.2}rem`;
      container.appendChild(p);
    }
  }

  // Gradually reveal lines of the love poem
  const lines = document.querySelectorAll(".poem-line");
  const signature = document.querySelector(".poem-signature");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("visible");
    }, 400 + index * 450);
  });

  if (signature) {
    setTimeout(() => {
      signature.classList.add("visible");
    }, 400 + lines.length * 450 + 600);
  }
}
