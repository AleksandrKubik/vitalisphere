// Simple static asset server

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Get URL and path
    const url = new URL(request.url)
    let path = url.pathname
    
    // Default to index.html for root path
    if (path === '/' || path === '') {
      path = '/index.html'
    }
    
    // Try to fetch from KV storage
    const assetKey = path.startsWith('/') ? path.slice(1) : path
    
    // Forward the request to the origin
    return fetch(request)
  } catch (e) {
    return new Response('Error serving content: ' + e.message, {
      status: 500,
    })
  }
} 