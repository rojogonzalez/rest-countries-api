const URL = 'https://restcountries.com/v3.1/all';

const getData = async () => {
    // Obtener los datos del archivo 'stays.json'
    const data = fetch(URL)
        .then(response => response.json())
        .then(json => json)

    return data;
}

//Función para obtener la lista de regiones de la API
const getRegions = (data) => {
    let regions = data.map((element) => `${element.region}`);
    regions = new Set(regions);
    regions = [...regions];
    regions = regions.sort();
    regions.unshift('All');

    return regions;
}

const filterByRegion = (arr, filtro) => {
    let filtered = arr.filter(element => element.region === filtro);
    return filtered;
}

const filterByName = (arr, filtro) => {
    let filtered = arr.filter (element =>element.name.common.toLowerCase().includes(filtro.toLowerCase()));
    return filtered;
}

const filterCountry = (arr, filtro) => {
    let filtered = arr.filter (element =>element.name.common.toLowerCase()==filtro.toLowerCase());
    console.log(filtered)
    return filtered;
}

const abbreviateCountry = (arr, filtro) => {
    let filtered = arr.filter (element =>element.cca3.toLowerCase()==filtro.toLowerCase());
    console.log(filtered)
    return filtered;
}

export default {
    getData,
    getRegions,
    filterByRegion,
    filterByName,
    filterCountry,
    abbreviateCountry

}