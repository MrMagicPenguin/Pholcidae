import { GraphStore } from '../types/phol_objects/GraphStore';

export class PholObject {
	public repo: GraphStore;

	constructor(repo: GraphStore, data: string) {
		this.repo = repo;
		if (data !== null){
			this.deserialize(data);
		}
	}
	serialize(){
		// interface
		throw 'Unimplemented!';
	}
	deserialize(data: string){
		throw 'Unimplemented!';
	}
}