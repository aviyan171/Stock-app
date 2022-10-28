import React from "react";
import { useState, useEffect } from "react";
import finhubb from "../../apis/finhubb";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();

  const getStockData = async () => {
    const response = await finhubb.get("/stock/profile2", {
      params: {
        symbol: symbol,
      },
    });
    setStockData(response.data);
  };

  useEffect(() => {
    getStockData();
  }, [symbol]);

  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold"> name: </span>
              {stockData.name}
            </div>

            <div>
              <span className="fw-bold">country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">Sahres Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">
                url:{" "}
                <a href={stockData.weburl} target="_blank">
                  {stockData.weburl}
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
