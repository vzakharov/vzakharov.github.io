// Vue mixin including method to calculate price based on the number of words
// Legend:
// wph - (computed) words per hour
// wphMax - maximum words per hour, achieved at higher word counts
// wphMin - minimum words per hour, achieved at lower word counts
// midpoint - point where productivity is halfway between wphMax and wphMin
// eph - target earnings per hour
// epw - target earnings per word

function getWph(words, { wphMin, wphMax, midpoint } = this.$store.state) {
  console.log(...arguments)
  return ( wphMax * words + wphMin * midpoint ) / ( words + midpoint )
}

function getPrice(words, { currentTotalWords = 0, ...params } = {} ) {
  console.log(...arguments)
  if ( !currentTotalWords ) {

    let { wphMin, wphMax, midpoint, hourlyRate } = {
      ...this.$store.state, ...params
    }

    let wph = this.getWph(words, { wphMin, wphMax, midpoint })
    console.log({wph})
    let epw = hourlyRate/wph
    console.log({epw})
    
    // Total price is epw * total words, rounded up to the nearest 20 dollars, minus 1
    let price = epw * words
    let roundup = 20
    price = Math.ceil(price / roundup) * roundup - 1        
    
    return price  
  } else {
    return this.getPrice(words + currentTotalWords) - this.getPrice(currentTotalWords)
  }

}

export default {

  methods: {

    getPrice, getWph

  }

}