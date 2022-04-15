<!-- Lists projects, as loaded from Notion database with id process.env.NOTION_PROJECTS_DB_ID -->
<template>
  <div>
    <h1>Projects</h1>
    <b-spinner v-if="!projects" />
    <b-table
      v-else
      :items="projects"
      striped small no-border-collapse bordered outlined
      foot-clone
      :fields="[
        'name', 
        {
          key: 'status.name',
          label: 'Status'
        },
        {
          key: 'type.name',
          label: 'Type'
        }, 
        'words', 'usdEq', 'hoursNet', 'wordsPerHourNet', 'usdPerHourNet'
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
        {{ sumBy(projects, 'words').toLocaleString() }} words
      </template>

      <template #foot(usdEq)>
        {{ sumBy(projects, 'usdEq').toLocaleString() }} USD
      </template>

      <template #foot(hoursNet)>
        {{ sumBy(projects, 'hoursNet').toLocaleString() }} hours
      </template>

      <template #foot(wordsPerHourNet)>
        ~{{ Math.round( sumBy(projects, 'words') / sumBy(projects, 'hoursNet') / 10 ) * 10 }} words/hour
      </template>

      <template #foot(usdPerHourNet)>
        ~{{ Math.round( sumBy(projects, 'usdEq') / sumBy(projects, 'hoursNet') / 10 ) * 10 }} USD/hour
      </template>

    </b-table>
  </div>
</template>

<script>

  import { chain, countBy, filter, forEach, identity, pickBy, sumBy } from 'lodash'

  export default {

    props: ['notion'],

    data() {
      return {
        allProjects: null,
        filters: {
          status: null,
          type: null
        }
      }
    },

    async mounted() {

      this.allProjects = (
        await this.notion.queryDatabase(process.env.NOTION_PROJECTS_DB_ID)
      )

    },

    computed: {

      projects() {

        let { allProjects, filters: { status, type }, filters } = this

        return filter( allProjects, project => {
          for ( let key in filters ) {
            if ( filters[key] && project[key]?.name !== filters[key] ) {
              return false
            }
          }
          return true
        })

      }


    },

    watch: {

      filters: {

        handler(filters) {

          // Update route only if it is not already same as filters
          if ( JSON.stringify(filters) !== JSON.stringify(this.$route.query) ) {
            this.$router.push({
              query: pickBy(filters, identity)
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
            ...query
          }
          console.log(JSON.stringify(this.filters))

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

      sumBy, countBy, chain, identity

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