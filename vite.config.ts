import path from "path"
import { federation } from '@module-federation/vite';
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  federation({
    filename: 'remoteEntry.js',
    name: 'remote',
    library: { type: 'var', name: 'remote' }, // 👈 clave
    exposes: {
      './remote-app': './src/App.tsx',
    },
    remotes: {},
    shared: {
      react: { singleton: true, requiredVersion: undefined },
      'react-dom': { singleton: true, requiredVersion: undefined },
    }
  }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})