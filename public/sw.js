self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/assets/img/logo-shoptracker-100x100.png",
      badge: "/assets/img/logo-shoptracker-32x32.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "https://shoptracker.eu/tracklist";

  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(urlToOpen));
});
