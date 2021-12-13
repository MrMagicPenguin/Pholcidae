import React, { useState } from "react";
import Register from "../components/Register";
import UserList from "../components/UserList";
import data from "../components/data.json";
import AddFolder from "../components/AddFolder";
import "/main.css";
import FolderList from "../components/FolderList";


function App() {
    const [userList, setUsers] = useState(data);

    const addUser = (user) => {
        let copy = [...userList];
        copy = [...copy, user];
        setUsers(copy);
    };

    return (
      <div className="container">
          <h4 className="Header">Mock Inputs</h4>

          <div className="Input">
              <Register addUser={addUser} />
          </div>

          <div className="Users">
              <h4>Registered users:</h4>
              <UserList users={userList} />
          </div>

          <div className="Folders">
              <FolderList users={userList} />
          </div>
      </div>
    );
}

export default App;