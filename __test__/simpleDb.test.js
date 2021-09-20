import { rm, mkdir, } from 'fs/promises';
import SimpleDb from '../lib/simpleDb.js';

describe('simpleDb creates files, as well as reads and copies them', () => {
  const destination = '../store';

  beforeEach(() => {
    return rm(destination, { recursive: true, force: true }).then(() => {
      return mkdir(destination, { recursive: true });
    });
  });

  it('it tests if a file is made', () => {
    const dir = new SimpleDb(destination);
    const file = { stuff: 'file1.txt' };
    return dir.save(file).then(() => {
      expect(file.id).toEqual(expect.any(String));
    });
  });

  it('saves and reads an object', () => {
    const dir = new SimpleDb(destination);
    const file = { stuff: 'file2.txt'}

    return dir.save(file).then((fileName) => {
      return dir.get(fileName)
    }).then((thing) => {
      expect(thing).toEqual(file);
    })
  })

  it('saves multiple files and reads back the info in each as obj', () => {
    const dir = new SimpleDb(destination);
    const file1 = { stuff: 'file1.txt'}
    const file2 = { stuff: 'file2.txt'}

    return Promise.all([dir.save(file1), dir.save(file2)]).then(() => {
      dir.getAll().then((res) => {
        expect(res).toEqual(expect.arrayContaining([file1, file2]));
      })
    })
  })

});


