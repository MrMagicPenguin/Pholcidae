import React from "react";
import User from "./User";

const UserList = ({ users }) => {
    return (
      <div>
          {users.map(user => {
              return (
                <User user={user} />
              );
          })}
      </div>
    );
};

export default UserList;