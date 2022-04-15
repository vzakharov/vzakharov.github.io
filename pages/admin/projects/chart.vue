<template>
  <b-toast
    v-model="show"
    no-auto-hide
  >
    <Scatter
      v-bind="{ chartData }"
    />
  </b-toast>
</template>

<script>

  import { Scatter } from 'vue-chartjs/legacy'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale
  } from 'chart.js'

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale
  )

  export default {

    props: ['projects'],

    components: {
      Scatter,
    },

    computed: {

        chartData() {
          return {
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
            ],
          }
        },

        show: {
          get() {
            return true
          },

          set(value) {
            // Navigate one level up if false
            if ( !value ) {
              this.$router.push({ ...this.$route, name: 'admin-projects' })
            }
          },
        }
    }

  }

</script>

<style>

</style>