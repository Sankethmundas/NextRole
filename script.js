const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const closeMenu = document.querySelector(".close-menu");
const login = document.querySelector("mobile-hide");

menuToggle.addEventListener("click", () => {
    nav.classList.add("active");
});

closeMenu.addEventListener("click", ()=>{
    nav.classList.remove("active");
})

closeMenu.addEventListener("click", () => {

    console.log("Close clicked");

    nav.classList.remove("active");

});

const themeToggle =
    document.querySelector(
        "#theme-toggle"
    );

if(themeToggle){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add(
            "dark-mode"
        );

        themeToggle.textContent =
            "☀️";
    }

    themeToggle.addEventListener(
        "click",
        () => {
            document.body.classList.toggle(
                "dark-mode"
            );

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            themeToggle.textContent = isDark ? "☀️" : "🌙";

            localStorage.setItem("theme", isDark ? "dark" : "light");

        }
    );
}