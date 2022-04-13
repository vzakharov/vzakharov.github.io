<!-- Link shortener -->
<template>
  <div
    class="vh-100 d-flex align-items-center justify-content-center text-center"
  >
    <!-- Span right in the middle of the page, vertically and horizontally centered -->
    <span v-if="!mounted || id || url">
      <b-spinner
        variant="primary"
        class="ml-2"
        :animation="{
          name: 'border',
          duration: 1000,
          timing: 'ease-in-out',
          delay: 100
        }"
      />
      <span 
        class="ml-2"
        v-text="url ? 'Shortening your link' : id ? 'Redirecting' : 'Loading' "
      />, please wait...
    </span>
    <template v-else>
      <b-form-input
        v-if="!shortLink"
        style="max-width: 400px;"
        v-model="url"
        lazy
        :placeholder="!shortLink ? 'Enter a long URL' : 'Enter another long URL'"
        class="mb-3"
      />
      <span 
        v-else
        @click="copyToClipboard"
        class="text-muted"
        style="cursor: pointer;"
        v-text="copied ? 'Copied!' : shortLink + ' (click to copy)' "
      />
    </template>

      
  </div>
</template>

<script>

  import Notion from '~/plugins/notion'

  export default {

    data() {
      let {
        id, url
      } = this.$route.query

      return {
        id, url,
        shortLink: null,
        copied: false,
        mounted: false
      }

    },

    async mounted() {

      let { url, id } = this
      if ( url ) {

        this.shorten()

      } else if (id) {

        let url = (
          await Notion.anon.getPage(id)
        ).properties.url

        window.location = url

      }

      this.mounted = true

    },

    methods: {

      copyToClipboard() {
        let { shortLink } = this
        navigator.clipboard.writeText(shortLink)
        this.copied = true
        setTimeout(() => this.copied = false, 1000)
      },

      async shorten() {

        let { url } = this
        if (url) {
          try {

            let { properties: { shortLink } } =
              await Notion.anon.createPage({
                parent: {
                  database_id: '7bcfca75ac5f40b68c3cf876b08316e2'
                },
                properties: {
                  // Extract domain name from url for the name
                  name: url.match(/^(?:\w+:\/\/)([^\/]+)/)[1],
                  url
                }
              })
            
            console.log({ shortLink })
            
            Object.assign(this, { 
              shortLink,
              url: null
            })

          } catch (e) {
            this.url = null
            console.error(e)
          }
        }

      },

    },

    watch: {
        
        url(url) {
          url && this.shorten()
        },
  
    }

  }

</script>

<style>

</style>