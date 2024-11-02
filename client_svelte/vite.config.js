import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		proxy: {
		  	"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: true,
		  	},
		  	"/socket": {
				target:"https://localhost:3000",
				changeOrigin: true,
				ws: true,
				secure: true
			}
		}
	},
	plugins: [sveltekit()]
});
