<!-- A buy-me-a-beer page -->
<template>
  <div 
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 512px;" 
    class="rounded shadow p-3"
  >
    <h1 class="text-center">Buy me a 🍺</h1>
    If you want to thank me for my work, this is the perfect place to do it.
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
      class="mt-3 d-flex justify-content-center align-items-center"
      style="height: 400px;"
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
      <div v-else class="text-center">
        <b-spinner type="grow" variant="primary" />
        <span class="ml-2">Please wait, connecting to payment provider...</span>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {

    data() {

      return {
        paymentLink: null,
        amountChangedTimeout: null
      }

    },

    mounted() {

      if ( !this.amount ) {
        this.amount = 5
      }

    },

    computed: {

      amount: {
        get() {
          // take from query or default to 5
          return this.$route.query.amount
        },
        set(amount) {
          // update route
          this.$router.push({
            ...this.$route,
            query: {
              ...this.$route.query,
              amount
            }
          })
        }
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