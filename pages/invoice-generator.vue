<template>
  <b-container class="mt-5">
    <!-- Basic invoice template including payer/payee details, invoice items, totals, and bank details for payments -->
    <b-row>
      <b-col cols="12" lg="8" offset-lg="2">

        <h1>Invoice #<Editable v-model="invoice.number" /></h1>
        <!-- date -->
        dated <Editable v-model="invoice.date" />

        <!-- Issuer/Payer details, each as a single multiline editable div -->
        <b-row class="my-5">
          <b-col 
            v-for="party in ['Issuer', 'Payer']"
            :key="party"
            cols="6"
          >
            <h4 v-text="party"/>
            <Editable v-model="invoice[party.toLowerCase()]" tag="div" />
          </b-col>
        </b-row>

        <!-- Invoice items as a table: Title, quantity (unit), price (currency) -->
        <h3
          class="mb-3"
        >Invoice items</h3>
        
        <b-table
          :items="invoice.items"
          :fields="['title', 'quantity', 'price']"
          striped
          hover
          small
          bordered
          responsive
          foot-clone
        >

          <template #head(price)>
            Price (<Editable v-model="invoice.currency" />)
          </template>

          <template #head(quantity)>
            Quantity (<Editable v-model="invoice.unit" />)
          </template>

          <template #cell(title)="{ item }">
            <Editable v-model="item.title" />
          </template>

          <template #cell(quantity)="{ item }">
            <Editable v-model="item.quantity" />
          </template>

          <template #cell(price)="{ item }">
            <Editable v-model="item.price" />
            <!-- Close button to remove item, not shown for the topmost item -->
            <span 
              class="close noprint" 
              v-if="item !== invoice.items[0]"
              @click="invoice.items = without(invoice.items, item)"
              style="cursor: pointer;"
            >&times;</span>
          </template>

          <template #foot(title)>
            Total
          </template>

          <template #foot(quantity)>
            {{ total('quantity') }}
          </template>

          <template #foot(price)>
            {{ total('price') }}
          </template>

        </b-table>

        <!-- Add item button, invisible on print -->
        <b-button
          class="mb-3 noprint"
          variant="outline-secondary"
          size="sm"
          @click="invoice.items = [...invoice.items, { title: '', quantity: '', price: '' }]"
        >
          Add item
        </b-button>

        <!-- Right-aligned totals: total, discount, grand total -->
        <div class="text-end mt-5">
          <h6>Total: {{ total('price') }} {{ invoice.currency }}</h6>
          <h6>Discount: −<Editable v-model="invoice.discount" /> {{ invoice.currency }}</h6>
          <h3>Grand total: {{ total('price') - invoice.discount }} {{ invoice.currency }}</h3>
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import { forEach, mapValues, without, sumBy } from 'lodash'

  export default {

    data() {
      let invoice = {
        number: null,

        // Current date as 'Jul 1, 2019'
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        issuer: null,
        payer: null,
        currency: 'USD',

        // One sample item
        items: [
          {
            title: 'Sample item',
            quantity: 1,
            price: 100
          }
        ],
        ...mapValues( this.$route.query,
          // If it starts with a '{' or '[' it's a JSON string, parse it
          value => value?.match(/^[\{\[]/) ? JSON.parse(value) : value
        )
      }
      // Return all query params as data
      return { 
        invoice 
      }
    },

    mounted() {

      // If no invoice number is set, take the last invoice number from localStorage and increment it
      if (!this.invoice.number) {
        let lastInvoiceNumber = Number(localStorage.getItem('lastInvoiceNumber'))
        this.invoice.number = lastInvoiceNumber ? lastInvoiceNumber + 1 : 1
      }
      localStorage.setItem('lastInvoiceNumber', this.invoice.number)

      // Whatever invoice properties are still not set, take them from localStorage
      let locallyStoredInvoice = JSON.parse(localStorage.getItem('invoice'))
      forEach(this.invoice, (value, key) => {
        if (!value) {
          this.invoice[key] = locallyStoredInvoice[key]
        }
      })

      // Watch the invoice object for changes, updating query params and localStorage as needed
      this.$watch('invoice', invoice => {

        this.$router.replace({ query: 
          mapValues( invoice,
            // If it's an object, stringify it
            value => typeof value === 'object' ? JSON.stringify(value) : value
          )
        })

        localStorage.setItem('invoice', JSON.stringify(invoice))

      }, { deep: true })

    },

    methods: {

      total(key) {
        return sumBy(this.invoice.items, item => parseFloat(item[key]) || 0)
      },

      without, sumBy
    }

  }

</script>

<style>

  @media screen {
    .editable {
      background-color: /* blue */ #e6f7ff;
    }
  }

  @media print {
    .noprint {
      display: none;
    }
  }
  
</style>