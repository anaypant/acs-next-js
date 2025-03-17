import React from "react";
import Chart from "react-apexcharts";

function ApexPieChart() {
  const series = [44, 55, 13, 43, 22];
  const options = {
    chart: {
      toolbar: { show: false },
    },
    labels: ["A", "B", "C", "D", "E"],
    colors: ["#128054", "#0B6E4F", "#9CD5B3", "#B5E5C2", "#043927"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 260,
          },
        },
      },
    ],
  };

  return (
    <Chart options={options} series={series} type="pie" width="100%" height="100%" />
  );
}

export default ApexPieChart;
