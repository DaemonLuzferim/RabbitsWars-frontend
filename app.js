const API = "http://localhost:5000/api";

/* =========================
   ELEMENTOS
========================= */
const btnAuth = document.getElementById("btnAuth");
const btnLogout = document.getElementById("btnLogout");
const btnComment = document.getElementById("btnComment");
const commentContent = document.getElementById("commentContent");
const commentsList = document.getElementById("commentsList");
const statusLabel = document.querySelector(".status");

/* MODAL */
const modal = document.getElementById("authModal");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/* =========================
   TOKEN
========================= */
let token = localStorage.getItem("token");

/* =========================
   UI SESIÓN
========================= */
function updateSessionUI() {
  if (token) {
    btnAuth.style.display = "none";
    btnLogout.style.display = "inline-block";
    statusLabel.textContent = "🟢 Conectado";
    statusLabel.classList.add("online");
  } else {
    btnAuth.style.display = "inline-block";
    btnLogout.style.display = "none";
    statusLabel.textContent = "🔴 Desconectado";
    statusLabel.classList.remove("online");
  }
}

/* =========================
   COMENTARIOS
========================= */
async function loadComments() {
  const res = await fetch(`${API}/comments`);
  const data = await res.json();

  commentsList.innerHTML = "";

  if (data.length === 0) {
    commentsList.innerHTML = `<p class="empty">Aún no hay comentarios</p>`;
    return;
  }

  data.forEach(c => {
    commentsList.innerHTML += `
      <div class="comment">
        <strong>Usuario ${c.user_id}</strong>
        <p>${c.content}</p>
      </div>
    `;
  });
}

async function createComment() {
  if (!token) {
    alert("Debes iniciar sesión para comentar");
    return;
  }

  const content = commentContent.value.trim();
  if (!content) return alert("No puedes publicar vacío");

  await fetch(`${API}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  commentContent.value = "";
  loadComments();
}

/* =========================
   AUTH MODAL
========================= */
btnAuth.onclick = () => modal.classList.remove("hidden");

modal.onclick = e => {
  if (e.target === modal) modal.classList.add("hidden");
};

tabLogin.onclick = () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
};

tabRegister.onclick = () => {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
};

/* =========================
   LOGIN
========================= */
loginForm.querySelector("button").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) return alert(data.message || "Error al iniciar sesión");

  localStorage.setItem("token", data.token);
  token = data.token;

  modal.classList.add("hidden");
  updateSessionUI();
};

/* =========================
   REGISTER
========================= */
registerForm.querySelector("button").onclick = async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) return alert(data.message || "Error al registrarse");

  alert("Cuenta creada. Ahora inicia sesión.");
  tabLogin.click();
};

/* =========================
   LOGOUT
========================= */
btnLogout.onclick = () => {
  localStorage.removeItem("token");
  token = null;
  updateSessionUI();
};

/* =========================
   INIT
========================= */
btnComment.onclick = createComment;
updateSessionUI();
loadComments();
