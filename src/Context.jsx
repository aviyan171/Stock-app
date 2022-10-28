import axios from "axios";
import React, { useContext, createContext, useEffect, useState } from "react";
import finhubb from "./apis/finhubb";
import { IoCaretUpSharp, IoCaretDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function useGlobalContext() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [watchlist, setWatchList] = useState(
    localStorage.getItem("watchlists")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
  );
  const [exchangerates, setExchangerate] = useState();
  // const [addStock, setAddStock] = useState([]);
  const [stockslists, setStocklists] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // const responses = [];
  const navigate = useNavigate();
  /*...........................................................*/

  const handleStocks = async () => {
    try {
      const responses = await Promise.all(
        watchlist.map((stock) => {
          return finhubb.get("/quote", {
            params: {
              symbol: stock,
            },
          });
        })
      );
      const data = responses.map((response) => {
        return {
          data: response.data,
          symbol: response.config.params.symbol,
        };
      });
      // console.log(data);
      setStocklists(data);
    } catch (err) {
      console.log(err);
    }
  };

  /*...........................................................*/

  const addStock = (stocks) => {
    if (watchlist.indexOf(stocks) === -1) {
      setWatchList([...watchlist, stocks]);
      setSearch("");
    }
  };

  useEffect(() => {
    handleStocks();
  }, [watchlist]);

  /*...........................................................*/
  //handle-exchange rate

  const getExchangeRate = async () => {
    const resp = await axios.get("https://api.exchangerate.host/latest", {
      params: {
        // from: "USD",
        to: "NPR",
        amount: 1,
        base: "USD",
      },
    });
    setExchangerate(resp.data.rates.NPR);
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  /*...........................................................*/

  //chang-color unction
  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  /*...........................................................*/
  //change symbol function
  const changeSymbol = (change) => {
    return change > 0 ? <IoCaretUpSharp /> : <IoCaretDownSharp />;
  };

  /*...........................................................*/

  //Search Function
  const searchStock = async () => {
    const resp = await finhubb.get("/search", {
      params: {
        q: search,
      },
    });
    setResults(resp.data.result);
  };

  useEffect(() => {
    if (search.length > 0) {
      searchStock();
    } else {
      setResults([]);
    }
  }, [search]);
  /*...........................................................*/

  //dropdown function
  const showDropDown = () => {
    if (search.length > 0) {
      return "show";
    } else {
      return null;
    }
  };

  /*...........................................................*/
  const deleteStocks = (stock) => {
    const deletedItem = watchlist.filter((stocks) => {
      return stocks !== stock;
    });
    setWatchList(deletedItem);
  };

  /*.........................................................................*/

  //stock select function
  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  useEffect(() => {
    localStorage.setItem("watchlists", watchlist);
  }, [watchlist]);

  /*................................................................*/

  return (
    <AppContext.Provider
      value={{
        stockslists,
        changeColor,
        changeSymbol,
        search,
        setSearch,
        showDropDown,
        results,
        exchangerates,
        addStock,
        handleStockSelect,
        deleteStocks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
