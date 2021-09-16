import { rm, mkdir, } from 'fs/promises';
import SimpleDb from '../lib/simpleDb.js';

describe('simpleDb creates files, as well as reads and copies them', () => {
  const destination = '../store';

//   beforeEach(() => {
//     return rm(destination, { recursive: true, force: true }).then(() => {
//       return mkdir(destination, { recursive: true });
//     });
//   });

  it('it tests if a file is made', () => {
    const dir = new SimpleDb(destination);
    const file = { stuff: 'file1.txt' };
    return dir.save(file).then((saved) => {
      expect(saved).toEqual(file);
    });
  });
});


