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
          <div>
            <span class="h1">Invoice #<Editable v-model="invoice.number" /></span>
            <!-- Generate number button -->
            <b-button
              class="text-muted noprint"
              variant="light"
              size="sm"
              v-text="'Generate'"
              @click="generateNumber"
            />
            <!-- Copy to clipboard button. If copied, replaced with 'Copied!' for a few seconds -->
            <b-button
              :disabled="numberCopied"
              class="text-muted noprint"
              variant="light"
              size="sm"
              v-text="numberCopied ? 'Copied!' : 'Copy number to clipboard'"
              @click="copyToClipboard(invoice.number, 'numberCopied')"
            />
          </div>

          <!-- date -->
          dated <Editable v-model="invoice.date" />
          <!-- Set to today button, unless invoice is already dated today -->
          <b-button
            v-if="invoice.date != today"
            class="ms-2 text-muted noprint"
            variant="light"
            size="sm"
            v-text="'Set to today'"
            @click="invoice.date = today"
          />

          <!-- Issuer/Payer details, each as a single multiline editable div -->
          <b-row class="my-5">
            <b-col 
              v-for="party in ['Issuer', 'Payer']"
              :key="party"
              cols="6"
            >
              <h4 v-text="party"/>
              <Editable class="small" v-model="invoice[party.toLowerCase()]" tag="div" />
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
              {{ modifiers ? `Total without ${modifiers}` : 'Total' }}
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
            class="mb-3 text-muted noprint"
            variant="outline-secondary"
            size="sm"
            @click="addItem"
          >
            Add item
          </b-button>

          <!-- Right-aligned totals: total, discount, grand total -->
          <div class="text-end my-5">

            <div
              v-for="modifier in ['discount', 'tax']"
              :key="modifier"
              class="mb-2"
            >
              <!-- Template if is not undefined -->
              <template
                v-if="( typeof invoice[modifier] !== 'undefined' )"
              >
                <span class="h6">
                  {{ upperFirst(modifier) }}:
                  
                  <span
                    v-if="modifier === 'discount'"
                    v-text="'('"
                  /><Editable
                    :ref="modifier"
                    type="number"
                    v-model="invoice[modifier]"
                  /><span
                    v-if="modifier === 'discount'"
                    v-text="')'"
                  />
                
                  {{ invoice.currency }}
                </span>
                <!-- Small 'close' button to remove discount/tax -->
                <span 
                  class="close noprint nofloat" 
                  @click="invoice[modifier] = undefined"
                  style="cursor: pointer;"
                >&times;</span>
              </template>
              <!-- Small 'Add [modifier]' button otherwise -->
              <b-button
                v-else
                class="text-muted noprint"
                variant="light"
                size="sm"
                @click="invoice[modifier] = 0; focusOnNextTick(modifier)"
              >
                Add {{ modifier }}
              </b-button>
            </div>

            <h3
              class="mt-3"
            >Total payable: {{ total('price') - ( invoice.discount || 0 ) + ( invoice.tax || 0 ) }} {{ invoice.currency }}</h3>
          </div>

          <!-- Payment details -->
          <h3
            class="mb-2"
          >
            Payment details
          </h3>
          <Editable
            class="small"
            v-model="invoice.paymentDetails"
            tag="div"
          />

          <!-- Initials -->
          <p
            class="mt-5"
          >
            <Editable v-model="invoice.initials" />
          </p>

          <!-- Div to fill with some whitespace -->
          <div
            class="noprint"
            style="height: 100px;"
          />

        </template>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import { forEach, filter, identity, isArray, without, sumBy, upperFirst } from 'lodash'

  export default {

    data() {

      
      let invoice = {
        number: null,

        // Current date as 'Jul 1, 2019'
        date: null,
        issuer: null,
        payer: null,
        unit: null,
        currency: null,
        items: null,
        discount: null,
        tax: null,
        paymentDetails: null,
        initials: null,
      }

      return { 
        invoice,
        mounted: false,
        numberCopied: false,
      }
    },

    mounted() {

      this.invoice = {
        ...this.invoice,
        ...JSON.parse(this.$route.query.invoice || '{}')
      }


      // If no invoice number is set, take the last invoice number from localStorage and increment it
      if (!this.invoice.number) {
        let lastInvoiceNumber = Number(localStorage.getItem('lastInvoiceNumber'))
        this.invoice.number = lastInvoiceNumber ? lastInvoiceNumber + 1 : 1
      }
      localStorage.setItem('lastInvoiceNumber', this.invoice.number)

      let locallyStoredInvoice = JSON.parse(localStorage.getItem('invoice'))

      let defaultInvoice = {
        number: Math.floor(Math.random() * 1000000),
        date: this.today,
        issuer: 'Enter your company name, address and other details here.\nFeel free to add as many lines as needed.',
        payer: 'Enter the name, address, etc. of the payer here.\nFeel free to add as many lines as needed.',
        unit: 'pcs',
        currency: 'USD',
        items: [{
          title: 'Enter the item title here',
          quantity: 1,
          price: 100
        }],
        paymentDetails: 'Enter the payment details here.\nFeel free to add as many lines as needed.',
        initials: 'Jane Doe',
      }

      forEach(this.invoice, (value, key) => {
        if (!value) {
          this.invoice[key] = locallyStoredInvoice?.[key] || defaultInvoice[key]
        }
      })

      // Watch the invoice object for changes, updating query params and localStorage as needed
      this.$watch('invoice', invoice => {

        this.$router.replace({ query: { invoice: JSON.stringify(invoice) } })

        localStorage.setItem('invoice', JSON.stringify(invoice))

      }, { deep: true })

      this.mounted = true

    },

    computed: {

      today() {
        return new Date().toLocaleDateString?.('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      },

      modifiers() {
        return ['discount', 'tax'].filter(modifier => typeof this.invoice[modifier] !== 'undefined').join(' & ')
      },

    },

    methods: {
      
      async copyToClipboard(text, justCopiedKey) {
        await navigator.clipboard.writeText(text)
        this[justCopiedKey] = true
        setTimeout(() => {
          this[justCopiedKey] = false
        }, 1000)
      },

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

      generateNumber() {

        let { payer, date } = this.invoice

        // [first letter + max. 2 consonants of payer details in upper case, if it exists]-[date in yymmdd]

        let payerPart = payer && (
          ( payer[0] + payer.slice(1).replace(/[^bcdfghjklmnpqrstvwxyz]/gi, '').slice(0, 2) ).toUpperCase()
        )

        this.invoice.number = filter([
          payerPart,
          new Date(date+' UTC').toISOString().slice(2, 10).replace(/-/g, '')
        ], identity).join('-')

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