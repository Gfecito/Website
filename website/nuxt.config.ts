// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    firebase: {
      gen: 2
    }
  },

  ssr: false,       // Disable server-side rendering (useful for SPAs)

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  components: [
    { path: '~/components/atomic' },
    { path: '~/components/personal', prefix: 'Personal' },
    { path: '~/components/professional', prefix: 'Professional' },
    '~/components'
  ],

  compatibilityDate: '2024-07-29'
})