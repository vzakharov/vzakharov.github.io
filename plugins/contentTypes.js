export default {

  data() {
    
    let contentTypes = [
      {
        name: 'Landing page',
        description: 'Introduce your product or service, explain its benefits, and invite your users to take action.',
        wordsBySize: {
          s: 300,
          m: 500,
          l: 700,
        }
      }, {
        name: 'Blog post',
        description: 'Share your knowledge or experience with readers and gain their trust and some SEO juice.',
        wordsBySize: {
          s: 700,
          m: 1000,
          l: 1300,
          xl: 2000
        }
      }, {
        name: 'Social media post',
        description: 'Stay connected with your audience while they scroll through their social media feeds.',
        wordsBySize: {
          s: 50,
          m: 100,
          l: 150,
        }
      }, {
        name: 'Email',
        description: 'Send a message to your users, a newsletter to your subscribers, or a cold email to your prospects.',
        wordsBySize: {
          s: 100,
          m: 200,
          l: 300,
        }
      }, 
    ]

    // set size to m for all content types
    contentTypes.forEach(contentType => {
      contentType.size = 'm'
    })

    return {
      contentTypes,
    }

  }

}