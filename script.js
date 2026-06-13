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