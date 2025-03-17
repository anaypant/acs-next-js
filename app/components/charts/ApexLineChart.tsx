import React from "react";
import Chart from "react-apexcharts";

function ApexLineChart() {
  const series = [
    {
      name: "Revenue",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    colors: ["#0B6E4F"], // change to your preferred color(s)
  };

  return (
    <Chart options={options} series={series} type="line" width="100%" height="100%" />
  );
}

export default ApexLineChart;
