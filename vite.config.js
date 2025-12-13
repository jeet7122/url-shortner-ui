import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import SiteMap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), SiteMap({
      hostname: 'https://urlshrinkit.store',
      dynamicRoutes:[
          '/about',
          '/privacy',
          '/terms',
          '/register',
          '/login'
      ],
      generateRobotsTxt: true,
  })],
})
