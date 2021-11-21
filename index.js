import {hashCLIInput, parseUserInput} from "./debug/TestInputs.js";
import {createGraphStore} from "./phol_objects/GraphStore.js";
import {readObject, writeObject} from "./management_funcs/PholObjectManager.js";

const store = createGraphStore("./TestDir", true)

const file = writeObject(store, "Hello World!")

readObject(store, file)