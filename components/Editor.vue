<template>
  <div>
    <div 
      id="editor"
      class="border border-secondary rounded p-3"
      :style="{
        'height': '90vh', outline: 'none', 'border-color': '#ccc!important',
        'background-color': disabled ? '#eee' : '#fff',
        overflowY: 'scroll',
      }"
      :contenteditable="!disabled"
      v-html="html"
      @input="
        $emit( 'input', $event.target.innerText )
      "
      @blur="content = value"
    />
  </div>
</template>

<script>

  export default {

    props: ['value', 'disabled'],

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
              ctaRegex = /^(\[)(.+)(\])/

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
              let boldOrItalicRegex = /(\*{1,2})(.*?)(\*{1,2})/g
              let boldOrItalic = boldOrItalicRegex.exec(paragraph)?.[1].length
              // If the paragraph contains bold text, wrap it in a strong tag and make the ** part gray
              if ( boldOrItalic ) {
                let formatTag = ['em', 'strong'][boldOrItalic - 1]
                paragraph = paragraph.replace( boldOrItalicRegex, 
                  `${grayOut('$1')}<${formatTag}>$2</${formatTag}>${grayOut('$3')}`
                )
              }
            }
            
            return `<${tag}${attributes}>${paragraph}</${tag}>`

          }).join('\n')
          
          return content

      }
    }

  }

</script>
