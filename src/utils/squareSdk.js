/**
 * Dynamically loads the official Square Web Payments SDK script.
 * Environment-aware: Loads production SDK URL if VITE_SQUARE_ENVIRONMENT === 'production',
 * otherwise loads sandbox SDK URL. Zero manual code edits required for Production switch.
 */
export function loadSquareSdk() {
  return new Promise((resolve, reject) => {
    const envSetting = (import.meta.env.VITE_SQUARE_ENVIRONMENT || 'sandbox').toLowerCase().trim()
    const isProduction = envSetting === 'production'
    const sdkUrl = isProduction 
      ? 'https://web.squarecdn.com/v1/square.js'
      : 'https://sandbox.web.squarecdn.com/v1/square.js'

    // 1. Check if a script tag is already attached to DOM
    const existingScript = document.querySelector('script[src*="squarecdn.com"]')
    if (existingScript) {
      // If existing script matches requested environment and window.Square is ready, resolve immediately
      if (existingScript.src === sdkUrl && window.Square) {
        resolve(window.Square)
        return
      }
      // If script src differs from target environment, remove old script tag
      if (existingScript.src !== sdkUrl) {
        existingScript.remove()
        if (typeof window !== 'undefined') {
          delete window.Square
        }
      }
    }

    // 2. Return immediately if Square SDK is already initialized on window for target env
    if (window.Square) {
      resolve(window.Square)
      return
    }

    // 3. Attach target Square Web Payments SDK script to head
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
