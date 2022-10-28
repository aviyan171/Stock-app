import React from "react";
import { useGlobalContext } from "../../Context";
import "./Stocks.css";

const StockList = () => {
  const {
    stockslists,
    changeColor,
    changeSymbol,
    exchangerates,
    handleStockSelect,
    deleteStocks,
  } = useGlobalContext();

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg %</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stockslists.map((stockData) => {
            return (
              <tr
                className="table-row"
                key={stockData.symbol}
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>
                  Rs.
                  {stockData.data.c === NaN
                    ? Math.floor(stockData.data.c * exchangerates)
                    : (stockData.data.c * exchangerates).toFixed(2)}
                </td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {changeSymbol(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {changeSymbol(stockData.data.dp)}
                </td>
                <td>
                  Rs.
                  {stockData.data.h === isNaN()
                    ? Math.floor(stockData.data.h * exchangerates)
                    : (stockData.data.h * exchangerates).toFixed(2)}
                </td>
                <td>
                  Rs.
                  {stockData.data.l === isNaN()
                    ? Math.floor(stockData.data.l * exchangerates)
                    : (stockData.data.l * exchangerates).toFixed(2)}
                </td>
                <td>
                  Rs.
                  {stockData.data.o === isNaN()
                    ? Math.floor(stockData.data.o * exchangerates)
                    : (stockData.data.o * exchangerates).toFixed(2)}
                </td>
                <td>
                  Rs.
                  {stockData.data.pc === isNaN()
                    ? Math.floor(stockData.data.pc * exchangerates)
                    : (stockData.data.pc * exchangerates).toFixed(2)}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStocks(stockData.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
