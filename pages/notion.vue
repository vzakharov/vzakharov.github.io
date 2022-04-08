<template>
  <ContainerSimple>
    <!-- Notion key input -->
    <b-form-input
      v-model="notionKey"
      placeholder="Notion key"
      class="mb-3"
    />

    <!-- Notion key sign in button -->
    <b-button
      variant="primary"
      class="me-2"
      @click="signIn"
    >
      Sign in
    </b-button>

    <!-- If signed in, display notionUsersList as a table -->
    <b-table
      :items="notionUsersList"
      class="mb-3"
      v-if="notionUsersList"
    />

    <!-- Button to load data from a sample Notion database -->
    <b-button
      variant="primary"
      class="me-2"
      @click="loadSampleData"
    >
      Load sample data
    </b-button>
  </ContainerSimple>
</template>

<script>

  import { Client } from "@notionhq/client"

  export default {

    data() {
      return {
        notionKey: '',
      }
    },

    mounted() {
      // Load Notion key from localStorage and add a watcher to update it in localStorage if it changes
      this.notionKey = localStorage.getItem('notionKey')
      this.$watch('notionKey', (newValue) => {
        localStorage.setItem('notionKey', newValue)
      })
    },

    computed: {
      // Get the Notion client
      notionClient() {
        return new Client({
          auth: this.notionKey,
          notionUsersList: null
        })
      },
    },

    methods: {

      async loadSampleData() {
        // Load sample data from Notion database
        this.$store.dispatch('loadSampleData', {
          notionKey: this.notionKey,
        })
      },

      async signIn() {
        // Sign in to Notion
        this.notionUsersList = await this.notionClient.users.list({})
      },

    },

  }

</script>

<style>

</style>