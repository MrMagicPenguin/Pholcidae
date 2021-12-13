import React, { useState } from "react";

export default function Register({ addUser }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(userData);
        setUserData({ username: "", password: "", folders: [] });
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData(userData => ({ ...userData, [name]: value }));
    };
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        folders: []
    });


    return <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text"
               name="username"
               value={userData.username}
               placeholder="Enter username:"
               onChange={handleChange}
        />
        <label>Password:</label>
        <input type="password"
               name="password"
               value={userData.password}
               onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Register</button>
    </form>;
}