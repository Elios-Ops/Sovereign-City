/* Notification System */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  z-index: 2000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: notification-fade-in 0.3s ease-out;
}

.notification.success {
  border-left: 5px solid #00ff00;
}

.notification.error {
  border-left: 5px solid #ff0000;
}

.notification.warning {
  border-left: 5px solid #ffff00;
}

.notification.info {
  border-left: 5px solid #00ffff;
}

.notification.fade-out {
  animation: notification-fade-out 0.5s ease-out forwards;
}

@keyframes notification-fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes notification-fade-out {
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
}

/* Add notification functions to window object */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 3000);
}

window.showNotification = showNotification;
