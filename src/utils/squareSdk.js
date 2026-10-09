/**
 * Dynamically loads the official Square Web Payments SDK script.
 * Environment-aware: Loads production SDK URL if VITE_SQUARE_ENVIRONMENT === 'production',
 * otherwise loads sandbox SDK URL. Zero manual code edits required for Production switch.
 */
export function loadSquareSdk() {
  return new Promise((resolve, reject) => {
    // 1. Return immediately if Square SDK is already initialized on window
    if (window.Square) {
      resolve(window.Square)
      return
    }

    // 2. Determine SDK URL based on explicit environment setting
    const isProduction = import.meta.env.VITE_SQUARE_ENVIRONMENT === 'production'
    const sdkUrl = isProduction 
      ? 'https://web.squarecdn.com/v1/square.js'
      : 'https://sandbox.web.squarecdn.com/v1/square.js'

    // 3. Check if script tag is already attached to DOM
    const existingScript = document.querySelector('script[src*="squarecdn.com"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.Square) resolve(window.Square)
        else reject(new Error('Square SDK script loaded but window.Square object is missing.'))
      })
      existingScript.addEventListener('error', () => {
        reject(new Error('Failed to load Square Web Payments SDK script.'))
      })
      return
    }

    // 4. Attach Square Web Payments SDK script to head
    const script = document.createElement('script')
    script.src = sdkUrl
    script.async = true
    script.onload = () => {
      if (window.Square) {
        resolve(window.Square)
      } else {
        reject(new Error('Square Web Payments SDK loaded without window.Square instance.'))
      }
    }
    script.onerror = () => {
      reject(new Error(`Failed to load Square Web Payments SDK from ${sdkUrl}. Please check network connectivity.`))
    }
    document.head.appendChild(script)
  })
}
