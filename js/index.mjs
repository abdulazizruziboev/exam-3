import { getCountries, getFilteredCountries } from "./countries.mjs";
import { countriesCardTemplate,countriesNotAvaibleIconEl , countriesNotAvaibleTextEl, countriesRegionSelectEl, countriesSearchInputEl, countriesWrapperBoxEl, loaderSectionEl, themeTogglerButtonEl, countriesFiltersSectionEl } from "./htmlElements.mjs";
import { chooseTheme, toggleTheme } from "./themeController.mjs";

chooseTheme();
themeTogglerButtonEl.addEventListener("click",toggleTheme);

const writeUi = (countries) => {
    loaderSectionEl.classList.add("hidden");
    countriesFiltersSectionEl.classList.remove("hidden");
    if(Array.isArray(countries) && countries.length !== 0) {
        countriesNotAvaibleIconEl.classList.add("hidden");
        countriesNotAvaibleTextEl.classList.add("hidden");
        countriesWrapperBoxEl.innerHTML = null;
        countries.forEach(country=>{
            const card = countriesCardTemplate.cloneNode(true).content;
            const flag = card.querySelector("img");
            flag.src = country?.flag;
            flag.alt = country?.name ?? "N/A";
            flag.addEventListener("error",()=>{
                flag.src="/images/images_fallback.png" 
            })
            card.querySelector(".country-title").textContent = country?.name ?? "N/A";
            card.querySelector(".card-population-text").textContent = country?.population.toLocaleString() ?? "N/A";
            card.querySelector(".card-region-text").textContent = country?.region ?? "N/A";
            card.querySelector(".card-capital-text").textContent = country?.capital ?? "N/A";
            countriesWrapperBoxEl.appendChild(card);
        });
    }  else {
        countriesWrapperBoxEl.innerHTML = null;
        countriesNotAvaibleIconEl.classList.remove("hidden");
        countriesNotAvaibleTextEl.classList.remove("hidden");
    }
}

writeUi(await getCountries());

countriesSearchInputEl.addEventListener("input",async (e)=> writeUi(await getFilteredCountries(e.target.value,countriesRegionSelectEl.value)));

countriesRegionSelectEl.addEventListener("input",async (e)=> writeUi(await getFilteredCountries(countriesSearchInputEl.value,e.target.value)));
