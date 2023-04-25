import data from './data.js';
import dom from './dom.js';

const datos = await data.getData();
const regions = data.getRegions(datos);

dom.showRegions(regions, '#regionsList')

dom.showCards(datos);
const countriesCards = [...countriesContainer.children];

countriesCards.forEach((card) => {
    card.addEventListener('click', () => {
        let choosenCountry = '';
        choosenCountry = card.children[1].children[0].children[0].textContent;

        let filteredCountry = data.filterCountry(datos, choosenCountry);
        console.log(datos)
        dom.showInfo(filteredCountry);
        dom.borderCountries(filteredCountry);
    })
});

//Filtrando por Región
let activeRegion = 0;
let filteredByRegion = [];
const regionsList = [...dom.$('#regionsList').children];

regionsList.forEach((region, index) => {

    region.addEventListener('click', () => {
        if (region.classList.contains('activeRegion')) return;
        region.classList.add('activeRegion');
        regionsList[activeRegion].classList.remove('activeRegion');
        activeRegion = index

        let filtro = region.children[0].textContent;
        console.log(filtro)
        filteredByRegion = filtro === 'All' ? datos : data.filterByRegion(datos, filtro);

        let textBox = dom.$('#selectRegion');
        textBox.textContent = `${filtro === "All" ? "Filter by region" : filtro}`;

        dom.showCards(filteredByRegion);
        const countriesCards = [...countriesContainer.children];
        console.log(countriesCards)

        countriesCards.forEach((card) => {
            card.addEventListener('click', () => {
                let choosenCountry = '';
                choosenCountry = card.children[1].children[0].children[0].textContent;
                console.log(choosenCountry)

                let filteredCountry = data.filterCountry(datos, choosenCountry);
                dom.showInfo(filteredCountry);
                dom.borderCountries(filteredCountry);
            })
        });
    })
})

//Filtrando en el input por el nombre del país
const searchCountry = dom.$('#searchCountry')

searchCountry.addEventListener('keyup', () => {
    let filtro = searchCountry.value;
    const filteredByName = filtro === '' ? datos : data.filterByName(datos, filtro);
    dom.showCards(filteredByName);
    const countriesCards = [...countriesContainer.children];

    countriesCards.forEach((card) => {
        card.addEventListener('click', () => {
            let choosenCountry = '';
            choosenCountry = card.children[1].children[0].children[0].textContent;

            let filteredCountry = data.filterCountry(datos, choosenCountry);
            dom.showInfo(filteredCountry);
            dom.borderCountries(filteredCountry);
        })
    });
})

//Utilizando los tags de los países 
let offcanvasBody = dom.$('#offcanvasBody');
const observer = new MutationObserver(() => {
    let paisesFrontera = document.querySelectorAll('.frontera');
        paisesFrontera = [...paisesFrontera];
        console.log(paisesFrontera)
        paisesFrontera.forEach((span) => {
            span.addEventListener('click', () => {
                console.log(span)
                let choosenCountry = '';
                choosenCountry = span.textContent;
                console.log(choosenCountry)

                let filteredCountry = data.abbreviateCountry(datos, choosenCountry);
                dom.showInfo(filteredCountry);
                dom.borderCountries(filteredCountry);
            })
        });
})
const config = { attributes: true, childList: true, subtree: true };
observer.observe(offcanvasBody, config);

const html = document.querySelector("html");
console.log(html.dataset)

const darkBtn = document.querySelector("#switch");

darkBtn.addEventListener("click",()=>{
    html.dataset.bsTheme=html.dataset.bsTheme=="ligth" ? "dark": "ligth";
})


