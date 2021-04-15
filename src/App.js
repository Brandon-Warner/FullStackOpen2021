import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ display }) => {
  //   console.log("display =", display);
  return (
    <div>
      <ul>
        {display.map((d) => (
          <li key={d.name}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/countries").then((response) => {
      console.log("server data =", response.data);
      setCountries(response.data);
    });
  }, []);
  console.log("countries =", countries);

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((x) => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);

    let countryList = countries.map((country) => {
      return { name: country.name.toLowerCase() };
    });
    // console.log("countryList =", countryList);

    if (event !== "") {
      let newCountryList = [];
      setSearch(event.target.value.toLowerCase());
      console.log("search =", search);

      newCountryList = countryList.filter((country) => {
        if (country.name.includes(search)) {
          country.name = capitalize(country.name);
          return { name: country.name };
        }
        return "";
      });

      if (newCountryList.length > 10) {
        setDisplay([{ name: "Too many matches, please be more specific" }]);
      } else if (newCountryList.length === 0) {
        setDisplay([{ name: "No matches to your search" }]);
      } else {
        setDisplay(newCountryList);
      }
      // console.log("newCountryList =", newCountryList);
    } else {
      setDisplay({ name: "nothing to see here" });
    }
  };

  return (
    <div>
      <h1>Country Information</h1>
      search country: <input value={search} onChange={handleSearch} />
      <Countries display={display} />
    </div>
  );
};

export default App;
