<template>
  <!-- A simple editor with a sidebar -->
  <b-container 
    fluid
  >
    <!-- Toolbar -->
    <div class="d-flex justify-content-start p-2">
      <b-button
        v-for="({ method, caption }, key) in {
          toggleSidebar: {
            method: () => showSidebar = !showSidebar,
            caption: showSidebar ? '<<' : '>>'
          }
        }"
        :key="key"
        @click="method()"
        size="sm"
        variant="outline-secondary"
      >
        {{ caption }}
      </b-button>
    </div>
    <b-row
      id="workspace"
      :style="{
        '--full-height': `calc(100vh - ${workspaceTop}px)`,
      }"
      class="full-height"
    >
      <!-- Sidebar, toggleable. On small screens, it has absolute positioning -->
      <b-col
        v-show="showSidebar"
        :class="{
          'position-absolute': width < 768,
          'shadow bg-light full-height': true
        }"
        :style="{
          opacity: width < 768 && 0.9,
        }"
        cols="8" md="4" lg="3" xl="2"
      >
        <!-- List of documents, their content cut with ellipsis -->
        <b-row
          v-for="(d, key) in docs"
          :key="key"
        >
          <b-col
            cols="9"
            class="p-2"
            v-text="
              // Replace newlines with ' / '
              d.content.replace(/\n+/g, ' / ')
              || 
              // Created date and time written as e.g. 'Thu, Apr 10, 10:00 am'
              new Date(d.created).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })
            "
            :style="{
              //'cursor: pointer; overflow: hidden; white-space: nowrap; text-overflow: ellipsis': true,
              cursor: 'pointer', overflow: 'hidden', 'white-space': 'nowrap', 'text-overflow': 'ellipsis',
              // gray italic if no content
              ...( !d.content && {
                'font-style': 'italic',
                'color': '#868686'
              } ),
              // bold if current
              ...( d === doc && {
                'font-weight': 'bold'
              } )
            }"
            @click="
              doc = d
              $router.push({
                query: {
                  id: d.id
                }
              })
            "
          />
          <!-- Delete icon, not shown if there is just one document -->
          <b-col>
            <b-button-close
              v-if="docs.length > 1"
              size="sm"
              @click="
                if ( window.confirm('Are you sure? THERE IS NO UNDO!') ) {
                  doc = docs[key - 1] || docs[key + 1] || null
                  docs = without(docs, d)
                }
              "
            />
          </b-col>
        </b-row>
        <!-- Add new document button -->
        <b-button
          class="mt-2"
          @click="
            doc = newDoc()
            docs = [...docs, doc]
          "
          size="sm"
          variant="outline-secondary"
        >
          +
        </b-button>
      </b-col>
      <!-- Main content -->
      <b-col
        style="max-width: 800px; margin: 0 auto;"
      >
        <!-- Editor div -->
        <div 
          id="editor"
          class="border border-secondary rounded p-3"
          style="white-space: pre-wrap; min-height: 75vh; outline: none; border-color: #ccc!important;"
          contenteditable
          v-text="tempContent"
          @input="doc.content = $event.target.innerText"
          @blur="tempContent = doc.content"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  // const { assign } = Object

  import _ from 'lodash'
  const {
    findIndex, without
  } = _

  function newDoc() {
    return {
      content: '',
      created: Date.now(),
      id: Math.round( Date.now() + Math.random() ) * 1000
    }
  }

  export default {

    data() {

      return {
        mounted: false,
        showSidebar: true,
        width: null,
        tempContent: null,
        workspaceTop: 0,
        docs: null,
        doc: null,
        window: null
      }

    },

    mounted() {

      // Load all doc_[id] keys from localStorage and add them to docs
      this.docs =
        _( localStorage )
        .keys()
        .filter( key => key.startsWith( 'doc_' ) )
        .map( key => JSON.parse( localStorage.getItem( key ) ) )
        .value()
      
      this.doc = 
        _.find( this.docs, {
          id: Number( this.$route.params.id || localStorage.getItem( 'lastDocId' ) )
        } ) 
        || this.docs[0] 
        || newDoc()

      const onResize = () => {
        this.width = window.innerWidth
        this.workspaceTop = document.getElementById('workspace').offsetTop
      }

      // Monitor innerWidth to toggle sidebar
      window.addEventListener('resize', onResize)

      this.window = window
      this.mounted = true

      this.$nextTick(onResize)

    },

    methods: {

      newDoc, without, findIndex

    },

    watch: {

      'doc.id': {

        handler() {

          // Change tempContent on doc change
          this.tempContent = this.doc.content

          // Focus editor
          this.$nextTick(() => {
            document.getElementById('editor')?.focus()
          })

        }

      },

      doc: {

        // Write to localStorage under key = 'doc_[doc.id]'
        handler(doc) {

          localStorage.setItem(`doc_${doc.id}`, JSON.stringify(doc))

        },

        deep: true

      },

      docs: {

        // Delete any doc_[doc.id] keys from localStorage if they are not in docs
        handler(docs) {

          _( localStorage )
          .keys()
          .filter( key => key.startsWith( 'doc_' ) )
          .filter( key => !docs.find( doc => doc.id === parseInt( key.replace( 'doc_', '' ) ) ) )
          .forEach( key => localStorage.removeItem( key ) )

        },

      }



    }

  }

</script>

<style>

[contenteditable]:empty:after {
  content: 'Hello world!';
  color: #999;
}

.full-height {
  height: var(--full-height);
}

</style>