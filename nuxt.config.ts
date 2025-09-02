// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  vue: {
    compilerOptions: {
      compatConfig: {
        MODE: 3
      }
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@nuxt/icon',
  ]
})