import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import finhubb from "../../apis/finhubb";
import Stockchart from "./Stockchart";
import { useGlobalContext } from "../../Context";
import StockData from "./StockData";

export const StockDetails = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();
  const { exchangerates } = useGlobalContext();

  const formatData = (data) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: (data.c[index] * exchangerates).toFixed(2),
      };
    });
  };

  const fetchData = async () => {
    const date = new Date();
    const currentTime = Math.floor(date.getTime() / 1000);
    let oneDay;
    if (date.getDay() === 6) {
      oneDay = currentTime - 2 * 24 * 60 * 60;
    } else if (date.getDay() === 0) {
      oneDay = currentTime - 3 * 24 * 60 * 60;
    } else {
      oneDay = currentTime - 24 * 60 * 60;
    }
    const oneWeek = currentTime - 7 * 24 * 60 * 60;
    const oneYear = currentTime - 365 * 24 * 60 * 60;

    const responses = await Promise.all([
      finhubb.get("/stock/candle", {
        params: {
          symbol: symbol,
          resolution: 30,
          from: oneDay,
          to: currentTime,
        },
      }),
      finhubb.get("/stock/candle", {
        params: {
          symbol: symbol,
          resolution: 60,
          from: oneWeek,
          to: currentTime,
        },
      }),
      finhubb.get("/stock/candle", {
        params: {
          symbol: symbol,
          resolution: "W",
          from: oneYear,
          to: currentTime,
        },
      }),
    ]);
    // console.log(responses);
    setChartData({
      day: formatData(responses[0].data),
      week: formatData(responses[1].data),
      year: formatData(responses[2].data),
    });
  };

  // console.log(chartData);

  // const newFormat=()=>{
  //   fetchData
  // }

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <div>
      <div>
        {chartData ? (
          <Stockchart chartData={chartData} symbol={symbol} />
        ) : (
          <h1>Loading Charts.....</h1>
        )}
        <StockData symbol={symbol} />
      </div>
    </div>
  );
};
