import { Box } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
const PieChart2 = ({stats}) => {

  const options = {
    series: [
      Number(stats["attending"] * 1),
      Number(stats["Not Attending"] * 1),
      Number(stats["pending"] * 1),
    ],
    // series: [
    //   41,
    //   25,
    //   39,
    // ],
    chart: {
      parentHeightOffset: 0,
      width: "100%",
      type: "pie",
      background: "rgba(255, 255, 255, 0)",
      offsetX: 0,
      offsetY: 0,
    },
    colors: ["#00B5B0", "#FE3169", "#FAA71B"],
    labels: ["Attending", "Not Attending", "Pending"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    legend: {
      show: false,
      width: 0,
    },
  };

  return (
    <Box width={"fit-content"}>
      <Chart options={options} series={options.series} type="pie" />
    </Box>
  );
};

export default PieChart2;
