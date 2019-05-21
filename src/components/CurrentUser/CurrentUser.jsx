import React, { useState } from "react";

export const CurrentUserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {}
});

function CurrentUser(props) {
  const [user, setUser] = useState(null);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: user, setCurrentUser: setUser }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUser;
