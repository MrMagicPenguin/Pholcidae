import { getObjectStore, readObject, writeObject } from './management_funcs/PholObjectManager';


//const store = createGraphStore("./Tree", true)
// This would be broken out as an *ACTION* like POST
getObjectStore('./Tree/.pholcidae/refs')
	.then((data)=>{
		if(data !== false)
			writeObject(data, 'Hello World');
		else
			console.log('Store not found.');
	});

// // This would be broken out as an *ACTION* like GET
getObjectStore('./Tree/.pholcidae/refs')
	.then((data)=> {
		if(data !== false)
			readObject(data, 'c83817c1413bffba4835c47664176dd3bb417daa');
		else
			console.log('Store not found.');

	});