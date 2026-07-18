// レッスン日程ページを「ホーム画面に追加」できるようにするための最小限の Service Worker。
// キャッシュ等は行わず、常にネットワークへそのまま素通しする（最新の予定を必ず取得するため）。
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request));
});
