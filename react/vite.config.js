import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

/**
 * Assets (images + videos) still live at the repo root so the legacy static site
 * keeps working. Rather than duplicating ~39MB into react/public, we serve them
 * from ../ in dev and copy them into dist/ at build time.
 *
 * The source folder "Project video" has a space in its name, which forces URL
 * encoding everywhere. We remap it to "project-video" on the way out.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: '../images', dest: '.' },
        // .mkv is deliberately excluded — no browser can decode Matroska.
        // CRM ADMIN.mkv was transcoded to crm-admin.mp4.
        { src: '../Project video/*.{mp4,webm}', dest: 'project-video' },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split the framework out of app code: editing a component then
        // invalidates ~15kB of cache instead of the whole 130kB bundle.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
