import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Notes' }
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' },
        { rel: 'manifest', href: 'site.webmanifest' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com"',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap',
        }
      ]
    }
  },

  compatibilityDate: '2025-08-01',
  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css'
  ],

  i18n: {
    locales: [
      {
        name: 'Українська',
        code: 'uk',
        language: 'uk',
        file: 'uk.js',
        isCatchallLocale: true
      },
      {
        name: 'Русский',
        code: 'ru',
        language: 'ru',
        file: 'ru.js'
      },
      {
        name: 'English',
        code: 'en',
        language: 'en',
        file: 'en.js'
      }
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: process.env.DEFAULT_LOCALE as 'uk' | 'ru' | 'en' | undefined,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

  icon: {
    clientBundle: {
      icons: [
        'lucide:arrow-right',
        'lucide:circle-check',
        'lucide:log-out',
        'lucide:pencil',
        'lucide:panel-right-close',
        'lucide:panel-right-open',
        'lucide:trash'
      ]
    }
  }
})
