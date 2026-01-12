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
      <article class="post">
        <div class="post-header">
          <strong>Usuario ${p.user_id}</strong>
        </div>
        <p>${p.content}</p>
        <div class="post-footer">
          <span>💬 Comentar</span>
          <span>❤️ Me gusta</span>
        </div>
      </article>
    `;
  });
}

async function createPost() {
  const content = postContent.value.trim();

  if (!content) {
    alert("No puedes publicar vacío");
    return;
  }

  if (!token) {
    alert("Sesión no válida");
    return;
  }

  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    alert("Error al publicar");
    return;
  }

  postContent.value = "";
  loadPosts();
}

/* COLORES */
const colors = ["#8b0000","#1b5e20","#0d47a1","#311b92","#212121"];

function loadColors() {
  colors.forEach(c => {
    const b = document.createElement("div");
    b.style.background = c;
    b.onclick = () => document.documentElement.style.setProperty("--accent", c);
    bgColors.appendChild(b);

    const t = document.createElement("div");
    t.style.background = c;
    t.onclick = () => document.documentElement.style.setProperty("--text", c);
    textColors.appendChild(t);
  });
}

/* UI */
btnTheme.onclick = () => themePanel.classList.toggle("hidden");
btnText.onclick = () => textPanel.classList.toggle("hidden");
btnLogout.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};
btnPost.onclick = createPost;

loadColors();
loadPosts();
