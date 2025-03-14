import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log("effect run, currency is now", currency);

    // omitir si la moneda no está definida
    if (currency) {
      console.log("fetching exchange rates...");
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((response) => {
          setRates(response.data.rates);
        });
    }
  }, [currency]);
  // La función del efecto se ejecuta después de la primera renderización y siempre después de la tabla, ya que su segundo parámetro [currency] cambia. Es decir, cuando el estado currency obtiene un nuevo valor, el contenido de la tabla cambia y se ejecuta la función del efecto.

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>{JSON.stringify(rates, null, 2)}</pre>
    </div>
  );
};

export default App;
