import React, { useState, useEffect } from "react";

export const notificationsContext = React.createContext({
  notifications: [],
  setNotifications: () => {}
});

export default function NotificationContext(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {});

  return (
    <notificationsContext.Provider
      value={{
        notifications: notifications,
        setNotifications: setNotifications
      }}
    >
      {props.children}
    </notificationsContext.Provider>
  );
}
