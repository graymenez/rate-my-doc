import React, { useEffect } from "react";
import { useState } from "react";
import RmdApi from "./api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SearchBar = ({ componentName }) => {
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    query: "",
  };
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = async (q) => {
      let data =
        componentName === "Physicians"
          ? await RmdApi.getAllPhysicians(`first_name=${q}`)
          : await RmdApi.getAllHospitals(`name=${q}`);
      e.target.value.length === 0
        ? setSearchResults([])
        : setSearchResults(data);
    };
    data(e.target.value);

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  // Shows search button on searchBar after typing
  function showBtn() {
    let c = document.getElementById(`${componentName}SearchBtn-hidden`);
    if (c) {
      if (searchResults.length !== 0) {
        c.className = `${componentName}SearchBtn-show`;
      }
    }
  }
  showBtn();
  // While typing, shows suggestions of physicians in database
  function addSearchSuggestion(e) {
    let input = document.getElementById(`${componentName}SearchBar`);
    formData.query = e.target.innerText;
    input.style.color = "black";
    setSearchResults([]);
  }
  // When suggested results are visible this function will allow you to close it by just clicking anywere
  function resetResultsClickingWhileAway() {
    document.addEventListener("click", function () {});
    if (searchResults.length !== 0) {
      let e = document.getElementsByClassName(`${componentName}SuggestionBox`);
      document.addEventListener("click", function () {
        e[0].classList = `${componentName}SuggestionBox-hidden`;
        setFormData(INITIAL_VALUES);
        setSearchResults([]);
      });
    }
  }
  resetResultsClickingWhileAway();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${componentName.toLowerCase()}/${formData.query}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        id={`${componentName}Form`}
        className={`${componentName}Form`}
      >
        <p className={`${componentName}FormTitle`}>Search for a Physician</p>
        <span
          id={`${componentName}SearchIco`}
          className={`${componentName}SearchIco`}
        ></span>
        <div className="searchBarContainer">
          <input
            id={`${componentName}SearchBar`}
            autoComplete="off"
            className={`${componentName}SearchBar`}
            name="query"
            type="text"
            placeholder="Search"
            value={formData.query}
            onChange={handleChange}
          />
          <ul
            id={`${componentName}SuggestionBox`}
            className={
              searchResults.length !== 0
                ? `${componentName}SuggestionBox`
                : `${componentName}SuggestionBox-hidden`
            }
          >
            <li
              className={
                searchResults.length === 0
                  ? `${componentName}SuggestionBox-title-hidden`
                  : `${componentName}SuggestionBox-title`
              }
            >
              <b>Powered by SmartSearch 🔌</b>
            </li>

            {searchResults.map((d) => (
              <li key={uuidv4()} onClick={addSearchSuggestion}>
                {componentName === "Physicians" ? d.first_name : d.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          id={`${componentName}SearchBtn`}
          className={`${componentName}SearchBtn`}
        ></button>
      </form>
    </>
  );
};
export default SearchBar;
