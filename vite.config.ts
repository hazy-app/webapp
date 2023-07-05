import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import server from './index'

export default defineConfig(({ command, ssrBuild }) => ({
  build: {
    outDir: `dist${!ssrBuild ? '/public' : ''}`,
    ...(command === 'build' && ssrBuild && {
      copyPublicDir: false,
      minify: false,
    }),
  },
  ssr: {
    target: 'node',
  },
  server: {
    port: +process.env.PORT,
  },
  plugins: [
    react(),
    ...(command === 'serve' ? [
      {
        name: 'server-plugin',
        async configureServer(viteServer) {
          viteServer.middlewares.use(server);
        },
      } as PluginOption,
    ] : []),
  ],
  resolve: {
    alias: {
      '@': resolve('./'),
    }
  },
  define: {
    process: {
      env: {
        API_BASEURL: process.env.API_BASEURL,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  },
}));
