import zlib from 'zlib'

class PholObject {
    constructor(repo, data=null) {
        this.repo = repo

        if (data !== null){
            this.deserialize(data)
        }
    }
    serialize(){
        // interface
        throw "Unimplemented!"
    }
    deserialize(data){
        throw "Unimplemented!"
    }

    readObject(sha){

    }
}