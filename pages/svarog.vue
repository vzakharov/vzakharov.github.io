<template>
  <div
    class="container mx-auto p-4"
  >
    <template v-if="!settings.openAIKey">
      <!-- Input for OpenAI API key -->
      <input
        type="text"
        name="apiKey"
        placeholder="Enter your OpenAI API key"
        class="form-control mb-2"
        v-model.lazy="settings.openAIKey"
      >
      <p class="text-primary">
        Your API key is only stored locally and sent to OpenAI servers to generate the output. If you don’t have an OpenAI API key, you can get one at <a href="https://beta.openai.com/signup" target="_blank">https://beta.openai.com/signup</a>.
      </p>
    </template>
    <template v-else>
      <b-button
        variant="light"
        size="sm"
        class="m-2"
        @click="settings.openAIKey = ''"
        style="position: absolute; bottom: 0; left: 0;"
      >
        Change API key
      </b-button>
      <b-form
        @submit.prevent="generateFromScratch()"
      >
        <!-- Input for what do draw -->
        <input
          type="text"
          v-model="settings.svarog.query"
          placeholder="a pen? a car? a very tall person?"
          class="form-control mb-2"
        />
        <!-- Slider for settings.generate.temperature (0 to 1, step 0.1) -->
        <label
          class="mb-2"
          for="temperature"
        >
          How crazy do you want the output to be?
        </label>
        <b-input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          :value="settings.generate.temperature"
          @input="settings.generate.temperature = Number($event)"
          class="mb-2"
          style="display: block; width: 200px"
        />
        <template v-if="!generating">
          <!-- Button to generate the svg -->
          <b-button
            :type="svg ? 'button' : 'submit'"
            :variant="svg ? 'outline-secondary' : 'primary'"
            @click="generateFromScratch()"
          >
            {{ svg ? 'Retry' : 'Generate' }}
          </b-button>
          <!-- Button to continue drawing -->
          <b-button
            v-if="svg"
            type="submit"
            variant="primary"
            @click="generate"
          >
            Draw more
          </b-button>
        </template>
        <b-spinner v-else/>
      </b-form>
      <div class="container-fluid mt-4">
        <div class="row gy-2">
          <div class="col-12 col-xl-8">
            <div
              style="width: 640px; height: 480px" class="border"
            >
              <!-- SVG -->
              <svg 
                v-if="svg"
                width="640px" height="480px" viewBox="0 0 640 480"
                v-html="cleanedSvg"
              />

            </div>
          </div>
          <div class="col">
            <!-- Textarea with SVG code -->
            <b-form-group
              label="SVG code"
              label-for="svg-code"
              :description="!svg && 'Enter initial SVG, if needed'"
            >
              <b-textarea
                id="svg-code"
                v-model="slicedSvg"
                lazy
                class="mb-2"
                rows="10"
                style="font-family: monospace"
              />
            </b-form-group>
            <!-- Slider to cut off the SVG at a certain point -->
            <b-form-group
              v-if="svg"
              label="Cut off"
              label-for="cutoff"
              description="Cut off the resulting SVG to continue drawing from a certain point"
            >
              <b-input
                id="cutoff"
                v-if="svg"
                type="range"
                min="0"
                :max="svg.length"
                step="1"
                :value="cutoff"
                @input="cutoff = Number($event)"
                class="mb-2"
                style="display: block; width: 100%"
              />
            </b-form-group>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>

  import axios from 'axios'
  import syncLocal from '~/plugins/syncLocal'

  export default {

    mixins: [syncLocal],

    data() {

      return {
        query: '',
        settings: {
          openAIKey: '',
          generate: {
            temperature: 0.5
          },
          svarog: {
            query: 'a red circle',
          }
        },
        svg: null,
        cutoff: null,
        generating: false,
      }

    },

    computed: {

      slicedSvg: {
        get() {

          let { svg } = this

          if ( !svg ) return ''

          let { cutoff } = this

          svg = svg.slice(0, cutoff)

          return svg

        },

        set(value) {

          this.svg = value + (
            this.svg?.slice(this.cutoff) || ''
          )

        }

      },

      cleanedSvg() {
        let svg = this.slicedSvg

        // If the output has an unclosed quotation or tag, close them one by one
        if ( svg.match(/="[^"]*$/) )
          svg += '"'

        if ( svg.match(/<[^>]*$/) )
          svg += '>'

        return svg
      }

    },

    methods: {

      async generate() {

        let engine = 'text-davinci-002'

        let prompt = `Draw ${this.settings.svarog.query} using simple SVG shapes.\n\n<svg width="640px" height="480px" viewBox="0 0 640 480">${this.slicedSvg}`

        let { temperature } = this.settings.generate

        try {

          this.generating = true

          // Get the svg
          let { data: { choices: [{ text: output }] }} = await axios.post(
            `https://api.openai.com/v1/engines/${engine}/completions`,
            {
              prompt,
              max_tokens: 250,
              temperature,
              n: 1,
              frequency_penalty: 1.5,
              presence_penalty: 1.5
            },
            {
              headers: {
                Authorization: `Bearer ${this.settings.openAIKey}`
              }
            }
          )

          // Remove everything after and including </svg>
          output = output.replace(/<\/svg>[\s\S]*/, '')

          this.svg = this.slicedSvg + output
          this.cutoff = this.svg.length

        } catch (e) {
          console.error(e)
          this.$bvToast.toast(e, {
            title: 'Error',
            variant: 'danger',
            solid: true,
            appendToast: true,
            autoHideDelay: 5000,
          })

        } finally {
          this.generating = false
        }


      },

      async generateFromScratch() {
        this.svg = null
        this.generate()
      }

    }


  }

</script>

<style>

</style>