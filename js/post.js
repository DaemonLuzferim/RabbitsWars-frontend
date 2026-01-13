// ===============================
// CARGAR POSTS
// ===============================
async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`);
    const posts = await res.json();

    if (!window.feed) return;

    feed.innerHTML = "";

    posts.reverse().forEach(p => {
      feed.innerHTML += `
        <article class="post">
          <h4>Usuario ${p.user_id}</h4>
          <p>${p.content}</p>
        </article>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}

// ===============================
// CREAR POST
// ===============================
async function createPost() {
  const content = postContent.value.trim();
  if (!content) return;

  try {
    await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
      },
      body: JSON.stringify({ content })
    });

    postContent.value = "";
    loadPosts();

  } catch (err) {
    console.error(err);
    alert("No se pudo crear el post");
  }
}

// ===============================
// AUTO LOAD
// ===============================
if (typeof feed !== "undefined") {
  loadPosts();
}