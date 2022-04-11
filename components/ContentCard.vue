<!-- A card for a specific content type -->
<template>
  <b-card
    class="mb-4"
    no-body
  >
    <b-card-header>
      <b-card-title
        :id="contentType.id"
      >
        {{ contentType.name }}
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <p>
        {{ contentType.description }}
      </p>

      <!-- Buttons to pick a size, only shown if customWords is not set -->
      <template v-if="!contentType.customWords">
        <b-button
          v-for="(words, size) in contentType.wordsBySize"
          :key="size"
          block
          :variant="size === contentType.size ? 'outline-secondary' : 'light'"
          size="sm"
          class="me-2"
          @click="setSize(size)"
        >
          <!-- Uppercase letter for size -->
          {{ size.toUpperCase() }}
        </b-button>
      </template>

      <!-- Display number of words. Clicking emits 'update:customWords' with the current words as payload -->
      <span class="text-muted"
        v-if="!contentType.customWords"
        @click="$emit('update:customWords', words)"
        style="cursor: pointer;"
      >
        ~{{ words }} words
      </span>
      <!-- Otherwise, show a numeric input with min = 50 and step = 50, changing which emits 'update:customWords' with the input value as payload -->
      <div v-show="contentType.customWords">
        <b-form-input
          ref="customWordsInput"
          class="mb-2 d-inline w-75"
          type="number"
          min="50"
          step="50"
          :value="contentType.customWords"
          @change="$emit('update:customWords', parseInt($event))"
        />

        <!-- Close button to remove customWords -->
        <span class="close" @click="$emit('update:customWords', null)"
          style="cursor: pointer;"
        >&times;</span>
      </div>

      <div class="">
        <!-- If base price and duscounted price are different, show the base price striked through -->
        <span
          v-if="basePrice !== discountedPrice"
          class="text-muted"
          style="text-decoration: line-through;"
        >
          ${{ basePrice }}
        </span>
        
        <!-- Discounted price, in bold large format -->
        <span class="h2 me-2"
          v-if="discountedPrice"
        >
          ${{ discountedPrice }}
        </span>
        <span
          v-else
          class="h2 text-success"
        >
          FREE!
        </span>


        <!-- Add to cart outline button, aligned to right -->
        <b-button
          variant="outline-primary"
          class="float-end"
          @click="$emit('addToCart', contentType)"
        >
          Add to cart
        </b-button>
      </div>

    </b-card-body>
  </b-card>
</template>

<script>

  // mixin to calculate price based on size
  import copyPrice from '@/plugins/copyPrice'


  export default {

    props: [ 'contentType', 'totalWords' ],

    mixins: [ copyPrice ],

    computed: {
      
      words() {
        return this.contentType.wordsBySize[this.contentType.size]
      },

      basePrice() {
        return this.copyPrice(this.words)
      },

      discountedPrice() {
        return this.copyPrice(this.words, this.totalWords)
      },


    },

    methods: {

      setSize(size) {
        this.$emit('update:size', size)
      },
      
    },

    watch: {

      // if customWords is set, focus the input and select all text
      'contentType.customWords'(customWords) {
        if (customWords) {
          this.$nextTick(() => ['focus', 'select']
            .forEach(method => this.$refs.customWordsInput[method]())
          )
        }
      },

    }
  }

</script>

<style>

</style>