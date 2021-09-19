import { readFile, writeFile } from 'fs/promises';
import  path  from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(destination) {
    this.destination = destination;
  }
  save(file) {
    
    file.id = shortid.generate();
    const fileName = `file-${file.id}.json`;
    this.createdFile = path.join(this.destination, fileName);
    return writeFile(this.createdFile, JSON.stringify(file));
  }
  get(id) {
    const fileName = `file-${id}.json`;
    this.createdFile = path.join(this.destination, fileName);
    return readFile(this.destination, 'utf-8',)
      .then(notParsedthing => JSON.parse(notParsedthing))
      .catch((errors) => {
        if (errors){
          console.log('thisone', errors);
          return null;
        }
        throw errors;
      });

  }
}

export default SimpleDb;
