import { PholObject } from './PholObject';

export interface PholBlob extends PholObject {
  format: Buffer;
}
