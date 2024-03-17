<template>
    <div>
        <canvas id="pieChart"></canvas>
    </div>
</template>
  
<script>
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import pieChartData from "@/data/data";
export default {
    props: ["pieChartData"],
    mounted() {
        const ctx = document.getElementById("pieChart");
        Chart.register(...registerables);
        Chart.register(ChartDataLabels);
        new Chart(ctx, this.pieChartData);
    },
};
</script>