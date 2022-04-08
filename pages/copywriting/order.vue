<template>
  <ContainerSimple
    title="Let’s write something"
  >
    Here are some of the things I can write for you:
    <b-row class="mt-2" cols="1" cols-md="2">
      <b-col
        v-for="contentType in contentTypes"
        :key="contentType.name"
      >
        <ContentCard
          v-bind="contentType"
          v-on="{ addToCart }"
        />
      </b-col>
    </b-row>

  </ContainerSimple>
</template>

<script>

  export default {

    data() {
      return {
        contentTypes: [
          {
            name: 'Landing page',
            description: 'Introduce your product or service, explain its benefits, and invite your users to take action.',
          }, {
            name: 'Blog post',
            description: 'Share your knowledge or experience with readers and gain their trust and some SEO juice.',
          }, {
            name: 'Social media post',
            description: 'Stay connected with your audience while they scroll through their social media feeds.',
          }, {
            name: 'Email',
            description: 'Send a message to your users, a newsletter to your subscribers, or a cold email to your prospects.',
          }, 
        ]
      }
    },

    methods: {
      addToCart(contentType) {
        console.log(contentType)
      },
    },
  }

</script>

<style>

</style>