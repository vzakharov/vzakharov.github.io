<!-- A buy-me-a-beer page -->
<template>
  <div 
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 512px;" 
    class="rounded shadow p-3"
  >
    <h1 class="text-center">Buy me a 🍺</h1>
    If you want to thank me for my work, this is the perfect place to do it.
    <!-- Div with amount input and currency select dropdown -->
    <b-form class="d-flex align-items-center justify-content-center mt-3 gap-3">
      How much?
      <b-input
        v-model="amount"
        type="number"
        step="1"
        min="1"
        placeholder="Amount"
        style="max-width: 100px"
      />
      <b-select
        v-model="currency"
        :options="{ 1: 'USD', 2: 'EUR' }"
        class="form-select form-control"
        style="max-width: 100px"
      />
    </b-form>
    <!-- iframe to pay with src = paymentLink -->
    <div
      class="mt-3 d-flex justify-content-center align-items-center"
      style="height: 400px;"
    >
      <iframe
        v-if="paymentLink"
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

      // default: 5 USD
      return {
        paymentLink: null
      }

    },

    computed: {

      amountAndCurrency() {
        return `${this.amount} ${this.currency === 1 ? 'USD' : 'EUR'}`
      },

      amount: {
        get() {
          // take from query or default to 5
          return this.$route.query.amount || 5
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
      },

      currency: {
        get() {
          // take from query or default to 1
          return this.$route.query.currency || 1
        },
        set(currency) {
          // update route
          this.$router.push({
            ...this.$route,
            query: {
              ...this.$route.query,
              currency
            }
          })
        }
      }

    },

    watch: {

      amountAndCurrency: {
        immediate: true,
        async handler() {

          this.paymentLink = null
          try {

            this.paymentLink = (
              await axios.get(`https://ideality.app/api/topup-link?currency=${this.currency}&amount=${this.amount}`)
            ).data.link

          } catch (e) {
            console.error(e)
            // Show a 'please try again later' toast
            this.$bvToast.toast(
              'Please try again later',
              {
                title: 'Error',
                variant: 'danger',
                solid: true,
                autoHideDelay: 5000
              }
            )
          }

        }
      }

    }
    


  }

</script>

<style>

</style>