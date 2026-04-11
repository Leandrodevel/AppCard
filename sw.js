
// sw.js
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : { title: 'Nova Oferta!', body: 'Confira as promoções.' };

  const options = {
    body: data.body,
    icon: './img/icon.png', // Ícone da sua loja
    badge: './img/badge.png', // Ícone pequeno na barra de status
    vibrate: [100, 50, 100],
    data: { url: 'https://seusite.com' } // URL para abrir ao clicar
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Ação ao clicar na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
