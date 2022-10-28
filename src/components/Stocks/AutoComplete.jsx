import React, { useState } from "react";
import { useGlobalContext } from "../../Context";

const AutoComplete = () => {
  const { search, setSearch, results, showDropDown, addStock } =
    useGlobalContext();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={handleSearch}
        />
        <label htmlFor="search">Search</label>
        <ul
          className={`dropdown-menu ${showDropDown()}`}
          style={{
            height: "500px",
            overflowY: "scroll",
            overflowX: "hidden",
            cursor: "pointer",
          }}
        >
          {results.map((results) => {
            return (
              <li
                key={results.symbol}
                className="dropdown-item"
                onClick={() => addStock(results.symbol)}
              >
                {results.description} ({results.symbol}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AutoComplete;
