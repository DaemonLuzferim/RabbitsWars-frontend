// ===============================
// CONFIGURACIÓN GENERAL API
// ===============================
const API = "http://localhost:5000/api";

// ===============================
// TOKEN & SESIÓN
// ===============================
function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("role");
}

function isLoggedIn() {
  return !!getToken();
}

function logout() {
  localStorage.clear();
  window.location.href = "../index.html";
}