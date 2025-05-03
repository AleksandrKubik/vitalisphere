// Simple static assets handler
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  // Serve static assets from the site bucket
  return fetch(request)
} 