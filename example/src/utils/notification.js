const Notification = {};
export default Notification;

export function createNotification(notification, isMobile) {
  Notification.success = ({ title, description, duration, onClose, mask }) => {
    if (!isMobile) {
      return notification.success({ title, description, duration: duration == null ? 2 : duration });
    } else {
      return notification[0].success(description, duration == null ? 2 : duration, onClose, mask);
    }
  };

  Notification.error = ({ title, description, duration, onClose, mask, actions }) => {
    if (!isMobile) {
      return notification.error({ title, description, duration });
    } else {
      return notification[1].alert(title, description, actions);
    }
  };
}
