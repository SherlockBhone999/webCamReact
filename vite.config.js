import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //to view localhost webpage on phone
  /*
  server: {
    host: '0.0.0.0',
    port: 3000, // You can change the port if needed
  }
  */
  server : {
    host : true
  }
})
