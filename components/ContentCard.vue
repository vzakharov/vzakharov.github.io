<!-- A card for a specific content type -->
<template>
  <b-card
    class="mb-4"
    no-body
  >
    <b-card-header>
      <b-card-title>
        {{ contentType.name }}
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <p>
        {{ contentType.description }}
      </p>

      <!-- Buttons to pick a size -->
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

      <!-- Display number of words -->
      <span class="text-muted">
        ~{{ words }} words
      </span>

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

    props: [ 'contentType', 'currentTotalWords' ],

    mixins: [ copyPrice ],

    computed: {
      
      words() {
        return this.contentType.wordsBySize[this.contentType.size]
      },

      basePrice() {
        return this.copyPrice(this.words)
      },

      discountedPrice() {
        return this.copyPrice(this.words, this.currentTotalWords)
      },


    },

    methods: {

      setSize(size) {
        this.$emit('update:size', size)
      },
      
    },
  }

</script>

<style>

</style>