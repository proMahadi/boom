import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { lineChartData } from "../data/chartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const LineChart: React.FC = () => {
  const options ={};
  return(
<div className="max-w-[696px]">
  <Line options={options} data={lineChartData}/>
</div>
  )
};

export default LineChart;
