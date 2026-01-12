const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

/* POSTS */
async function loadPosts() {
  const res = await fetch(`${API}/posts`);
  const data = await res.json();
  const container = document.getElementById("posts");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="post">
        <p>${p.content}</p>
        <small>Usuario ${p.user_id}</small>
      </div>
    `;
  });
}

async function createPost() {
  const content = document.getElementById("postContent").value;

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  document.getElementById("postContent").value = "";
  loadPosts();
}

/* COLORES */
const colors = [
  "#8b0000","#006400","#0b3d91","#4b0082","#2f4f4f",
  "#800000","#013220","#191970","#3b0a45","#1c1c1c",
  "#004d40","#263238","#1a237e","#311b92","#880e4f",
  "#37474f","#1b5e20","#3e2723","#212121","#000000"
];

function loadColors() {
  const bg = document.getElementById("bgColors");
  const text = document.getElementById("textColors");

  colors.forEach(c => {
    const div = document.createElement("div");
    div.style.background = c;
    div.onclick = () => document.documentElement.style.setProperty("--accent", c);
    bg.appendChild(div);

    const t = document.createElement("div");
    t.style.background = c;
    t.onclick = () => document.documentElement.style.setProperty("--text", c);
    text.appendChild(t);
  });
}

function toggleThemePanel() {
  document.getElementById("themePanel").classList.toggle("hidden");
}

function toggleTextPanel() {
  document.getElementById("textPanel").classList.toggle("hidden");
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

loadColors();
loadPosts();
