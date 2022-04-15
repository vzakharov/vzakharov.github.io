<template>
  <canvas
    id="chart"
  />
</template>

<script>

  import Chart from 'chart.js/auto'

  export default {

    props: ['projects'],

    data() {

      return {
        chart: null
      }

    },

    computed: {

        config() {
          return {
            type: 'scatter',
            data: {
              datasets: [
                {
                  label: 'Words per hour',
                  backgroundColor: 'rgba(54,162,235,0.2)',
                  borderColor: 'rgba(54,162,235,1)',
                  data: this.projects.map( project => ({
                    x: project.words,
                    y: project.wordsPerHourNet,
                  })),
                },
              ]
            },
            // x and y axis min to 0
            options: {
              scales: {
                x: {
                  min: 0,
                  max: 4000,
                },
                y: {
                  min: 0,
                  max: 1500,
                },
              },
            },
          }
        },

    },
      
    mounted() {

      this.$watch('config', { immediate: true, handler(config) {
        this.chart && this.chart.destroy()
        this.chart = new Chart(
          document.getElementById('chart'), config
        )
      }})
      
    }

  }

</script>

<style>

</style>