import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          }
        },
      },
    ],
  },
};

// DEPENDENCY -- React Chart JS
function LineGraph({casesType = 'cases'}) {

  const [data, setData] = useState({});

  useEffect (() => {
    const fetchData = async () => {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        const chartData = buildCharData(data, 'cases');
        console.log("DEBUG : " + chartData);
        setData(chartData);
      });
    };
    fetchData();
  }, [casesType]);

  const buildCharData = (data, casesType='cases') => {
      const chartData = [];
      let lastDataPoint;

      for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
      };
      return chartData;
    };

  return (
    <div>
      {data?.length > 0 && (
        <Line 
          data={{
            datasets: [
              {
                data: data,
                borderColor: "CC1024",
                backgroundColor: "rgba(204, 16, 53, 0.4)",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph
