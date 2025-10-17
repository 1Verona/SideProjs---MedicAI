export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ui: {
    primary: 'blue',
    gray: 'slate'
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
})
