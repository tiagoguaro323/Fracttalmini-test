import path from "path"
import { federation } from '@module-federation/vite';
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  federation({
				filename: 'remoteEntry.js',
				name: 'remote',
				exposes: {
					'./remote-app': './src/App.tsx',
				},
				remotes: {},
				shared: {
					react: {
						requiredVersion: dependencies.react,
						singleton: true,
					},
				},
			}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})