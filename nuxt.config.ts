// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({
  vite: {
    plugins: [
      Icons({
        // the feature below is experimental ⬇️
        autoInstall: true
      })
    ]
  },

  modules: ['@nuxtjs/tailwindcss', '@stefanobartoletti/nuxt-social-share'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  css: ['animate.css',
    'vue3-tel-input/dist/vue3-tel-input.css'],

  tailwindcss: {
    cssPath: ['~/assets/css/index.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },

  srcDir: 'src/',

  app: {
    head: {
      meta: [
        {
          charset: "UTF-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "application-name",
          content: "2PLAY",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "2PLAY",
        },
        {
          property: "fb:app_id",
          content: "1582223619227957", // Votre Facebook App ID
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/icon.png"
        },
        {
          rel: "canonical",
          href: "http://www.2play.cm"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Ubuntu",
        },
      ],
    }
  },

  nitro: {
    devProxy: {
      // used to avoid CORS ORIGIN ERRORS
      '/proxy/': { 
        target: 'https://api.2play.cm/', 
        changeOrigin: true 
        },
    },
  }

})