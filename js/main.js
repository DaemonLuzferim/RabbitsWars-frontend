document.addEventListener("DOMContentLoaded", function () {
    // ABRIR IMÁGENES EN MODAL
    const images = document.querySelectorAll(".photo-grid img");
    images.forEach(img => {
        img.addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.backgroundColor = "#1b1b1b";
            modal.style.padding = "10px";
            modal.style.borderRadius = "12px";
            modal.style.zIndex = "1000";
            modal.style.display = "flex";
            modal.style.flexDirection = "column";
            modal.style.alignItems = "center";

            const modalImg = document.createElement("img");
            modalImg.src = img.src;
            modalImg.style.maxWidth = "80vw";
            modalImg.style.maxHeight = "60vh";
            modalImg.style.borderRadius = "10px";

            const closeBtn = document.createElement("button");
            closeBtn.innerText = "Cerrar";
            closeBtn.style.marginTop = "10px";
            closeBtn.style.backgroundColor = "crimson";
            closeBtn.style.color = "#fff";
            closeBtn.style.border = "none";
            closeBtn.style.padding = "6px 12px";
            closeBtn.style.borderRadius = "6px";
            closeBtn.style.cursor = "pointer";

            closeBtn.addEventListener("click", () => {
                document.body.removeChild(modal);
            });

            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
        });
    });

    // LOGIN FUNCIONALIDAD SIMULADA
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Funcionalidad de login simulada.");
    });
});
