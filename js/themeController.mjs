import { htmlEl, themeTogglerButtonEl } from "./htmlElements.mjs";

if(!localStorage.getItem("theme")) localStorage.setItem("theme","light");

export const chooseTheme = () => {
   const themeTogglerButtonTextEl = themeTogglerButtonEl.querySelector("span");
    if(localStorage.getItem("theme") === "light") {
        htmlEl.classList.remove("dark");
        themeTogglerButtonTextEl.textContent = "Dark Mode";
    } else {
        htmlEl.classList.add("dark");
        themeTogglerButtonTextEl.textContent = "Light Mode";
    }
};

export const toggleTheme = () => {
    localStorage.setItem("theme", localStorage.getItem("theme") === "light" ? "dark" : "light");
    chooseTheme();
}