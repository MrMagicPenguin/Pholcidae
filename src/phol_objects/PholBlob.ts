import {PholObject} from "./PholObject";


export class PholBlob extends PholObject{

    format = Buffer.from('blob')
    private blobdata: string;
    serialize(): string {
        return this.blobdata
    }
    deserialize(data: string) {
        this.blobdata = data
    }
}