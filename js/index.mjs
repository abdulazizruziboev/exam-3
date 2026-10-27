import { countries } from "./countries.mjs";
import { countriesCardTemplate, countriesNotAvaibleTextEl, countriesRegionSelectEl, countriesSearchInputEl, countriesWrapperBoxEl, themeTogglerButtonEl } from "./htmlElements.mjs";
import { chooseTheme, toggleTheme } from "./themeController.mjs";

chooseTheme();

themeTogglerButtonEl.addEventListener("click",toggleTheme);

const writeUi = (countries) => {
    if(Array.isArray(countries) && countries.length !== 0) {
        countriesNotAvaibleTextEl.classList.add("hidden");
        countriesWrapperBoxEl.innerHTML = null;
        countries.forEach(country=>{
            const card = countriesCardTemplate.cloneNode(true).content;
            const flag = card.querySelector("img");
            flag.src = country?.flag;
            card.querySelector(".country-title").textContent = country?.name ?? "N/A";
            card.querySelector(".card-population-text").textContent = country?.population.toLocaleString() ?? "N/A";
            card.querySelector(".card-region-text").textContent = country?.region ?? "N/A";
            card.querySelector(".card-capital-text").textContent = country?.capital ?? "N/A";
            countriesWrapperBoxEl.appendChild(card);
        });
    }  else {
        countriesWrapperBoxEl.innerHTML = null;
        countriesNotAvaibleTextEl.classList.remove("hidden");
    }
}

writeUi(countries);

const filterCountries = (text="", region="all") => {
    if(Array.isArray(countries)) {
        if(text === "" && region === "all") {
            writeUi(countries);
        } else if (text === "" && region !== "all" ) {
            const filteredCountries = countries.filter((country)=>country.region.toLowerCase() === region);
            writeUi(filteredCountries);
        } else if(text !== "" && region === "all") {
            const filteredCountries = countries.filter((country)=> country.name.toLowerCase().includes(text.toLowerCase()));
            writeUi(filteredCountries);
        } else {
            const filteredCountries = countries.filter((country)=> country.name.toLowerCase().includes(text.toLowerCase()) && country.region.toLowerCase() === region);
            writeUi(filteredCountries);
        }
    }
}

countriesSearchInputEl.addEventListener("input",(e)=>filterCountries(e.target.value,countriesRegionSelectEl.value));

countriesRegionSelectEl.addEventListener("input",(e)=>filterCountries(countriesSearchInputEl.value,e.target.value));
