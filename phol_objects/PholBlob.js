import {PholObject} from "./PholObject.js";
class PholBlob extends PholObject{
    format = Buffer.from('blob')

    serialize() {
        return this.blobdata
    }
    deserialize(data) {
        this.blobdata = data
    }
}