<template>
  <b-container>
    <b-row class="mt-2 mt-md-5">
      <b-col cols="12" lg="8" offset-lg="2">
        <h1 class="display-4">
          {{ $attrs.title }}
        </h1>
        <h2 class="lead mb-4" v-if="$attrs.subtitle">
          {{ $attrs.subtitle }}
        </h2>
        <slot/>
      </b-col>
    </b-row>
  </b-container>
</template>
