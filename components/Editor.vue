<template>
  <div
    id="editor"
    :style="{
      'background-color': disabled ? '#eee' : '#fff',
      overflowY: 'scroll',
    }"
  >
    <div 
      :contenteditable="!disabled"
      style="outline: none"
      v-html="html"
      @input="
        $emit( 'input', $event.target.innerText )
      "
      @blur="blur"
    />
    <div
      style="height: 200px"
    />
  </div>
</template>

<script>

  export default {

    props: ['value', 'disabled', 'disableFormatting'],

    data() {
      return {

        content: this.value,
        
      }
    },

    computed: {

      html() {

          let { content } = this
          // Break content into paragraphs, wrapping each paragraph in a respective tag
          content = content.split(/\n+/).map( paragraph => {
            
            let
              tag = 'p',
              attributes = '',
              headingRegex = /^(#+) /,
              headingLevel = headingRegex.exec(paragraph)?.[1].length,
              bulletRegex = /^(\*) /,
              ctaRegex = /^(\[)(.+)(\])$/

            if ( !this.disableFormatting ) {

              const grayOut = text => `<span style="color: #ccc">${text}</span>`

              if ( headingLevel ) {
                tag = `h${headingLevel}`
                paragraph = paragraph.replace( headingRegex, grayOut('$1 ') )
              } else if ( bulletRegex.test(paragraph) ) {
                tag = 'li'
                paragraph = paragraph.replace( bulletRegex, grayOut('$1 ') )
              } else if ( ctaRegex.test(paragraph) ) {
                paragraph = paragraph.replace( ctaRegex, 
                  `<button class="btn btn-primary">${grayOut('$1')}$2${grayOut('$3')}</button>`
                )
              }

              // If the paragraph is empty, add a heigh 1em attribute to the paragraph tag
              if ( !paragraph.trim() ) {
                attributes = ' style="height: 1em"'
              } else {

                let
                  boldOrItalicRegex = /(\*{1,2})(.*?)(\*{1,2})/g,
                  boldOrItalic = boldOrItalicRegex.exec(paragraph)?.[1].length,
                  linkRegex = /(\[)(.+?)(\]\(.+?\))/g,
                  highlightRegex = /(==)(.+?)(==)/g

                if ( boldOrItalic ) {
                  let formatTag = ['em', 'strong'][boldOrItalic - 1]
                  paragraph = paragraph.replace( boldOrItalicRegex, 
                    `${grayOut('$1')}<${formatTag}>$2</${formatTag}>${grayOut('$3')}`
                  )
                }
                
                if ( linkRegex.test(paragraph) ) {
                  paragraph = paragraph.replace( linkRegex, 
                    `${grayOut('$1')}<a href="$4">$2</a>${grayOut('$3')}`
                  )
                }

                if ( highlightRegex.test(paragraph) ) {
                  paragraph = paragraph.replace( highlightRegex, 
                    `${grayOut('$1')}<mark>$2</mark>${grayOut('$3')}`
                  )
                }

              }

            }
            
            return `<${tag}${attributes}>${paragraph}</${tag}>`

          }).join('\n')
          
          return content

      }
    },

    methods: {

      blur($event) {
        // Only fire if the active element is not the editor
        if ( document.activeElement !== $event.target ) {
          this.content = this.value
        }
      }

    }

  }

</script>

<style scoped>
  #editor {
    font-size: 1.2em;
    font-family: 'Sorts Mill Goudy', 'Georgia', serif;
    /* Rounded shadow, no borders */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 5px;

    height: calc(100vh - 120px);
    padding: 20px;
    
    background-color: #fff;
  }

</style>