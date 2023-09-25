// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@vite-pwa/nuxt'],
	pwa: {
		registerType: 'autoUpdate',
		manifest: {
			name: 'ESAG',
			short_name: 'ESAG',
			theme_color: '#293E4E',
			display: "standalone",
			icons: [
			  {
				src: 'mario_logo_blau.jpg',
				sizes: '192x192',
				type: 'image/jpeg',
			  }
			],
		  },
		  workbox: {
			navigateFallback: '/',
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		  },
		  client: {
			installPrompt: true,
			// you don't need to include this: only for testing purposes
			// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
			periodicSyncForUpdates: 20,
		  },
		  devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallbackAllowlist: [/^\/$/],
			type: 'classic',
		  },
	},
  	devtools: { enabled: true },
	runtimeConfig: {
		FIREBASE_SERVICE_ACCOUNT_KEY: ''
	},
	app: {
		head: {
			title: 'Its a me Ersti',
			viewport: 'width=device-width, initial-scale=1',
			script: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js", body: true }],
		},
	}
	
})
