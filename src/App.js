import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ display, countryOne }) => {
  console.log("display =", display);
  console.log("countryOne=", countryOne);
  if (display.length >= 1) {
    return (
      <div>
        {display.map((d) => (
          <p key={d.name}>{d.name}</p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>{countryOne.name}</h1>
        <p>
          capital: {countryOne.capital} <br></br>
          population: {countryOne.population}
        </p>
        <h2>Languages:</h2>
        <ul>
          {countryOne.languages.map((language) => (
            <li key={language.nativeName}>{language.name}</li>
          ))}
        </ul>
        <img src={countryOne.flag} alt='flag'></img>
      </div>
    );
  }
};

const App = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([{ name: "" }]);
  const [countries, setCountries] = useState([]);
  const [countryOne, setCountryOne] = useState([]);

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
      return {
        name: country.name.toLowerCase(),
        capital: country.capital,
        population: country.population,
        languages: country.languages,
        flag: country.flag,
      };
    });
    console.log("countryList =", countryList);

    if (event !== "") {
      let newCountryList = [];
      setSearch(event.target.value.toLowerCase());
      console.log("search =", search);

      newCountryList = countryList.filter((country) => {
        if (country.name.includes(search)) {
          country.name = capitalize(country.name);
          return {
            name: country.name,
            capital: country.capital,
            population: country.population,
            language: country.language,
            flag: country.flag,
          };
        }
        return "";
      });

      console.log("newCountryList =", newCountryList);

      if (newCountryList.length > 10) {
        setDisplay([{ name: "Too many matches, please be more specific" }]);
        setCountryOne([]);
      } else if (newCountryList.length === 0) {
        setDisplay([{ name: "No matches to your search" }]);
        setCountryOne([]);
      } else if (newCountryList.length === 1) {
        setDisplay([]);
        setCountryOne(newCountryList[0]);
      } else {
        setDisplay(newCountryList);
        setCountryOne([]);
      }
    }
  };

  // console.log("countryOne=", countryOne);
  // console.log("display =", display);
  return (
    <div>
      <h1>Country Information</h1>
      search country: <input value={search} onChange={handleSearch} />
      <Countries display={display} countryOne={countryOne} />
    </div>
  );
};

export default App;
