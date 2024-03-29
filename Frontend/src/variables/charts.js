/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


*/

import React from "react";
import { Line } from "react-chartjs-2";

// ##############################
// // // Chart variables
// #############################

// chartExample1 and chartExample2 options
let lineGraph_Options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: (item) => `${item.yLabel} hours`,
    },
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################

function LineGraph({database, timeInterval}){
  const [chartData, setChartData] = React.useState([]);
  const [chartLabels, setChartLabels] = React.useState([]);

  const Chart = <Line
    data={(canvas) => CreateLineGraph(chartData, chartLabels, timeInterval, canvas)}
    options={lineGraph_Options}
    datasetIdKey="Summary-Graph"/>;

  React.useEffect(()=>{
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/lineGraphData?database=${database}&time=${timeInterval}`
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => 
    {
      const labels = fetchedData["labels"];
      const hours = fetchedData["data"];

      let data = [];
      hours.forEach(element => {
        let split = element.split(':');
        let hours = parseFloat(split[0]) + parseFloat(split[1]) / 60;
        data.push(hours.toFixed(2));
      });

      setChartData(data);
      setChartLabels(labels);
    });
  }, [database, timeInterval])

  return Chart;
}

export default LineGraph;

function CreateLineGraph(chartData, chartLabels, timeInterval, canvas){
  let ctx = canvas.getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
  gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
  gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

  return {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Hours this " + timeInterval,
        fill: true,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: chartData,
      },
    ],
  };

}

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// let chartExample2 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
//     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
//     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

//     return {
//       labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
//       datasets: [
//         {
//           label: "Data",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#1f8ef1",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#1f8ef1",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#1f8ef1",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: [80, 100, 70, 80, 120, 80],
//         },
//       ],
//     };
//   },
//   options: lineGraph_Options,
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// let chartExample3 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
//     gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
//     gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

//     return {
//       labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
//       datasets: [
//         {
//           label: "Countries",
//           fill: true,
//           backgroundColor: gradientStroke,
//           hoverBackgroundColor: gradientStroke,
//           borderColor: "#d048b6",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           data: [53, 20, 10, 80, 100, 45],
//         },
//       ],
//     };
//   },
//   options: {
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       backgroundColor: "#f5f5f5",
//       titleFontColor: "#333",
//       bodyFontColor: "#666",
//       bodySpacing: 4,
//       xPadding: 12,
//       mode: "nearest",
//       intersect: 0,
//       position: "nearest",
//     },
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(225,78,202,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             suggestedMin: 60,
//             suggestedMax: 120,
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//       xAxes: [
//         {
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(225,78,202,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//     },
//   },
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// const chartExample4 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
//     gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
//     gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

//     return {
//       labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#00d6b4",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#00d6b4",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#00d6b4",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: [90, 27, 60, 12, 80],
//         },
//       ],
//     };
//   },
//   options: {
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },

//     tooltips: {
//       backgroundColor: "#f5f5f5",
//       titleFontColor: "#333",
//       bodyFontColor: "#666",
//       bodySpacing: 4,
//       xPadding: 12,
//       mode: "nearest",
//       intersect: 0,
//       position: "nearest",
//     },
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           barPercentage: 1.6,
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(29,140,248,0.0)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             suggestedMin: 50,
//             suggestedMax: 125,
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],

//       xAxes: [
//         {
//           barPercentage: 1.6,
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(0,242,195,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//     },
//   },
// };
