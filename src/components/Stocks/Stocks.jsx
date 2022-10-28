import React from "react";
import { useGlobalContext } from "../../Context";
import AutoComplete from "./AutoComplete";
import StockList from "./StockList";
import stocks from "./logo.png";
import "./Stocks.css";

const Stocks = () => {
  return (
    <div>
      <div className="img-container">
        <img src={stocks} alt="stocks" className="img-stock" />
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default Stocks;
