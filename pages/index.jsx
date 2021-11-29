import React, { useState } from "react";
import Register from "../components/Register";
import UserList from "../components/UserList";
import data from "../components/data.json";

function App() {
    const [userList, setUsers] = useState(data);

    const addUser = (user) => {
        let copy = [...userList];
        copy = [...copy, user];
        setUsers(copy);
    };
    return <>
        <Register addUser={addUser} />
        <h4>Registered users:</h4>
        <UserList users={userList} />
    </>;
}

export default App;