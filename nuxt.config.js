export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    NOTION_API_URL: process.env.NOTION_API_URL || 
      // uncomment below for production
      'https://ideality-stage.herokuapp.com/api/notion/',
      // uncomment below for development
      // 'http://localhost:2479/api/notion/',

    ordersDatabaseId: '3df4dd3f18b3422887a63658bde65815',
    NOTION_PROJECTS_DB_ID: '96c49f14abd94d679ab877b308e859b6' || process.env.NOTION_PROJECTS_DB_ID,

    bubbleApiUrl: process.env.BUBBLE_API_URL || 'https://b.ideality.app/api/1.1/wf/',

    vovasEmail: process.env.VOVAS_EMAIL || 'vzakharov@gmail.com',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vzakharov.github.io',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-clipboard',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
