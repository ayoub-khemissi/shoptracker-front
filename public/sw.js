self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/public/assets/img/logo-shoptracker-100x100.png",
      badge: "/public/assets/img/logo-shoptracker-32x32.png",
      vibrate: [500, 200, 500, 200, 500],
      tag: data.tag || "shoptracker-default",
      renotify: true,
      actions: [
        {
          action: "tracklist",
          title: "Tracklist",
          icon: "/public/assets/img/logo-shoptracker-32x32.png",
        },
        {
          action: "product",
          title: "View product",
          icon: "/public/assets/img/logo-shoptracker-32x32.png",
        },
      ],
      data: {
        dateOfArrival: Date.now(),
        url: data.url,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // eslint-disable-next-line no-undef
  const cli = clients;
  const defaultUrl = "https://shoptracker.eu/tracklist";

  switch (event.action) {
    case "tracklist":
      event.waitUntil(cli.openWindow(defaultUrl));
      break;
    case "product":
      event.waitUntil(cli.openWindow(event.notification.data.url || defaultUrl));
      break;
    default:
      event.waitUntil(cli.openWindow(event.notification.data.url || defaultUrl));
      break;
  }
});
