/*import populationMilions from "./populationMilions.jsx";*/

import axios from "axios";
import {useState} from "react";


async function searchCountry(country) {
    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);

    toggleError(false);

    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders,tld');
        setCountries(response.data);
        countries.map((country) => {
            if(country.name.common === "Netherlands"){
                return Netherlands
            }
        })
        /*return(countries.name.common.find(country))*/
        /*console.log(response);*/
    } catch (error) {
        console.error(error);
        toggleError(true);
    }



    /*const countrySearch = countries.find(country);*/
    /*console.log(countries);
    console.log(country);
    return (
        countries
*/
        /*<div>
            <img src={countrySearch.flags}/> <h2>{countrySearch.name.common}</h2>
            <p>{countrySearch.name.common} is situated in {countrySearch.region} and the capital is {countrySearch.capital}</p>
            <p>
                It has a population of {populationMilions(countrySearch.population)} million people and it borders
                with {countrySearch.borders.length} neighboring countries.</p>
            <p>
                Websites can be found on {countrySearch.tld} domain</p>
        </div>*/


}

export default searchCountry;