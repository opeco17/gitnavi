export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'gitnavi - %s',
    title: 'Good first issues in GitHub for open-source contribution',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      
      { hid: 'description', name: 'description', content: 'Flexible and powerful filter help you search for good first issues from GitHub. gitnavi support your open-source contribution.' },
      { hid: 'keywords', name: 'keywords', content: 'GitHub,good first issue,help wanted,open-source' },
      
      { hid: 'og:title', property: 'og:title', content: 'gitnavi - Good first issues in GitHub for open-source contribution' },
      { hid: 'og:description', property: 'og:description', content: 'Flexible and powerful filter help you search for good first issues from GitHub. gitnavi support your open-source contribution.' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'gitnavi' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://gitnavi.dev' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@opeco17' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "alternate", hreflang: 'en', href: 'https://gitnavi.dev' },
      { rel: "alternate", hreflang: 'ja', href: 'https://gitnavi.dev/ja' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/utils.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/google-analytics',
    'nuxt-webfontloader',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // treeShake: true,
    defaultAssets: {
      font: false,
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {}
  },

  webfontloader: {
    google: {
      families: ['Roboto:400,500,700', 'Noto+Sans+JP:400,500'],
    },
  },

  axios: {

  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'ja', name: 'Japanese', iso: 'ja_JP', file: 'ja.json' },
    ],
    baseUrl: 'https://gitnavi.dev',
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_and_default',
    lazy: true,
    detectBrowserLanguage: {
      fallbackLocale: 'en',
      useCookie: true,
      cookieKey: 'gitnavi_i18n',
      detectBrowserLanguage: true
    },
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    },
    axios: {
      baseURL: process.env.API_BASE_URL
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
  },

  loading: false,
}
