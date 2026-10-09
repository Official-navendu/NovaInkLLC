import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import paymentHandler from './api/payments/create.js'
import orderHandler from './api/orders/create.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // Inject server environment variables into process.env for local development
  if (env.SQUARE_ACCESS_TOKEN) process.env.SQUARE_ACCESS_TOKEN = env.SQUARE_ACCESS_TOKEN
  if (env.SQUARE_LOCATION_ID) process.env.SQUARE_LOCATION_ID = env.SQUARE_LOCATION_ID
  if (env.VITE_SQUARE_APPLICATION_ID) process.env.VITE_SQUARE_APPLICATION_ID = env.VITE_SQUARE_APPLICATION_ID
  if (env.VITE_SQUARE_LOCATION_ID) process.env.VITE_SQUARE_LOCATION_ID = env.VITE_SQUARE_LOCATION_ID
  if (env.SQUARE_ENVIRONMENT) process.env.SQUARE_ENVIRONMENT = env.SQUARE_ENVIRONMENT
  if (env.VITE_SQUARE_ENVIRONMENT) process.env.VITE_SQUARE_ENVIRONMENT = env.VITE_SQUARE_ENVIRONMENT

  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY
  if (env.ORDER_FROM_EMAIL) process.env.ORDER_FROM_EMAIL = env.ORDER_FROM_EMAIL
  if (env.ORDER_NOTIFICATION_EMAIL) process.env.ORDER_NOTIFICATION_EMAIL = env.ORDER_NOTIFICATION_EMAIL
  if (env.ADMIN_NOTIFICATION_EMAIL) process.env.ADMIN_NOTIFICATION_EMAIL = env.ADMIN_NOTIFICATION_EMAIL

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-dev-server',
        configureServer(server) {
          // 1. Payment creation endpoint (/api/payments/create)
          server.middlewares.use('/api/payments/create', async (req, res) => {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {}
              } catch (e) {
                req.body = {}
              }
              const mockRes = {
                setHeader: (name, val) => res.setHeader(name, val),
                status: (code) => {
                  res.statusCode = code
                  return mockRes
                },
                json: (data) => {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                }
              }
              await paymentHandler(req, mockRes)
            })
          })

          // 2. Order creation endpoint (/api/orders/create)
          server.middlewares.use('/api/orders/create', async (req, res) => {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {}
              } catch (e) {
                req.body = {}
              }
              const mockRes = {
                setHeader: (name, val) => res.setHeader(name, val),
                status: (code) => {
                  res.statusCode = code
                  return mockRes
                },
                json: (data) => {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                }
              }
              await orderHandler(req, mockRes)
            })
          })
        }
      }
    ]
  }
})
