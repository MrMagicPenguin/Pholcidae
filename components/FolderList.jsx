import React from "react";
import Folder from "./Folder";


const FolderList = ({ users }) => {
    // show list of folders a user has
    return (
      <div className="Folder">
          {users.map(user => {
              return (
                <div>
                    <h1>{user.username}</h1>
                    <Folder folders={user.folders} />
                </div>
              );
          })}
      </div>
    );
};

export default FolderList;