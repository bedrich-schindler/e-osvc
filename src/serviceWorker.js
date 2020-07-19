import { API_URL } from '../config/config';

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(`${API_URL}/`) || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse && !navigator.onLine) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => caches.open('webpack-offline:e-osvc-api')
            .then((cache) => {
              cache.put(event.request, response.clone());

              return response;
            }))
          .catch(() => cachedResponse);
      }),
  );
});
