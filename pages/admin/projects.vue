<!-- Lists projects, as loaded from Notion database with id process.env.NOTION_PROJECTS_DB_ID -->
<template>
  <div>
    <h1>Projects</h1>
    <b-spinner v-if="!projects" />
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
      
      <b-container>
        <b-row>
          <!-- Sidebar for chart, not too narrow --> 
          <b-col cols="12" md="5" lg="4" v-if="showChart">
            <Chart v-bind="{ projects }" />
          </b-col>
          <!-- Main content -->
          <b-col v-bind="{
            ...showChart ? { cols: 12, md: 7, lg: 8 } : {}
          }">
            <b-table
              :items="projects"
              striped small no-border-collapse bordered outlined
              foot-clone
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              :fields="[
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

              <template #foot(name)>
                <!-- item quantity -->
                <span v-text="`Total: ${projects.length} items`" />
              </template>

              <template #[`foot(status.name)`]>
                <!-- breakdown by status -->
                <span
                  v-for="( count, status ) in countBy(projects, 'status.name')"
                  :key="status"
                  class="fw-normal"
                >
                  {{ status[0] }}:{{ count }}
                </span>
              </template>

              <template #[`foot(type.name)`]>
                <!-- breakdown by type -->
                <span
                  v-for="( count, type ) in countBy(projects, 'type.name')"
                  :key="type"
                  class="fw-normal"
                >
                  {{ type[0] }}:{{ count }}
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
                ~{{ Math.round( sumBy(filledProjects, 'words') / sumBy(projects, 'hoursNet') / 10 ) * 10 }} words/hour
              </template>

              <template #foot(usdPerHourNet)>
                ~{{ Math.round( sumBy(filledProjects, 'usdEq') / sumBy(projects, 'hoursNet') / 10 ) * 10 }} USD/hour
              </template>

              <template #foot(rubPerHourNet)>
                ~{{ Math.round( sumBy(filledProjects, 'rubEq') / sumBy(projects, 'hoursNet') / 10 ) * 10 }} RUB/hour
              </template>

            </b-table>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </div>
</template>

<script>

  import { chain, countBy, filter, find, forEach, identity, map, mapValues, pick, pickBy, sumBy, sortBy } from 'lodash'

  export default {

    props: ['notion'],

    data() {
      return {
        allProjects: null,
        customers: null,
        filters: {
          customer: null,
          status: null,
          type: null
        },
        currency: 'USD',
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

    },

    computed: {

      projects() {

        let { allProjects, filters: { status, type }, filters } = this

        return filter( allProjects, project => {
          for ( let key in filters ) {
            if ( key == 'customer') {
              if ( filters[key] && this.projectCustomerName(project) != filters[key] ) {
                return false
              }
            } else if ( filters[key] && project[key]?.name !== filters[key] ) {
              return false
            }
          }
          return true
        })

      },

      filledProjects() {
        // Projects with monetary, word, and hours data filled in
        return filter( this.projects, project => 
          ['usdEq', 'words', 'hoursNet'].every( key => project[key] )
        )
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
      }


    },

    watch: {

      filters: {

        handler(filters) {

          // Update route only if it is not already same as filters
          if ( JSON.stringify(pickBy(filters, identity)) !== JSON.stringify(pick(this.$route.query, ['status', 'type', 'customer'])) ) {
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
            type: null,
            customer: null,
            ...pickBy(pick(query, ['status', 'type', 'customer']), identity)
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

      projectCustomerName(project) {
        let id = project.customer[0]?.id
        return find(this.customers, { details: { id }})?.name
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