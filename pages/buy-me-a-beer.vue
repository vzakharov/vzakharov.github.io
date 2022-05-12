<!-- A buy-me-a-beer page -->
<template>
  <div 
    :class="{
      'd-flex align-items-center justify-content-center': true,
      'vw-100 vh-100': layout != 'none'
    }"
  >
    <div 
      :class="{
        'rounded shadow p-3': layout != 'none',
      }"
      :style="{
        maxWidth: '600px',
        maxHeight: '600px',
        zoom
      }"
    >
      <h1 class="text-center" v-text="h1"/>
      <div class="d-sm-none">
        Please rotate the screen to landscape mode.
      </div>
      <div class="d-none d-sm-block">
        <span v-html="text" />
        <!-- Div with amount input -->
        <b-form class="d-flex align-items-center justify-content-center mt-3 gap-3">
          <label
            for="amount"
            class="fw-bold"
          >
            How much?
          </label>
          <b-input
            id="amount"
            v-model="amount"
            type="number"
            step="1"
            min="1"
            placeholder="Amount"
            style="max-width: 100px"
          />
          USD
        </b-form>
        <!-- iframe to pay with src = paymentLink -->
        <div
          class="mt-3 d-flex justify-content-center align-middle"
          style="height: 800px; width: 500px"
        >
          <b-alert 
            v-if="paymentLink == 'Error'"
            variant="danger"
            show
          >
            <strong>Oops!</strong>
            <p>
              Something went wrong. Please try again later.
            </p>
            <b-button
              variant="outline-primary"
              @click="getPaymentLink()"
            >
              Try again
            </b-button>
          </b-alert>
          <iframe
            v-else-if="paymentLink"
            :src="paymentLink"
            frameborder="0"
            style="width: 100%; height: 100%"
          />
          <!-- A please-wait message otherwise -->
          <div v-else class="text-center align-middle">
            <b-spinner type="grow" variant="primary" />
            <span class="ml-2">Please wait, connecting to payment provider...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {

    data() {

      let { 
        h1 = 'Buy me a 🍺',
        text = 'If you want to thank me for my work, this is the perfect place to do it.',
        project, 
        amount = 5,
        layout,
        zoom = 1
      } = this.$route.query || {}

      if ( project ) text = `Projects like <strong>${project}</strong> take a lot of time and effort, so if you want to thank me for my work, I would really appreciate it.`

      return {
        paymentLink: null,
        amountChangedTimeout: null,
        amount, layout, zoom,
        h1, text
      }

    },

    watch: {

      amount: {
        immediate: true,
        handler() { 

          this.paymentLink = null

          // Cancel the timeout if it's already set
          if ( this.amountChangedTimeout ) {
            clearTimeout(this.amountChangedTimeout)
          }

          this.amountChangedTimeout = setTimeout(() => {
            this.getPaymentLink()
          }, 500)

        }
      }

    },

    methods: {

      async getPaymentLink(retry) {

        this.paymentLink = null
        try {

          this.paymentLink = (
            await axios.get(`https://ideality.app/api/topup-link?currency=1&amount=${this.amount}`)
          ).data.link

        } catch (e) {
          console.error(e)
          // If it's not a retry, try again in one second
          if ( !retry ) {
            setTimeout(() => this.getPaymentLink(true), 1000)
          } else {
            // If it's a retry, show an error
            this.paymentLink = 'Error'
          }
        }

      }
    }
    


  }

</script>

<style>

</style>