//Selector de elementos HTML
const $ = selector => document.querySelector(selector);

//Función para crear una nueva card
const newCard = (dato) => {
    const div = document.createElement('div');
    const population = dato.population.toLocaleString("en-US");

    div.className += "card p-0 border-0 shadow-sm card-selection";
    div.setAttribute('data-bs-toggle', 'offcanvas');
    div.setAttribute('data-bs-target', '#offcanvasTop');
    div.setAttribute('aria-controls', 'offcanvasTop');

    div.innerHTML = `
        <img src="${dato.flags.png}" class="card-img-top mb-4" alt="...">
        <div class="card-body">
            <section class="card-text text-start">
                <h3 class="fw-bold countrys-name">${dato.name.common}</h3>
                <p class="mb-1"><span class="stats mb-1">Population: </span><span>${population}</span></p>
                <p class="mb-1"><span class="stats mb-1">Region: </span><span>${dato.region}</span></p>
                <p class="mb-1"><span class="stats mb-1">Capital: </span><span>${dato.capital == undefined ? "N/A" : dato.capital}</span></p>
            </section>
        </div>
    `;
    return div;
}

//Función para mostrar las cards habiendo recibido un array con los países que se desea mostrar
const showCards = (arr) => {
    countriesContainer.innerHTML = '';

    arr.forEach(element => {
        const card = newCard(element);
        countriesContainer.appendChild(card);
    });
}

//Función para mostrar la lista de regiones del mundo
const showRegions = (regions, where) => {
    const regionsList = $(where);

    regions.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${element}<span>`;
        li.className += `dropdown-item `;
        regionsList.appendChild(li);
        return li;
    });
}


const showInfo = (element) => {
    const div = document.createElement('div');
    div.className += "offcanvas-body row";
    let nativeName = Object.values(element[0].name.nativeName).map(name => name.common).join(", ");
    console.log(element[0].borders);

    const population = element[0].population.toLocaleString("en-US");
    const currencies = Object.values(element[0].currencies).map(currency => currency.name).join(", ");
    const languages = Object.values(element[0].languages).join(", ")

    div.innerHTML = `
    <div class="row">
            <div class=" overflow-hidden col mt-3">
              <img class="object-fit-cover img-fluid" src="${element[0].flags.svg}" alt="">
            </div>
            <div class="card-body col col-md-2 ps-4 mt-3">
              <h3 class="fw-bold countrys-name text-start">${element[0].name.common}</h3>
              <section class="card-text text-start row">
                <div class="col-12 col-md-6">
                  <p class="mb-1"><span class="stats mb-1">Native Name: </span><span>${nativeName}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Population: </span><span>${population}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Region: </span><span>${element[0].region}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Sub Region: </span><span>${element[0].subregion}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Capital: </span><span>${element[0].capital == undefined ? "N/A" :
            element[0].capital}</span></p>
                </div>
                <div class="col">
                  <p class="mb-1"><span class="stats mb-1">Top Level Doamin: </span><span>${element[0].tld}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Currencies: </span><span>${currencies}</span></p>
                  <p class="mb-1"><span class="stats mb-1">Language: </span><span>${languages}</span></p>
                </div>
              </section>
              <section>
                <p class="mt-3 text-start"><span class="stats mx-2" id="borderCountriesList">Border Countries: </span></p>
              </section>

            </div>
          </div>
    `;
    offcanvasBody.innerHTML = '';
    offcanvasBody.appendChild(div);
}


const borderCountries = (country) => {
    
    country[0].borders.forEach(element => {
        const span = document.createElement('span');
        span.className += "border border-light-subtle rounded-2 mx-2 px-2 py-1 frontera";
        span.setAttribute('role', 'button');
        span.innerHTML = element;
    
        let borderCountriesList = $('#borderCountriesList')
    
        borderCountriesList.appendChild(span);
    });
}





export default {
    newCard,
    showCards,
    $,
    showRegions,
    showInfo, 
    borderCountries
}