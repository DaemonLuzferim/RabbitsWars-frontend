const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

async function loadComments() {
  const res = await fetch(`${API}/comments`);
  const data = await res.json();

  const list = document.getElementById("commentsList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = `<p class="empty">Aún no hay comentarios</p>`;
    return;
  }

  data.forEach(c => {
    list.innerHTML += `
      <div class="comment">
        <strong>Usuario ${c.user_id}</strong>
        <p>${c.content}</p>
      </div>
    `;
  });
}

async function createComment() {
  const content = commentContent.value.trim();
  if (!content) return alert("No puedes publicar vacío");

  await fetch(`${API}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  commentContent.value = "";
  loadComments();
}

btnComment.onclick = createComment;
btnLogout.onclick = () => {
  localStorage.removeItem("token");
  location.reload();
};

loadComments();
