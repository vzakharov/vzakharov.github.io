<!-- Loads a Notion page and allows editing it -->
<template>
  <div style="max-width: 600px; margin: auto">
    <!-- Spinner if no content is loaded -->
    <b-spinner
      v-if="!content"
    />
    <!-- Otherwise, load the content -->
    <div v-else>
      <h1
        v-text="content.child_page.title"
      />
      <div
        v-for="block in blocks"
        :key="block.id"
        v-text="block.plain_text"
      >
        <!-- Outline the span for testing purposes -->
        <span
          v-for="span, i in block.rich_text"
          :key="i"
          v-text="span.plain_text"
          border="1px solid red"
        />
      </div>
    </div>
  </div>
</template>

<script>

  let blockTypes = {
    paragraph: {
      tag: 'div',
    },
    heading_1: {
      tag: 'h2',
      markdownPre: '## ',
    },
    heading_2: {
      tag: 'h3',
      markdownPre: '### ',
    },
    heading_3: {
      tag: 'h4',
      markdownPre: '#### ',
    },
  }

  import { map } from 'lodash'

  export default {

    props: [ 'notion' ],

    data() {

      // page id
      let { id } = this.$route.query

      return {
        id,
        content: null,
        blockTypes,
      }

    },

    computed: {

      // Enrich content children with various properties
      blocks() {

        return map(this.content.children, child => {

          let block = child[child.type]

          return {
            ...child,
            ...block,
            plain_text: map(block.rich_text, 'plain_text').join(''),
          }

        })

      },

    },

    mounted() {

      // Load the content
      this.loadcontent()

    },

    methods: {

      async loadcontent() {

        // Get the content
        this.content = await this.notion.getBlock(this.id)

      },

      map

    }

  }

</script>

<style>

</style>