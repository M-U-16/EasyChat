import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({mode}) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())}

	return defineConfig({
		server: {
			proxy: {
				"/api": {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
					secure: true,
				},
				"/socket.io": {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
					ws: true,
					secure: true
				}
			}
		},
		plugins: [sveltekit()]
	});
}
