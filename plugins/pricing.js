// Vue mixin including method to calculate price based on the number of words
// Legend:
// wph - (computed) words per hour
// wphMax - maximum words per hour, achieved at higher word counts
// wphMin - minimum words per hour, achieved at lower word counts
// midpoint - point where productivity is halfway between wphMax and wphMin
// eph - target earnings per hour
// epw - target earnings per word

function getWph(words) {
  let {
    wphMax, wphMin, midpoint
  } = this.$store.state
  return ( wphMax * words + wphMin * midpoint ) / ( words + midpoint )
}

function getPrice(words, currentTotalWords = 0) {
  if ( !currentTotalWords ) {
    let
      eph = 170

    let wph = this.getWph(words)
    // console.log({wph})
    let epw = eph/wph
    // console.log({epw})
    
    // Total price is epw * total words, rounded up to the nearest 20 dollars, minus 1
    let price = epw * words
    let roundup = 20
    price = Math.ceil(price / roundup) * roundup - 1        
    
    return price  
  } else {
    return getPrice(words + currentTotalWords) - getPrice(currentTotalWords)
  }

}

export default {

  methods: {

    getPrice, getWph

  }

}