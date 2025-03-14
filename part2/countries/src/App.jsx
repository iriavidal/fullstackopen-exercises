import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length == 1) {
    return (
      <>
        <h1>{countries[0].name.common}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <p>Population: {countries[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(countries[0].languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </>
    );
  }

  return (
    <>
      {countries.map((country, index) => (
        <p key={index} value={country.name.common}>
          {country.name.common}
        </p>
      ))}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    countriesService.getAll().then((countriesAPI) => {
      setCountries(countriesAPI);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      find countries{" "}
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <Countries countries={filteredCountries}></Countries>
    </>
  );
}

export default App;
