
import { v4 as uuidv4 } from 'uuid';

export default class UUID {
  static generate() {
    const uuid = [...uuidv4()];
    
    uuid.splice(0, 1, 'i')

    return uuid.join('')
  }
}