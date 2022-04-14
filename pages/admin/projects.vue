<!-- Lists projects, as loaded from Notion database with id process.env.NOTION_PROJECTS_DB_ID -->
<template>
  <div>
    <h1>Projects</h1>
    <b-spinner v-if="!projects" />
    <b-table
      v-else
      :items="projects"
      striped
      :fields="['name', {
        key: 'status.name',
        label: 'Status'
      }]"
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
        <span
          :style="{
            backgroundColor: color(item.status.color)
          }"
          v-text="item.status.name"
        />
      </template>

    </b-table>
  </div>
</template>

<script>

  export default {

    props: ['notion'],

    data() {
      return {
        projects: null,
      }
    },

    async mounted() {

      this.projects = (
        await this.notion.queryDatabase(process.env.NOTION_PROJECTS_DB_ID)
      )
    },

    methods: {

      color(name) {
        // Flat colors
        return ({
          green: '#c8f7c5',
          yellow: '#fff5b3',
          red: '#f7c5c5',
          blue: '#c5e0f7',
          gray: '#e0e0e0',
          pink: '#f7c5f7',
        })[name] || '#fff'
      }

    }
  }

</script>

<style>

</style>