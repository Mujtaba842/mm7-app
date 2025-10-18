// M.M7 Admin Panel Logic

const adminLoginScreen = document.getElementById("admin-login");
const adminPanel = document.getElementById("admin-panel");
const adminEmail = document.getElementById("admin-email");
const adminPassword = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminLogoutBtn = document.getElementById("admin-logout-btn");
const adminChatBox = document.getElementById("admin-chat-box");
const adminMessage = document.getElementById("admin-message");
const adminSendBtn = document.getElementById("admin-send-btn");

// Admin credentials
const ADMIN_EMAIL = "admin@mm7.com";
const ADMIN_PASS = "mm7admin";

// Load session
if (localStorage.getItem("mm7_admin")) {
  showAdminPanel();
}

adminLoginBtn.addEventListener("click", () => {
  const email = adminEmail.value.trim();
  const pass = adminPassword.value.trim();

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    localStorage.setItem("mm7_admin", "true");
    showAdminPanel();
  } else {
    alert("Invalid admin credentials");
  }
});

adminLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("mm7_admin");
  adminPanel.classList.remove("active");
  adminLoginScreen.classList.add("active");
});

adminSendBtn.addEventListener("click", sendAdminMessage);
adminMessage.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendAdminMessage();
});

function sendAdminMessage() {
  const msg = adminMessage.value.trim();
  if (!msg) return;
  appendAdminMessage("Admin: " + msg, "sent");
  adminMessage.value = "";
}

function appendAdminMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  adminChatBox.appendChild(div);
  adminChatBox.scrollTop = adminChatBox.scrollHeight;
}

function showAdminPanel() {
  adminLoginScreen.classList.remove("active");
  adminPanel.classList.add("active");
  adminChatBox.innerHTML = "";

  appendAdminMessage("Customer: Hey, I’d like to order snacks 🍟", "received");
  appendAdminMessage("Customer: Midnight Munchies please 😋", "received");
}
