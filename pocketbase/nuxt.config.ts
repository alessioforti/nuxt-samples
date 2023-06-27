// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
		cssPath: '~/assets/main.css',
		configPath: 'tailwind.config',
	},
  devtools: { enabled: true }
})
