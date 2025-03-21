import React from "react";
import Chart from "react-apexcharts";

function ApexBarChart() {
  const series = [
    {
      name: "Earnings",
      data: [44, 55, 57, 56, 61, 58],
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    colors: ["#128054"],
  };

  return (
    <Chart options={options} series={series} type="bar" width="100%" height="100%" />
  );
}

export default ApexBarChart;