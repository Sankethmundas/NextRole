// Apply theme preference immediately on script load to avoid flash of light theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Menu toggle elements and logic (safely guarded for pages without navbar)
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const closeMenu = document.querySelector(".close-menu");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (closeMenu && nav) {
    closeMenu.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

// Theme toggle button setup
const themeToggle = document.querySelector("#theme-toggle");
if (themeToggle) {
    // Sync toggle button icon with current theme state
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}