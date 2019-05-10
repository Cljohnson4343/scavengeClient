import React from "react";
import { Avatar } from "@material-ui/core";
import daddario from "../../assets/daddario.png";

const UserAvatar = props => {
  return <Avatar alt="Alexandra Daddario" src={daddario} {...props} />;
};

export default UserAvatar;
