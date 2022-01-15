import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (NotificationListeners) => {
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    if (NotificationListeners)
      notificationListener.current =
        Notifications.addNotificationReceivedListener(NotificationListeners);
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token.data);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
