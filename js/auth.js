// ===============================
// LOGIN
// ===============================
async function login() {
  const user = username.value.trim();
  const pass = password.value.trim();

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      window.location.href = "html/muro.html";
    } else {
      alert(data.message || "Error de login");
    }

  } catch (err) {
    console.error(err);
    alert("Error de conexión con el servidor");
  }
}