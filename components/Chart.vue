<template>
  <div>
    <canvas
      id="chart"
    />
    <!-- Actual vs computed hours -->
    <div class="mt-4">
      <div 
        v-for="value, kind in {
          actual: actualHours,
          computed: computedHours,
        }"
        :key="kind"
      >
        Total {{ kind }} hours: <strong v-text="Math.round(value*100)/100" />
      </div>
    </div>
    <!-- Difference -->
    <div class="mt-2">
      Difference: <strong v-text="Math.round((actualHours - computedHours)*100)/100" />
    </div>
    <!-- Standard deviation -->
    <div class="mt-2">
      Standard deviation: <strong v-text="Math.round(stdDevHours*100)/100" />
    </div>
    <!-- Inputs to set wphMin, wphMax, and midpoint in nuxt $store -->
    <div class="mt-2">
      <b-form-input
        v-for="parameter in ['wphMin', 'wphMax', 'midpoint']"
        :key="parameter"
        class="mb-2"
        type="number"
        step="10"
        :placeholder="{
          wphMin: 'Minimum WPH',
          wphMax: 'Maximum WPH',
          midpoint: 'Midpoint',
        }[parameter]"
        :value="$store.state[parameter]"
        @input="$store.commit('set', {
          [parameter]: parseFloat($event),
        })"
      />
    </div>
    <!-- Button to fit the parameters to the data -->
    <div class="mt-2">
      <b-button
        variant="outline-secondary"
        v-text="fitting ? 'Fitting; click to cancel' : 'Fit to data'"
        @click="toggleFitting"
      />
    </div>
  </div>
</template>

<script>

  import Chart from 'chart.js/auto'
  import pricing from '~/plugins/pricing'
  import { sumBy } from 'lodash'

  export default {

    mixins: [
      pricing
    ],

    props: ['projects'],

    data() {

      return {
        chart: null,
        fitting: null
      }

    },

    computed: {

        actualWph() {
          return this.getXY(this.getActualWph)
        },

        computedWph() {
          return this.getXY(this.getComputedWph)
        },

        actualHours() {
          return sumBy( this.projects, this.getActualHours )
        },

        computedHours() {
          return sumBy( this.projects, this.getComputedHours )
        },

        stdDevHours() {
          return Math.sqrt(
            sumBy( this.projects,
              project =>
                ( this.getActualHours(project) - this.getComputedHours(project) ) ** 2              
            )
          )
        },

        config() {

          return {
            type: 'scatter',
            data: {
              datasets: [
                {
                  label: 'Words per hour',
                  backgroundColor: 'rgba(54,162,235,0.2)',
                  borderColor: 'rgba(54,162,235,1)',
                  data: this.actualWph
                },
                {
                  label: 'Computed words per hour',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  data: this.computedWph
                }
              ]
            },
            options: {
              // x and y axis min to 0
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
              // Disable animation
              animation: {
                duration: 0,
              }
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
      
    },

    methods: {

      toggleFitting() {

        if ( this.fitting ) {
          clearInterval(this.fitting)
          this.fitting = null
        } else {

          this.fitting = setInterval(() => {
            // Make a random change to wphMin, wphMax, and midpoint in steps of 10. If the resulting standard deviation is less than the current standard deviation, then accept the change. Otherwise, revert it.
            let currentStdDev = this.stdDevHours
            ;['wphMin', 'wphMax', 'midpoint'].forEach(parameter => {
              console.log(parameter)
              let value = this.$store.state[parameter]
              this.$store.commit('set', {
                [parameter]: value + (Math.random() < 0.5 ? -10 : 10),
              })
              if ( this.stdDevHours > currentStdDev ) {
                this.$store.commit('set', {
                  [parameter]: value
                })
              }
            })              
          }, 100)

        }
      },

      getXY(functionForY) {

        return this.projects.map( project => ({
          x: project.words,
          y: functionForY(project),
        }))
        
      },

      getActualWph(project) {
        return project.wordsPerHourNet
      },

      getComputedWph(project) {
        return this.getWph(project.words)
      },

      getActualHours(project) {
        return project.words / this.getActualWph(project) || 0
      },

      getComputedHours(project) {
        return project.words / this.getComputedWph(project) || 0
      },

    },

    destroy() {
      this.chart && this.chart.destroy()
      this.fitting && clearInterval(this.fitting)
    },

  }

</script>

<style>

</style>