const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

/* ========= POSTS ========= */
async function loadPosts() {
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    container.innerHTML += `
      <article class="post">
        <p>${p.content}</p>
        <small>Usuario #${p.user_id}</small>
      </article>
    `;
  });
}

async function createPost() {
  const content = postContent.value.trim();
  if (!content) return;

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  postContent.value = "";
  loadPosts();
}

/* ========= COLORES ========= */
const colors = [
  "#8b0000","#1b5e20","#0d47a1","#311b92","#263238",
  "#4a148c","#004d40","#3e2723","#212121","#000000"
];

function loadColors() {
  colors.forEach(c => {
    const bg = document.createElement("div");
    bg.style.background = c;
    bg.onclick = () => document.documentElement.style.setProperty("--accent", c);
    bgColors.appendChild(bg);

    const t = document.createElement("div");
    t.style.background = c;
    t.onclick = () => document.documentElement.style.setProperty("--text", c);
    textColors.appendChild(t);
  });
}

/* ========= UI ========= */
btnTheme.onclick = () => themePanel.classList.toggle("hidden");
btnText.onclick = () => textPanel.classList.toggle("hidden");
btnLogout.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};
btnPost.onclick = createPost;

/* INIT */
loadColors();
loadPosts();
