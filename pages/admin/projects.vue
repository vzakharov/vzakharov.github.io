<!-- Lists projects, as loaded from Notion database with id process.env.NOTION_PROJECTS_DB_ID -->
<template>
  <div>
    <h1>Projects</h1>
    <b-spinner v-if="!allProjects" />
    <template v-else>
      <!-- Show/hide chart button, navigates to '?chart' -->
      <b-button
        size="sm mb-2"
        v-text="showChart ? 'Hide chart' : 'Show chart'"
        :variant="showChart ? 'outline-primary' : 'outline-secondary'"
        :to="{ ...$route, query: { ...$route.query, chart: showChart ? undefined : null } }"
      />
      <!-- Currency picker button. 'Switch to [the other currency]', options are RUB & USD -->
      <b-button
        size="sm mb-2"
        v-text="`Switch to ${currency === 'RUB' ? 'USD' : 'RUB'}`"
        variant="outline-secondary"
        @click="currency = currency === 'RUB' ? 'USD' : 'RUB'"
      />
      <!-- Copy as TSV button -->
      <b-button
        ref="tsvButton"
        size="sm mb-2"
        v-text="`Copy as TSV`"
        variant="outline-secondary"
        @click="
          copyAsTSV()
          $refs.tsvButton.innerText = 'Copied!'
          window.setTimeout(() => {
            $refs.tsvButton.innerText = 'Copy as TSV'
          }, 1000)
        "
      />
      
      <b-container 
        fluid
      >
        <b-row
          id="container"
        >
          <!-- Sidebar for chart, not too narrow; overflows individually -->
          <b-col
            cols="12" md="5" lg="4" v-if="showChart"
          >
            <Chart v-bind="{ projects }" />
          </b-col>
          <!-- Main content -->
          <b-col 
            v-bind="{
              ...showChart ? { cols: 12, md: 7, lg: 8 } : {}
            }"
          >
            <b-table
              :items="projects"
              striped small no-border-collapse bordered outlined
              foot-clone
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              :fields="[
                { 
                  key: 'month',
                  sortable: true,
                },
                { 
                  key: 'week',
                  sortable: true,
                },
                {
                  key: 'name', 
                  sortable: true,
                },
                {
                  key: 'customer',
                  sortable: true,
                },
                {
                  key: 'status.name',
                  label: 'Status',
                  sortable: true,
                },
                {
                  key: 'payment.name',
                  label: 'Payment',
                  sortable: true,
                },
                {
                  key: 'type.name',
                  label: 'Type',
                  sortable: true,
                }, 
                {
                  key: 'words',
                  label: 'Words',
                  sortable: true,
                },
                {
                  key: currency.toLowerCase() + 'Eq',
                  label: currency,
                  sortable: true,
                },
                {
                  key: 'hoursNet',
                  label: 'Hours',
                  sortable: true,
                },
                {
                  key: 'wordsPerHourNet',
                  label: 'Words/hour',
                  sortable: true,
                },
                {
                  key: currency.toLowerCase() + 'PerHourNet',
                  label: currency + '/hour',
                  sortable: true,
                },
              ]"
            >

              <template #cell(name)="{ item }">
                <a 
                  :href="item.details.url"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  {{ item.name }}
                </a>
              </template>

              <template #cell(customer)="{ item }">
                {{ projectCustomerName(item) }}
              </template>

              <template #[`cell(status.name)`]="{ item }">
                <span v-if="item.status"
                  :style="{
                    backgroundColor: hex(item.status.color)
                  }"
                  v-text="item.status.name"
                />
              </template>

              <template #[`cell(payment.name)`]="{ item }">
                <span v-if="item.payment"
                  :style="{
                    backgroundColor: hex(item.payment.color)
                  }"
                  v-text="item.payment.name"
                />
              </template>

              <template #[`cell(type.name)`]="{ item }">
                <span v-if="item.type"
                  :style="{
                    backgroundColor: hex(item.type.color)
                  }"
                  v-text="item.type.name"
                />
              </template>

              <template #[`head(status.name)`]>
                <!-- Dropdown to filter by status -->
                <b-select
                  v-model="filters.status"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.status ? 'All' : 'Status' },
                    ...chain(allProjects).map('status.name').uniq().filter(identity).value()
                  ]"
                />
              </template>

              <template #[`head(payment.name)`]>
                <!-- Dropdown to filter by payment status -->
                <b-select
                  v-model="filters.payment"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.payment ? 'All' : 'Payment status' },
                    ...chain(allProjects).map('payment.name').uniq().filter(identity).value()
                  ]"
                />
              </template>

              <template #[`head(type.name)`]>
                <!-- Dropdown to filter by type -->
                <b-select
                  v-model="filters.type"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.type ? 'All' : 'Type' },
                    ...chain(allProjects).map('type.name').uniq().filter(identity).value()
                  ]"
                />
              </template>

              <template #head(customer)>
                <!-- Dropdown to filter by customer -->
                <b-select
                  v-model="filters.customer"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.customer ? 'All' : 'Customer' },
                    ...map(customers, 'name')
                  ]"
                />
              </template>
              
              <template #head(week)>
                <!-- Dropdown to filter by week -->
                <b-select
                  v-model="filters.week"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.week ? 'All' : 'Week' },
                    ...chain(allProjects).map('week').uniq().filter(identity).value()
                  ]"
                />
              </template>

              <template #head(month)>
                <!-- Dropdown to filter by month -->
                <b-select
                  v-model="filters.month"
                  size="sm"
                  class="mr-2"
                  :options="[{ value: null, text: filters.month ? 'All' : 'Month' },
                    ...chain(allProjects).map('month').uniq().filter(identity).value()
                  ]"
                />
              </template>

              <template #foot(name)>
                <!-- item quantity -->
                <span v-text="`Total: ${projects.length} items`" />
              </template>

              <template #[`foot(status.name)`]>
                <!-- breakdown by status -->
                <span
                  v-for="( count, status ) in countBy(projects, 'status.name')"
                  :key="status"
                  class="fw-normal small"
                >
                  {{ status[0] }}:{{ count }}
                </span>
              </template>

              <template #[`foot(payment.name)`]>
                <!-- breakdown by payment status -->
                <span
                  v-for="( count, payment ) in countBy(projects, 'payment.name')"
                  :key="payment"
                  class="fw-normal small"
                >
                  {{ payment[0] }}:{{ count }}
                </span>
              </template>

              <template #[`foot(type.name)`]>
                <!-- breakdown by type -->
                <span
                  v-for="( count, type ) in countBy(projects, 'type.name')"
                  :key="type"
                  class="fw-normal small"
                >
                  {{ type[0] }}:{{ count }}
                </span>
              </template>

              <template #foot(customer)>
                <!-- breakdown by customer -->
                <span
                  v-for="( count, customer ) in countBy(projects, projectCustomerName)"
                  :key="customer"
                  class="fw-normal small"
                >
                  {{ customerShortNames[customer] }}:{{ count }}
                </span>
              </template>

              <template #foot(words)>
                {{ format(sumBy(projects, 'words')) }} words
              </template>

              <template #foot(usdEq)>
                {{ format(sumBy(projects, 'usdEq')) }} USD
              </template>

              <template #foot(rubEq)>
                {{ format(sumBy(projects, 'rubEq')) }} RUB
              </template>

              <template #foot(hoursNet)>
                {{ format(sumBy(projects, 'hoursNet')) }} hours
              </template>

              <template #foot(wordsPerHourNet)>
                ~{{ Math.round( sumBy(projectsWith('words', 'hoursNet'), 'words') / sumBy(projectsWith('words', 'hoursNet'), 'hoursNet') / 10 ) * 10 }} words/hour
              </template>

              <template #foot(usdPerHourNet)>
                ~{{ Math.round( sumBy(projectsWith('usdEq', 'hoursNet'), 'usdEq') / sumBy(projectsWith('usdEq', 'hoursNet'), 'hoursNet') / 10 ) * 10 }} USD/hour
              </template>

              <template #foot(rubPerHourNet)>
                ~{{ Math.round( sumBy(projectsWith('rubEq', 'hoursNet'), 'rubEq') / sumBy(projectsWith('rubEq', 'hoursNet'), 'hoursNet') / 10 ) * 10 }} RUB/hour
              </template>

            </b-table>

            <!-- Button to convert visible projects to an invoice -->
            <b-button
              v-if="projects.length"
              variant="primary"
              class="mt-3"
              :to="invoiceUrl"
            >
              Create invoice
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </div>
</template>

<script>

  import { 
    chain, countBy, filter, find, forEach, identity, keys, map, mapValues, pick, pickBy, sumBy, sortBy, uniq, without 
  } from 'lodash'

  export default {

    props: ['notion'],

    data() {
      return {
        allProjects: null,
        customers: null,
        filters: {
          customer: null,
          status: null,
          payment: null,
          type: null,
          week: null,
          month: null
        },
        currency: 'USD',
        window: null,
      }
    },

    async mounted() {

      ;([
        this.allProjects,
        this.customers
      ] = await Promise.all([
        this.notion.queryDatabase(process.env.NOTION_DB_PROJECTS),
        this.notion.queryDatabase(process.env.NOTION_DB_CUSTOMERS)
      ]))

      // Sort customers by name
      this.customers = sortBy(this.customers, customer => customer.name.toLowerCase())

      this.window = window

    },

    computed: {

      projects() {

        let { allProjects, filters: { status, payment, type }, filters } = this

        return filter( allProjects, project => {

          for ( let key in filters ) {
            if ( filters[key] && this.getDisplayValue(project, key) !== filters[key] ) {
              return false
            }
          }
          return true

        })

      },

      customerShortNames() {
        // Maps every customer to a short name, which means the shortest possible starting substring of the name that uniquely identifies the customer among all customers.
        let customerNames = map(this.customers, 'name')
        let mapping = {}
        for ( let customer of this.customers ) {
          // Starting with 1 character, see if there are other customers starting with the same substring. If yes, increase the length of the substring by 1. If not, return the substring.
          mapping[customer.name] = customer.name
          for ( let i = 1; i < customer.name.length; i++ ) {
            let shortName = customer.name.substring(0, i)
            if ( !find(without(customerNames, customer.name), name => name.startsWith(shortName)) ) {
              mapping[customer.name] = shortName
              break
            }
          }
        }
        return mapping

      },

      showChart: {
        get() {
          return typeof this.$route.query.chart !== 'undefined'
        },

        set(value) {
          console.log(value)
          this.$router.push({
            ...this.$route,
            query: {
              ...this.$route.query,
              chart: value ? null : undefined
            }
          })
        }
      },

      invoiceUrl() {

        let { currency } = this

        return '/invoice-generator?invoice=' + encodeURIComponent(JSON.stringify({
          items: this.projects.map(({ name, words, [currency.toLowerCase() + 'Eq']: price }) => {
            return {
              title: name,
              quantity: words,
              price
            }
          }),
          unit: 'words',
          currency
        }))

      }

    },

    watch: {

      filters: {

        handler(filters) {

          // Update route only if it is not already same as filters
          if ( JSON.stringify(pickBy(filters, identity)) !== JSON.stringify(pick(this.$route.query, ['status', 'payment', 'type', 'customer', 'week', 'month'])) ) {
            this.$router.push({
              query: {
                ...this.$route.query,
                // replace nulls with undefined in filters
                ...mapValues(this.filters, value => value ? value : undefined)
              }
            })
          }

        },
        deep: true

      },

      '$route.query': {
        handler(query) {

          this.filters = {
            status: null,
            payment: null,
            type: null,
            customer: null,
            week: null,
            month: null,
            ...mapValues(
              pickBy(pick(query, ['status', 'payment', 'type', 'customer', 'week', 'month']), identity),
              // Convert to number for weeks
              ( value, key ) =>
                [ 'week', 'month' ].includes(key) ? Number(value) : value
            )            
          }

        },
        deep: true,
        immediate: true
      }

    },

    methods: {

      hex(color) {
        // Flat colors
        return ({
          green: '#c8f7c5',
          yellow: '#fff5b3',
          red: '#f7c5c5',
          blue: '#c5e0f7',
          gray: '#e0e0e0',
          lightGray: '#f7f7f7',
          pink: '#f7c5f7',
          brown: '#f7c5c5',
        })[color] || '#fff'
      },

      format(number) {
        return number?.toLocaleString() || 'n/a'
      },

      getDisplayValue(project, key) {
        switch ( key ) {
          case 'customer':
            return this.projectCustomerName(project)
          case 'status':
          case 'payment':
          case 'type':
            return project[key]?.name
          default:
            return project[key]
        }
      },


      projectsWith(...fields) {
        let projectsWithFields = this.projects.filter(project => fields.every(field => project[field]))
        // console.log(`Projects with ${fields.join(', ')}`, projectsWithFields)
        return projectsWithFields
      },

      projectCustomerName(project) {
        let id = project.customer[0]?.id
        return find(this.customers, { details: { id }})?.name
      },

      copyAsTSV() {
        let 
          { projects } = this,
          headers = [
            'name', 'words', 'wordsPerHourNet', 
            // The rest of the headers are calculated from the projects
          ],
          data = []

        for ( let project of projects ) {
          // // Add keys to headers (if not there yet)
          // headers = uniq([ ...headers, ...keys(project) ])
          // Add values to data
          let rowData = []
          for ( let key of headers )
            rowData.push(this.getDisplayValue(project, key))
          data.push(rowData)
        }

        // Add headers in first row
        data.unshift(headers)

        // Convert to TSV
        let tsv = data.map(row => row.join('\t')).join('\n')

        // Copy to clipboard
        navigator.clipboard.writeText(tsv)
       
      },


      sumBy, countBy, chain, identity, find, map

    }
  }

</script>

<style>

  /* stick thead to the top */
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }

  /* stick tfoot to the bottom */
  tfoot {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
  }


</style>