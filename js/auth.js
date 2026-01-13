// ===============================
// AUTH - LOGIN
// ===============================

async function login() {
  const user = username.value.trim();
  const pass = password.value.trim();

  // Validación básica
  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    });

    const data = await response.json();

    // Login exitoso
    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      window.location.href = "html/muro.html";
      return;
    }

    // Error controlado del backend
    alert(data.message || "Credenciales incorrectas");

  } catch (error) {
    console.error("Login error:", error);
    alert("No se pudo conectar con el servidor");
  }
}
