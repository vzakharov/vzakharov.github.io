<!-- A simple yet well-designed github profile page based on bootstrap-vue -->
<template>
  <b-container>
    <!-- Row centered vertically and horizontally -->
    <b-row class="vh-100 align-items-center">
      <b-col cols="12" lg="6" offset-lg="3">
        <h1 class="display-4">
          Vova Zakharov
        </h1>
        <h2 class="lead mb-4">
          Copywriter by the day, coder at night
        </h2>
        <p>
          Hi, I’m Vova. Ever since I was a kid, I have been fascinated by two things: computers and words. For as long as I can remember, I have been switching between having one as a profession and the other as a passion.
        </p>
        <p>
          For the last decade or so, I have been working as a copywriter. Given my background, I have a knack for explaining complex topics in simple words.
        </p>
        <p>
          But when I’m not working, I’m coding — a hobby that takes up most of my time, mind and soul. That’s not exactly healthy, but who am I to judge?
        </p>
        <p>
            Anyway, I guess you’re not here because you want to know what my favorite Metallica album is (it’s Load) or what TV show I’m watching right now (it’s Evil).
        </p>
        <p>
          You want to know what I can do for you.
          So here goes:
        </p>
        <b-button 
          v-for="service in [{
            name: 'Copywriting',
            url: '/copywriting',
            primary: true,
          }, {
            name: 'No-code prototyping',
            url: '/no-code-prototyping'
          }, {
            name: 'Prompt engineering',
            url: '/prompt-engineering'
          }]"
          :key="service.name"
          :href="service.url"
          :variant="service.primary ? 'primary' : 'outline-primary'"
          v-text="service.name"
          class="mx-2"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
</script>
