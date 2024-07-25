// Import necessary modules and functions from workbox libraries
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all static assets defined in self.__WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for pages, using CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache for pages
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache responses with these status codes
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache expiration time: 30 days
    }),
  ],
});

// Warm the cache with important URLs
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to prefetch and cache
  strategy: pageCache, // Use the pageCache strategy defined above
});

// Register a route for navigation requests
registerRoute(
  ({ request }) => request.mode === 'navigate', // Handle navigation requests
  ({ event }) => {
    return pageCache.handle({ event }); // Use pageCache strategy for these requests
  }
);

// TODO: Implement asset caching
// Register a route for asset requests (e.g., JS, CSS, images)
registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/, // Regular expression to match asset file types
  new StaleWhileRevalidate({
    cacheName: 'assets-cache', // Name of the cache for assets
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with these status codes
      }),
    ],
  })
);
