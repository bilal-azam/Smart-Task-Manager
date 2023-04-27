export const sendNotification = (message) => {
    if (window.Notification && Notification.permission === 'granted') {
      new Notification('Task Reminder', { body: message });
    } else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Task Reminder', { body: message });
        }
      });
    }
  };
  