import { readFile, writeFile, readdir } from 'fs/promises';
import  path  from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(destination) {
    this.destination = destination;
  }
  save(file) {
    
    file.id = shortid.generate();
    const fileName = `file-${file.id}.json`;
    const pathPlace = path.join(this.destination, fileName);
    const jString = JSON.stringify(file);
    return writeFile(pathPlace, jString).then(() => file.id
    )
  }

  getPath(id){
    const fileName = `file-${id}.json`;
    const filePath = path.join(this.destination, fileName);
    return filePath
  }

  get(id) {
    const getPathById = this.getPath(id);
    return readFile(getPathById, 'utf-8').then(contentTxt =>
      JSON.parse(contentTxt)).catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });

  }
  getAll() {
    return readdir(this.destination).then(filesNamesArr => {
     return Promise.all(filesNamesArr.map(fileName => {
       const id = fileName.slice(5,15)
       return this.get(id)
    
    }))
    })
  }
}

export default SimpleDb;
