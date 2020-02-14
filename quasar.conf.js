module.exports = function(ctx) {
  return {
    boot: ['axios', 'composition-api'],

    css: ['app.sass'],

    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'material-icons',
      lang: 'en-us',
      all: 'auto',

      components: [],
      directives: [],

      plugins: []
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      showProgress: true,
      gzip: false,
      analyze: false,
      // preloadChunks: false,
      // extractCSS: false,

      extendWebpack(cfg) {}
    },

    devServer: {
      https: false,
      port: 8080,
      open: true
    },

    animations: [],

    ssr: {
      pwa: false
    }
  }
}
