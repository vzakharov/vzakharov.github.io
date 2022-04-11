export default {

  data() {

    let contentTypes = [
      {
        name: 'Landing page',
        id: 'landing',
        description: 'Introduce your product or service, explain its benefits, and invite your users to take action.',
        wordsBySize: {
          s: 300,
          m: 500,
          l: 700,
        }
      }, {
        name: 'Blog post',
        id: 'blog',
        description: 'Share your knowledge or experience with readers and gain their trust and some SEO juice.',
        wordsBySize: {
          s: 700,
          m: 1000,
          l: 1300,
          xl: 2000
        }
      }, {
        name: 'Social media post',
        id: 'smm',
        description: 'Stay connected with your audience while they scroll through their social media feeds.',
        wordsBySize: {
          s: 50,
          m: 100,
          l: 150,
        }
      }, {
        name: 'Email',
        id: 'email',
        description: 'Send a message to your users, a newsletter to your subscribers, or a cold email to your prospects.',
        wordsBySize: {
          s: 100,
          m: 200,
          l: 300,
        }
      }, {
        name: 'Other',
        id: 'other',
        description: 'Any other content type that you need to create.',
        wordsBySize: {
          s: 100,
          m: 500,
          l: 1000,
          xl: 2000,
          xxl: 3000
        }
      }
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