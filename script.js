// M.M7 - Your Hunger Partner
// Simple chat + login logic (localStorage-based demo)

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("chat-message");
const chatBox = document.getElementById("chat-box");
const orderBtn = document.getElementById("order-btn");

// Predefined admin credentials
const ADMIN_EMAIL = "admin@mm7.com";
const ADMIN_PASS = "mm7admin";

let currentUser = null;

// Load previous session if exists
if (localStorage.getItem("mm7_user")) {
  currentUser = JSON.parse(localStorage.getItem("mm7_user"));
  showChat();
}

loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const pass = passwordInput.value.trim();

  if (!email || !pass) {
    alert("Please enter both email and password");
    return;
  }

  // Check if admin
  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    window.location.href = "admin.html";
    return;
  }

  currentUser = { email };
  localStorage.setItem("mm7_user", JSON.stringify(currentUser));
  showChat();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("mm7_user");
  currentUser = null;
  chatBox.innerHTML = "";
  chatScreen.classList.remove("active");
  loginScreen.classList.add("active");
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "sent");
  messageInput.value = "";

  // Simulate auto-reply
  setTimeout(() => {
    appendMessage("Got it! We'll prepare your snack 🍪", "received");
  }, 700);
}

function appendMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

orderBtn.addEventListener("click", () => {
  appendMessage("I'd like to order snacks 🍫🍟", "sent");
  setTimeout(() => {
    appendMessage("Sure! Please share your snack pack preference 😋", "received");
  }, 600);
});

function showChat() {
  loginScreen.classList.remove("active");
  chatScreen.classList.add("active");
}
