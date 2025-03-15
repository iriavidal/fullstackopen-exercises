import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const Country = ({ country }) => {
  //console.log(country);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country.capitalInfo || !country.capitalInfo.latlng) return;

    const [lat, lon] = country.capitalInfo.latlng;

    countriesService.getWeather(lat, lon).then((data) => setWeather(data));
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      {weather && (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind speed: {weather.windspeed} km/h</p>
        </>
      )}
    </>
  );
};

const Countries = ({ countries, onShowDetails }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length == 1) {
    return <Country country={countries[0]}></Country>;
  }

  return (
    <>
      {countries.map((country, index) => (
        <p key={index} value={country.name.common}>
          {country.name.common} -{" "}
          <button onClick={() => onShowDetails(country)}>show</button>
        </p>
      ))}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    countriesService
      .getAll()
      .then((countriesAPI) => setCountries(countriesAPI));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowDetails = (country) => {
    setSelected(country);
  };

  return (
    <>
      find countries{" "}
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <Countries
        countries={filteredCountries}
        onShowDetails={handleShowDetails}
      />
      {selected && <Country country={selected} />}
    </>
  );
}

export default App;
