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
      <b-form
        @submit.prevent="generateFromScratch()"
      >
        <!-- Input for what do draw -->
        <b-form-group
          label="What do you want to draw?"
          label-for="draw"
        >
          <input
            id="draw"
            type="text"
            v-model="query"
            placeholder="a pen? a car? a very tall person?"
            class="form-control mb-2"
            :disabled="!!edit"
          />
        </b-form-group>
        <!-- Slider for settings.generate.temperature (0 to 1, step 0.1) -->
        <b-form-group
          label="How crazy do you want it?"
          label-for="temperature"
        >
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
        </b-form-group>
        <!-- Input to edit the result -->
        <b-form-group
          v-if="svg"
          label="Edit the result"
          label-for="edit"
        >
          <b-input
            id="edit"
            type="text"
            v-model="edit"
            placeholder="e.g. make it green"
            class="form-control mb-2"
          />
        </b-form-group>
        <template v-if="!generating">
          <!-- Button to continue drawing -->
          <b-button
            v-if="svg"
            type="submit"
            variant="primary"
            @click="generate"
          >
            {{ edit ? 'Redraw' : 'Continue drawing' }}
          </b-button>
          <!-- Button to retry -->
          <b-button
            v-if="svg"
            type="button"
            variant="outline-secondary"
            @click="retry"
          >
            Retry
          </b-button>
          <!-- Button to generate the svg -->
          <b-button
            :type="svg ? 'button' : 'submit'"
            :variant="svg ? 'outline-secondary' : 'primary'"
            @click="generateFromScratch()"
          >
            {{ svg ? 'Draw from scratch' : 'Draw' }}
          </b-button>
          <!-- Button to reset all -->
          <b-button
            v-if="svg"
            type="button"
            variant="outline-danger"
            @click.prevent="reset"
          >
            Reset all
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
                v-html="svgFeeder + cleanedSvg"
              />

            </div>
          </div>
          <div class="col">
            <!-- Textarea with SVG code -->
            <b-form-group
              label="SVG code"
              label-for="svg-code"
              :description="svg ? '' : 'Enter initial SVG, if needed'"
            >
              <b-textarea
                id="svg-code"
                v-model="slicedSvg"
                lazy
                class="mb-2"
                rows="10"
                style="font-family: monospace; font-size: 0.8rem"
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
            <b-button
              variant="light"
              size="sm"
              class="m-2"
              @click="settings.openAIKey = ''"
            >
              Change API key
            </b-button>
          </div>
        </div>
      </div>

    </template>

  </div>
</template>

<script>

  import axios from 'axios'
  import syncLocal from '~/plugins/syncLocal'
  import _ from 'lodash'

  export default {

    mixins: [syncLocal],

    data() {

      return {
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
        edit: null,
        old: {
          query: '',
          svg: null,
          cutoff: null,
        },
        svgFeeder: // a white rectangle and a feeder for a comment
          '<!-- Canvas -->\n<rect width="640" height="480" fill="#fff"/>\n<!--',
      }

    },

    computed: {

      query: {
        get() {
          return this.settings.svarog.query
        },
        set(value) {
          this.settings.svarog.query = value
        }
      },

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

        let { 
          edit, 
          settings: { 
            generate: { temperature } 
          },
          svg, cutoff, query,
          slicedSvg, svgFeeder
        } = this

        this.old = {
          query,
          svg,
          cutoff,
        }
        
        if ( !slicedSvg ) slicedSvg = svgFeeder

        let engine = edit ? 'text-davinci-edit-001' : 'text-davinci-002'
        let prompt = edit || 
          `Draw ${query} using simple SVG shapes.\n\n<svg width="640px" height="480px" viewBox="0 0 640 480">${slicedSvg}`
        let input = edit && this.slicedSvg
        let endpoint = edit ? 'edits' : 'completions'
        let instruction = edit && `This is ${query}. ${_.upperFirst(edit)}`

        try {

          this.generating = true

          if ( edit ) {
            // Also change the query
            axios.post(
              `https://api.openai.com/v1/engines/${engine}/edits`,
              { 
                input: `Image caption: "${query}"`,
                instruction: `Edit the caption to incorporate the edit: "${edit}"`,
                temperature: 0
              },
              {
                headers: {
                  Authorization: `Bearer ${this.settings.openAIKey}`
                }
              }
            ).then(({ data: {choices: [{ text }]} }) => {
              console.log(text)
              // Extract the query from the new caption
              this.query = text.match(/"([\s\S]*?)"/)[1].replace(/\s+/g, ' ')
            })
          }

          // Get the svg
          let { data: { choices: [{ text: output }] }} = await axios.post(
            `https://api.openai.com/v1/engines/${engine}/${endpoint}`,
            edit ? {
              instruction,
              input,
              temperature,
            } : {
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


          this.svg = edit ? output : slicedSvg + output

          // Clean up the svg
          this.svg = this.svg.trim().replace(/>[^<]*</g, '>\n<')

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

      generateFromScratch() {
        this.svg = null
        this.edit = null
        this.generate()
      },

      retry() {
        Object.assign(this, this.old)
        this.generate()
      },

      reset() {
        this.query = ''
        this.svg = null
        this.cutoff = null
        this.edit = null
      },

    }


  }

</script>

<style>

</style>