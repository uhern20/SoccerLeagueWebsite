// admin-code.js
const ADMIN_CODE = "testr";

const form = document.getElementById("code-form");
const input = document.getElementById("admin-code");
const status = document.getElementById("admin-status");
const logoutBtn = document.getElementById("logout-btn");
const errorMsg = document.getElementById("error-message");

function updateStatus() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (isAdmin) {
    status.textContent = "✅ You are logged in as admin";
    logoutBtn.style.display = "block";
    form.style.display = "none";
  } else {
    status.textContent = "You are not logged in as admin.";
    logoutBtn.style.display = "none";
    form.style.display = "block";
  }
}

// Login
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === ADMIN_CODE) {
    localStorage.setItem("isAdmin", "true");
    updateStatus();
    alert("Logged in as admin!");
  } else {
    errorMsg.textContent = "Incorrect administrator code.";
    input.value = "";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  updateStatus();
});

updateStatus();
