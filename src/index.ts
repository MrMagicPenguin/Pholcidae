import { getObjectStore, readObject, writeObject } from "./management_funcs/PholObjectManager";
import { createGraphStore } from "./phol_objects/GraphStore";

const store = createGraphStore("./Tree", true)
// This would be broken out as an *ACTION* like POST
getObjectStore("./Tree/.pholcidae/refs")
  .then((data)=>{
    if(data !== false)
      writeObject(data, "Hello World")
    else
      console.log(`Store not found.`);
  })

// // This would be broken out as an *ACTION* like GET
// getObjectStore("./Tree/.pholcidae/refs")
//   .then((data)=> {
//     if(data !== false)
//       readObject(data, "bafe7b67ce438e070c87fcc0f1d1181b9d85d3c5")
//     else
//       console.log(`Store not found.`);
//
//   })