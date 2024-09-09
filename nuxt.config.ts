import { sentryVitePlugin } from '@sentry/vite-plugin';
import topLevelAwait from 'vite-plugin-top-level-await';

const isDev = process.env.NODE_ENV === 'development';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "./modules/supabase-nuxt/src/module.ts",
    "@unlok-co/nuxt-stripe",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "@dargmuesli/nuxt-cookie-control",
    "floating-vue/nuxt",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    "@nuxt/scripts",
  ],
  devtools: { enabled: false },
  imports: {
    presets: [
      {
        from: "@kyvg/vue3-notification",
        imports: ["notify"],
      },
    ],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    azureApiKey: "",
    openaiApiKey: "",
    stripe: {
      key: "",
    },
    aws: {
      accessKeyId: "",
      secretAccessKey: "",
    },
    stripeWebhookSecret: "",
    langfuseSecretKey: "",
    slackContactWebhook: "",
    slackFeedbackWebhook: "",
    public: {
      sentry: {
        // We want to use the values automatically managed by Vercel, so cannot set through NUXT_PUBLIC_*
        dsn: process.env.SENTRY_DSN,
        org: process.env.SENTRY_ORG,
        tracesSampleRate: 1,
      },
      posthogApiKey: "",
      langfuseBaseurl: "",
      langfusePublicKey: "",
      stripe: {
        key: "",
      },
      overrideExam: "",
      cookieDomain: "",
    },
  },
  routeRules: {
    "/api/**": { cors: true },
    "/app/**": { ssr: false },
  },
  supabase: {
    redirect: false,
    cookieOptions: {
      domain: process.env.NUXT_PUBLIC_COOKIE_DOMAIN,
      sameSite: isDev ? "lax" : "none",
      secure: !isDev,
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-US",
        file: "en.ts",
        name: "English",
      },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    lazy: true,
    langDir: "i18n/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "educato:locale",
      cookieDomain: process.env.NUXT_PUBLIC_COOKIE_DOMAIN,
      cookieCrossOrigin: !isDev,
      cookieSecure: !isDev,
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("stripe-"),
    },
  },
  sourcemap: true,
  vite: {
    plugins: [
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        telemetry: false,
      }),
      // https://github.com/mozilla/pdf.js/issues/17245#issuecomment-1899984197
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
  },
  build: {
    transpile: ["pdfjs-dist", "@vuepic/vue-datepicker"],
  },
  eslint: {
    config: { standalone: false },
  },
  compatibilityDate: "2024-07-05",
});
