import './App.css';
import worldMap from './assets/world_map.png';
import axios from 'axios';
import {useState} from "react";
import {countryColor} from "./helpers/countryColor.jsx";
import populationMilions from "./helpers/populationMilions.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);
    const [countryInfo, setCountryInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    async function fetchCountries() {
        toggleError(false);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders,tld');
            response.data.sort((a, b) => {
                return a.population - b.population;
            });
            setCountries(response.data);
            console.log(response);
        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();
        toggleError(false);

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            setCountryInfo(response.data[0]);
            console.log(response.data[0]);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    return (
        <>
            <section>
                <h2>Search country information</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}/>
                <button type="submit">Submit</button>

            </form>
                {Object.keys(countryInfo).length > 0 &&
                    <article className="search-result-box">
                            <span className="flag-title-container">
                              <img src={countryInfo.flags.svg} alt="vlag" className="flag"/>
                              <h2>{countryInfo.name.common}</h2>
                            </span>
                        <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital
                            is {countryInfo.capital[0]}</p>
                        <p>It has a population of {populationMilions(countryInfo.population)} people and it borders
                            with {countryInfo.borders.length} neighboring countries</p>
                        <p>Websites can be found on <code>{countryInfo.tld[0]}</code> domain's</p>
                    </article>
                }
            </section>


            <img src={worldMap} alt="worldMap"/>

            {countries.length === 0 && <button type="button" onClick={fetchCountries}>Alle landen!</button>}

            {error &&
                <p className={"errorMessage"}>Er is iets misgegaan met het ophalen van de landen. Probeer het
                    opnieuw!</p>}


            <section className="allCountries">

                {countries.map((country) => {
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
