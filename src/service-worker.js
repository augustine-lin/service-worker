importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')

const { setCacheNameDetails } = workbox.core
const { registerRoute } = workbox.routing
const { NetworkFirst, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { RangeRequestsPlugin } = workbox.rangeRequests
const { precacheAndRoute } = workbox.precaching

setCacheNameDetails({ prefix: 'pwa-test' })

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp4'),
  new CacheFirst({
    cacheName: 'media-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin()
    ]
  })
)

registerRoute(
  new RegExp('.*\\/api'),
  new NetworkFirst({
    cacheName: 'api-cache'
  })
)

self.__precacheManifest = [].concat(self.__precacheManifest || [])
precacheAndRoute(self.__precacheManifest, {})
