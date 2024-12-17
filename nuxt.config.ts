// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Deskripsi aplikasi' },
        { property: 'og:title', content: 'Smart Source - Landing' },
        { property: 'og:description', content: 'Deskripsi aplikasi' },
        { property: 'og:image', content: '/og-image.png' }
      ],
      link: [
        {
          rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          , integrity: "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          , crossorigin: 'anonymous', referrerpolicy: 'no-referrer'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap' }
      ],
      script: [
        { src: 'https://example.com/script.js', async: true },
        { src: "https://kit.fontawesome.com/f1a55980af.js" }
      ]
    }
  },

  css: [
    '~/assets/css/main.scss', '~/assets/css/_variables.scss'
  ],

  modules: [
    '@nuxtjs/sitemap',
  ],

  plugins: [
    '~/plugins/bootstrap.client',
    '~/plugins/auth-check'
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3000'
    }
  },

  build: {
    transpile: [
      'animejs',
      'pusher-js'
    ],
    extractCSS: true,
    optimizeCSS: true,
  },

  sitemap: {
    hostname: 'https://www.example.com'
  },
})
