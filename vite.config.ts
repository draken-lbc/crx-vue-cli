import path from 'path'
import fs from 'fs'
import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
const ISDEV = process.env.envConf === 'dev'
const getPages = () => {
  const rolloupInputOptions = {}
  const pagePath = path.join('src', 'pages')
  const dir = fs.readdirSync(pagePath)
  dir.forEach((ele) => {
    const indexTsPath = path.join(pagePath, ele, 'index.ts')
    const indexHtml = path.join(pagePath, ele, 'index.html')
    if (fs.existsSync(indexTsPath)) {
      rolloupInputOptions[ele] = indexTsPath
    } else if (fs.existsSync(indexHtml)) {
      rolloupInputOptions[ele] = indexHtml
    }
  })
  return rolloupInputOptions
}
// https://vitejs.dev/config/
const viteCrxCliPlugin = (): PluginOption => {
  let globalConfig = {}
  return {
    name: 'vite-plugin-crx-cli',
    apply: 'build',
    config: (config, { command }) => {
      globalConfig = config
    },
    // transformIndexHtml(html) {
    //   const str = html
    //     .replace(/src="(.*)"/, (val, a) => {
    //       return `src="../../..${a}"`
    //     })
    //     .replace(/href="(.*)"/, (val, a) => {
    //       return `href="../../..${a}"`
    //     })
    //   return str
    // },
    closeBundle() {
      console.log(path.resolve('manifest.json'))
      fs.copyFile(path.resolve('manifest.json'), path.resolve('dist', 'manifest.json'), (err) => {})
    },
  }
}
export default defineConfig({
  plugins: [vue(), viteCrxCliPlugin()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  define: {
    ISDEV: ISDEV,
  },
  server: {
    open: '/src/pages/popup/index.html',
  },
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: getPages(),
      output: {
        // chunkFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: 'assets/[ext]/[name].[ext]',
      },
    },
  },
})
