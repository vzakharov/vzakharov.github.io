<!-- A card for a specific content type -->
<template>
  <b-card
    class="mb-4"
    no-body
  >
    <b-card-header>
      <b-card-title>
        {{ name }}
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <p>
        {{ description }}
      </p>
      <!-- Add to cart outline button -->
      <b-button
        variant="outline-primary"
        class="me-2"
        @click="$emit('addToCart', $props)"
      >
        Add to cart
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>

  export default {
    props: [ 'name', 'description' ]
  }

</script>

<style>

</style>