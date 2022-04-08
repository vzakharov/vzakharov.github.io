// Vue mixin including method to calculate price based on the number of words

function copyPrice(words, currentTotalWords = 0) {

  if ( !currentTotalWords ) {
    let [ eph, a, b, k, x ] = [ 150, 1300, 250, 1900, words ]
    let wph = (a*x + b*k)/(x+k)
    // console.log({wph})
    let epw = eph/wph
    // console.log({epw})
    
    // Total price is epw * total words, rounded up to the nearest 20 dollars, minus 1
    let price = epw * words
    let roundup = 20
    price = Math.ceil(price / roundup) * roundup - 1        
    
    return price  
  } else {
    return copyPrice(words + currentTotalWords) - copyPrice(currentTotalWords)
  }

}

export default {

  methods: {

    copyPrice

  }

}