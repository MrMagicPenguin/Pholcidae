import {hashCLIInput, parseUserInput} from "./debug/TestInputs.js";
import {createGraphStore} from "./phol_objects/GraphStore.js";
import {readObject, writeObject} from "./management_funcs/PholObjectManager.js";
//const graphStore = createGraphStore("./TestDir/", true)
writeObject("TestDir/.pholdir/objects/test.txt", true)
readObject("TestDir/.pholdir/objects/test.txt")