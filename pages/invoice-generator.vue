<template>
  <b-container class="mt-5">
    <!-- Basic invoice template including payer/payee details, invoice items, totals, and bank details for payments -->
    <b-row>
      <b-col cols="12" lg="8" offset-lg="2">
        
        <!-- If not mounted, show a loading spinner and 'Loading invoice template...' -->
        <b-card
          v-if="!mounted"
          class="text-center"
        >
          <b-spinner type="grow" variant="primary" />
          <p class="mt-3">
            Loading your invoice...
          </p>
        </b-card>
        <template v-else>
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
              Price (<Editable type="number" v-model="invoice.currency" />)
            </template>

            <template #head(quantity)>
              Quantity (<Editable v-model="invoice.unit" />)
            </template>

            <template #cell(title)="{ item }">
              <Editable v-model="item.title"
                ref="title"
              />
            </template>

            <template #cell(quantity)="{ item }">
              <Editable type="number" v-model="item.quantity" />
            </template>

            <template #cell(price)="{ item }">
              <Editable type="number" v-model="item.price" />
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
            @click="addItem"
          >
            Add item
          </b-button>

          <!-- Right-aligned totals: total, discount, grand total -->
          <div class="text-end my-5">
            <h6
              v-if="invoice.discount || invoice.tax"
            >
              Total: {{ total('price') }} {{ invoice.currency }}
            </h6>

            <div
              v-for="modifier in ['discount', 'tax']"
              :key="modifier"
            >
              <h6
                v-if="invoice[modifier]"
              >
                {{ upperFirst(modifier) }}:
                
                <Editable
                  :ref="modifier"
                  type="number"
                  v-model="invoice[modifier]"
                />
              
                {{ invoice.currency }}
              </h6>
              <!-- Small 'Add [modifier]' button otherwise -->
              <b-button
                v-else
                class="noprint"
                variant="light"
                size="sm"
                @click="invoice[modifier] = 1; focusOnNextTick(modifier)"
              >
                Add {{ modifier }}
              </b-button>
            </div>

            <h3>Grand total: {{ total('price') - ( invoice.discount || 0 ) + ( invoice.tax || 0 ) }} {{ invoice.currency }}</h3>
          </div>

        </template>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import { forEach, isArray, without, sumBy, upperFirst } from 'lodash'

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
        discount: null,
        tax: null,

        // One sample item
        items: [
          {
            title: 'Sample item',
            quantity: 1,
            price: 100
          }
        ]
      }

      return { 
        invoice,
        mounted: false
      }
    },

    mounted() {

      let hashedInvoice
      let { invoice } = this

      try {
        hashedInvoice = JSON.parse(decodeURIComponent(this.$route.hash.slice(1)))
      } catch (e) {
        hashedInvoice = {}
      }

      this.invoice = {
        ...invoice,
        ...hashedInvoice
      }


      // If no invoice number is set, take the last invoice number from localStorage and increment it
      if (!invoice.number) {
        let lastInvoiceNumber = Number(localStorage.getItem('lastInvoiceNumber'))
        invoice.number = lastInvoiceNumber ? lastInvoiceNumber + 1 : 1
      }
      localStorage.setItem('lastInvoiceNumber', invoice.number)

      // Whatever invoice properties are still not set, take them from localStorage
      let locallyStoredInvoice = JSON.parse(localStorage.getItem('invoice'))
      
      locallyStoredInvoice &&
        forEach(invoice, (value, key) => {
          if (!value) {
            invoice[key] = locallyStoredInvoice[key]
          }
        })

      // Watch the invoice object for changes, updating hash params and localStorage as needed
      this.$watch('invoice', invoice => {

        this.$router.replace({ hash: JSON.stringify(invoice) })

        localStorage.setItem('invoice', JSON.stringify(invoice))

      }, { deep: true })

      this.mounted = true

    },

    methods: {


      focusOnNextTick(refName, select = true) {
        this.$nextTick(() => {
          let element = this.$refs[refName]

          isArray(element) && ( element = element[0] )
          element.$el && ( element = element.$el )

          console.log(element)

          element.focus()

          select && document.execCommand('selectAll',false,null) // a workaround, since it is now deprecated
        })
      },

      addItem() {
        this.invoice.items = [...this.invoice.items, { title: 'Another item', quantity: '1', price: '100' }]
        // Focus and select on the last of 'title' elements on next tick
        this.focusOnNextTick('title')
      },


      total(key) {
        return sumBy(this.invoice.items, item => parseFloat(item[key]) || 0)
      },

      without, sumBy, upperFirst
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