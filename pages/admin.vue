<!-- Enclosing template for the admin area -->
<template>
  <div class="p-3">
    <!-- If not mounted, show a loading spinner -->
    <b-spinner
      v-if="!mounted"
    >
      Loading...
    </b-spinner>
    <!-- If mounted and notionKey is empty, show a form to enter a Notion API key -->
    <b-form v-else-if="!notionKey"
      class="mb-3"
      @submit.prevent="setNotionKey"
    >
      <b-form-group
        label="Notion API key"
        label-for="notionKey"
      >
        <b-form-input
          id="notionKey"
          v-model="notionKey"
          lazy
          placeholder="Enter your Notion API key"
        />
      </b-form-group>
    </b-form>
    <!-- Otherwise, show a button to 'log out' (which essentially resets the notionKey) in the top right corner, in small font -->
    <div v-else>
      <b-spinner
        v-if="!notionWorkspace"
      >
        Loading...
      </b-spinner>
      <template v-else>
        <div class="text-end">
          Logged on to {{ notionWorkspace.name }}
          <b-button
            @click="notionKey = null"
            size="sm"
            variant="outline-secondary"
          >
            Log out
          </b-button>
        </div>
        <NuxtChild
          v-bind="{ notion }"
        />
      </template>

    </div>
  </div>
</template>

<script>

  // Do the necessary imports
  import Notion from '~/plugins/notion'

  export default {

    data() {
      return {
        notionKey: null,
        mounted: false,
        notionWorkspace: null,
        notion: null
      }
    },

    mounted() {

      // Take notionKey from localStorage
      this.notionKey = localStorage.getItem('notionKey')

      this.mounted = true

    },

    watch: {

      async notionKey(key) {

        if ( key ) {
          
          try {

            this.notion = new Notion(key)
            
            this.notionWorkspace = (
              await this.notion.getUser()
            )

            // Save notionKey to localStorage
            localStorage.setItem('notionKey', key)

          } catch (e) {

            this.notionKey = null
            this.$nextTick(() => {
              // If 403, show a notification that the key is invalid. Otherwise, show a generic error message
              let invalidKey = e.response && e.response.status === 403
              this.$root.$bvToast.toast(
                invalidKey ? 'Invalid Notion API key' : 'Something went wrong. Check the developer console for more details.',
                {
                  title: 'Oops!',
                  variant: 'danger',
                  solid: true,
                  autoHideDelay: 3000
                }
              )
            })

          }

        }

      }

    }

  }

</script>

<style>
.toast:not(.show) {
   display: block;
}
</style>