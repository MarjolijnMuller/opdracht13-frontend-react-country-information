import './App.css';
import worldMap from './assets/world_map.png';
import axios from 'axios';
import {useState} from "react";
import {countryColor} from "./helpers/countryColor.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);

    async function fetchCountries() {
        toggleError(false);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
            setCountries(response.data);
            console.log(response);
        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    function sortCountries(countries) {
        countries.sort((a, b) => {
            if (a.population > b.population) {
                return 1;
            }
            if (a.population < b.population) {
                return -1;
            }
            return 0;
        })
    }


    return (
        <>
            <img src={worldMap} alt="worldMap"/>

            {countries.length === 0 && <button type="button" onClick={fetchCountries}>Alle landen!</button>}

            {error &&
                <p className={"errorMessage"}>Er is iets misgegaan met het ophalen van de landen. Probeer het
                    opnieuw!</p>}


            <section className="allCountries">

                {countries.map((country) => {
                    sortCountries(countries);
                    console.log(countryColor(country.region))
                    const colorRegion = countryColor(country.region);
                    return (
                        <div className="countryWrapper" key={country.name.official}>
                            <div className="countryHead">
                                <img
                                    src={country.flags.png}
                                    alt={country.flags.alt}
                                    key={country.flags.png}
                                    className="flag"
                                />

                                <p
                                    key={country.name.official}
                                    className={colorRegion}
                                    id="countryName">
                                    {country.name.common}
                                </p>
                            </div>
                            <p
                                key={`${country.name}-population`}
                                className="countryPopulation">
                                Has a population of {country.population} people.
                            </p>
                        </div>
                    )
                })}
            </section>


        </>
    )
}

export default App
