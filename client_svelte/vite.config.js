import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({mode}) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())}

	console.log(process.env.TEST)

	let API_TARGET = process.env.VITE_API_PROTOCOL+
		process.env.VITE_API_HOST+ ":" +
		process.env.VITE_API_PORT

	return defineConfig({
		server: {
			proxy: {
				"/api": {
					target: API_TARGET,
					changeOrigin: true,
					secure: true,
				},
				/* "/socket": {
					target:"https://localhost:3000",
					changeOrigin: true,
					ws: true,
					secure: true
				} */
			}
		},
		plugins: [sveltekit()]
	});
}
