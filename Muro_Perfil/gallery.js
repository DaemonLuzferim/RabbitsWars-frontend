document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // Abrir imágenes en modal pequeño (misma página)
    // Funciona para .photo-grid y .photo-carousel
    // =====================================================
    function enableClickModal(selector) {
        var imgs = document.querySelectorAll(selector + " img");
        imgs.forEach(function (img) {
            img.addEventListener("click", function () {
                openImageModal(img.src);
            });
        });
    }

    enableClickModal(".photo-grid");
    enableClickModal(".photo-carousel");

    // =====================================================
    // Función para mostrar modal compacto de imagen
    // =====================================================
    function openImageModal(src) {
        // Crear overlay si no existe
        var overlay = document.getElementById("imageModalOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "imageModalOverlay";
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0,0,0,0.4)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "9999";

            // Cerrar al hacer click fuera del contenedor
            overlay.addEventListener("click", function (e) {
                if (e.target === overlay) {
                    overlay.remove();
                }
            });

            document.body.appendChild(overlay);
        }

        // Limpiar contenido previo
        overlay.innerHTML = "";

        // Contenedor del modal (pequeño y centrado)
        var container = document.createElement("div");
        container.style.position = "relative";
        container.style.width = "300px";
        container.style.height = "200px";
        container.style.background = "#111";
        container.style.padding = "5px";
        container.style.borderRadius = "10px";
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.boxShadow = "0 6px 20px rgba(0,0,0,0.6)";

        // Imagen escalable dentro del modal
        var modalImg = document.createElement("img");
        modalImg.src = src;
        modalImg.style.maxWidth = "100%";
        modalImg.style.maxHeight = "100%";
        modalImg.style.borderRadius = "8px";
        container.appendChild(modalImg);

        // Botón de cerrar estilizado
        var closeBtn = document.createElement("button");
        closeBtn.textContent = "Cerrar";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "-12px";
        closeBtn.style.right = "-12px";
        closeBtn.style.fontSize = "14px";
        closeBtn.style.background = "var(--btn-color)";
        closeBtn.style.color = "#fff";
        closeBtn.style.border = "none";
        closeBtn.style.borderRadius = "50px";
        closeBtn.style.padding = "4px 10px";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.4)";
        closeBtn.style.transition = "all 0.2s ease";

        // Efecto hover
        closeBtn.addEventListener("mouseenter", function () {
            closeBtn.style.background = "var(--btn-text)";
            closeBtn.style.transform = "scale(1.1)";
        });
        closeBtn.addEventListener("mouseleave", function () {
            closeBtn.style.background = "var(--btn-color)";
            closeBtn.style.transform = "scale(1)";
        });

        closeBtn.addEventListener("click", function () {
            overlay.remove();
        });
        container.appendChild(closeBtn);

        overlay.appendChild(container);
    }

    // =====================================================
    // Carrusel horizontal arrastrable
    // =====================================================
    var slider = document.querySelector(".photo-carousel");
    if (slider) {
        var isDown = false;
        var startX;
        var scrollLeft;

        slider.addEventListener("mousedown", function (e) {
            isDown = true;
            slider.classList.add("active");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", function () {
            isDown = false;
            slider.classList.remove("active");
        });

        slider.addEventListener("mouseup", function () {
            isDown = false;
            slider.classList.remove("active");
        });

        slider.addEventListener("mousemove", function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - slider.offsetLeft;
            var walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // =====================================================
    // Subida de imágenes al backend
    // =====================================================
    var inputFile = document.querySelector('#uploadInput');
    if (inputFile) {
        inputFile.addEventListener('change', async function (e) {
            var file = e.target.files[0];
            if (!file) return;

            var formData = new FormData();
            formData.append('file', file);

            try {
                var backendURL = 'https://rabbitwars.onrender.com/upload';
                var response = await fetch(backendURL, {
                    method: 'POST',
                    body: formData
                });

                var result = await response.json();
                console.log(result);

                if (result.success) {
                    loadImages();
                }

            } catch (error) {
                console.error("Error subiendo la imagen:", error);
            }
        });
    }

    // =====================================================
    // Cargar imágenes dinámicamente desde backend
    // =====================================================
    async function loadImages() {
        var carousel = document.querySelector('.photo-carousel');
        if (!carousel) return;

        try {
            var backendURL = 'https://rabbitwars.onrender.com/images';
            var response = await fetch(backendURL);
            var files = await response.json();

            files.forEach(function (file) {
                var exists = Array.from(carousel.querySelectorAll("img")).some(img => img.src.includes(file));
                if (!exists) {
                    var img = document.createElement('img');
                    img.src = 'https://rabbitwars.onrender.com/uploads/' + file;
                    img.alt = file;

                    img.addEventListener('click', function () {
                        openImageModal(img.src);
                    });

                    carousel.appendChild(img);
                }
            });

        } catch (error) {
            console.error("Error cargando imágenes:", error);
        }
    }

});
