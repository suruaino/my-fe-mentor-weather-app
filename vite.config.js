import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

})


// export default defineConfig({
//   server: {
//     proxy: {
//       "/geoapi": {
//         target: "https://geocoding-api.open-meteo.com",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/geoapi/, ""),
//       },
//     },
//   },
// });

