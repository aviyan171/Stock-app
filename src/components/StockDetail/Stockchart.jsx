import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
const Stockchart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("7d");
  const { day, week, year } = chartData;

  const handleDateFormat = () => {
    if (dateFormat === "7d") {
      return week;
    } else if (dateFormat === "1Y") {
      return year;
    } else if (dateFormat === "24h") {
      return day;
    }
  };

  const color =
    handleDateFormat()[handleDateFormat().length - 1].y -
      handleDateFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";

  const renderButtonSelect = (button) => {
    const classes = "btn m-1";
    if (button === dateFormat) {
      return `${classes} btn btn-primary`;
    } else {
      return `${classes} btn btn-outline-primary`;
    }
  };
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };
  const series = [
    {
      name: symbol,
      data: handleDateFormat(),
    },
  ];

  return (
    <div>
      <div className="mt-5 p-4 shadow-sm bg-white">
        <Chart options={options} series={series} type="area" width="100%" />
      </div>
      <div>
        <button
          onClick={() => setDateFormat("24h")}
          className={renderButtonSelect("24h")}
        >
          24h
        </button>
        <button
          onClick={() => setDateFormat("7d")}
          className={renderButtonSelect("7d")}
        >
          1W
        </button>
        <button
          onClick={() => setDateFormat("1Y")}
          className={renderButtonSelect("1Y")}
        >
          1Y
        </button>
      </div>
    </div>
  );
};

export default Stockchart;
