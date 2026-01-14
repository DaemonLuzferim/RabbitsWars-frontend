/* =====================================================
   THEMES.JS
   Sistema de personalización visual
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       REFERENCIAS BASE
    ========================= */
    const root = document.documentElement;

    const themeBtn = document.getElementById("themeBtn");
    const btnStyleBtn = document.getElementById("btnStyleBtn");

    const colorPanel = document.getElementById("colorPanel");
    const btnPanel = document.getElementById("btnPanel");

    const closePalette = document.getElementById("closePalette");
    const closeBtnPalette = document.getElementById("closeBtnPalette");

    const palettes = document.querySelectorAll(".palette");
    const modeButtons = document.querySelectorAll(".mode-btn");

    const colorPicker = document.getElementById("colorPicker");
    const btnColorPicker = document.getElementById("btnColorPicker");

    let currentMode = "bg";

    /* =========================
       COLORES DISPONIBLES
    ========================= */
    const colors = [
        "#000000", "#0d0d0d", "#121212", "#1a1a1a", "#222222", "#333333",
        "#8b0000", "#b22222", "#dc143c", "#ff4500",
        "#b8860b", "#d4a017", "#ffcc00",
        "#013220", "#006400", "#228b22",
        "#003366", "#0047ab", "#191970",
        "#4b0082", "#6a0dad",
        "#008080", "#20b2aa",
        "#f5f5f5", "#dddddd", "#bbbbbb"
    ];

    /* =========================
       CREAR PALETAS
    ========================= */
    palettes.forEach(function (palette) {
        palette.innerHTML = "";

        colors.forEach(function (color) {
            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = color;

            swatch.addEventListener("click", function () {
                applyColor(color);
            });

            palette.appendChild(swatch);
        });
    });

    /* =========================
       APLICAR COLOR
    ========================= */
    function applyColor(color) {

        switch (currentMode) {

            case "bg":
                root.style.setProperty("--bg", color);
                root.style.setProperty("--card", color);
                localStorage.setItem("bg", color);
                break;

            case "h":
                root.style.setProperty("--h-color", color);
                localStorage.setItem("h", color);
                break;

            case "p":
                root.style.setProperty("--p-color", color);
                localStorage.setItem("p", color);
                break;

            case "btn-bg":
                root.style.setProperty("--btn-color", color);
                localStorage.setItem("btnColor", color);
                break;

            case "btn-text":
                root.style.setProperty("--btn-text", color);
                localStorage.setItem("btnText", color);
                break;
        }
    }

    /* =========================
       BOTONES DE MODO
    ========================= */
    modeButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {

            modeButtons.forEach(function (b) {
                b.classList.remove("active");
            });

            btn.classList.add("active");
            currentMode = btn.dataset.mode;
        });
    });

    /* =========================
       COLOR PICKERS
    ========================= */
    if (colorPicker) {
        colorPicker.addEventListener("input", function (e) {
            applyColor(e.target.value);
        });
    }

    if (btnColorPicker) {
        btnColorPicker.addEventListener("input", function (e) {
            applyColor(e.target.value);
        });
    }

    /* =========================
       ABRIR / CERRAR PANELES
    ========================= */
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            if (btnPanel) btnPanel.classList.add("hidden");
            if (colorPanel) colorPanel.classList.remove("hidden");
            currentMode = "bg";
        });
    }

    if (btnStyleBtn) {
        btnStyleBtn.addEventListener("click", function () {
            if (colorPanel) colorPanel.classList.add("hidden");
            if (btnPanel) btnPanel.classList.remove("hidden");
            currentMode = "btn-bg";
        });
    }

    if (closePalette) {
        closePalette.addEventListener("click", function () {
            if (colorPanel) colorPanel.classList.add("hidden");
        });
    }

    if (closeBtnPalette) {
        closeBtnPalette.addEventListener("click", function () {
            if (btnPanel) btnPanel.classList.add("hidden");
        });
    }

    /* =========================
       RESTAURAR DESDE STORAGE
    ========================= */
    const savedBg = localStorage.getItem("bg");
    const savedH = localStorage.getItem("h");
    const savedP = localStorage.getItem("p");
    const savedBtn = localStorage.getItem("btnColor");
    const savedBtnText = localStorage.getItem("btnText");

    if (savedBg) {
        root.style.setProperty("--bg", savedBg);
        root.style.setProperty("--card", savedBg);
    }
    if (savedH) root.style.setProperty("--h-color", savedH);
    if (savedP) root.style.setProperty("--p-color", savedP);
    if (savedBtn) root.style.setProperty("--btn-color", savedBtn);
    if (savedBtnText) root.style.setProperty("--btn-text", savedBtnText);

});
