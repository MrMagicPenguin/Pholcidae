import React from "react";
import { log } from "util";

uaud;

const Folder = ({ folders }) => {
    return (
      <>
          <h3>User Folders</h3>
          {folders.map(folder => {
              return <p>{folder.name}</p>;
          })}
      </>
    );
};

export default Folder;