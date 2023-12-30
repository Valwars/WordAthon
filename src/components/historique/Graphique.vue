<template>
  <div class="graph-container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>

import Chart from 'chart.js';

export default {
  name: 'Graphique',
  props: {
    chartData: {
      type: Array,

    },
    chartLabels: {
      type: Array,

    }
  },
  data() {
    return {
      myChart: null // Référence à l'instance du graphique
    };
  },
  mounted() {
    this.renderChart();
    window.addEventListener('resize', this.handleResize); // Ajouter l'écouteur
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    window.removeEventListener('resize', this.handleResize); // Retirer l'écouteur
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart');
      this.myChart = new Chart(ctx, {
        type: 'line', // Type de graphique
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Sample Data',
            data: this.chartData,
            backgroundColor: 'rgba(233, 135, 80, 0.2)',
            borderColor: '#E98750',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, // S'assurer que le graphique est responsive
    maintainAspectRatio: false, // Permettre au graphique de s'étendre selon les dimensions du conteneur
    legend: {
      display: false, // Désactiver l'affichage de la légende
    },
          scales: {
            yAxes: [{
              ticks : {
              beginAtZero: true,
              }
            }]
          }
        }
      });
    },
    handleResize() {
      this.renderChart(); // Redessiner le graphique lors du redimensionnement
    }
  },

}
</script>

<style scoped>

.graph-container {
  flex: 1;
}


</style>
