const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Activity.create({difficulty: 5, duration: 30, season: 'Summer'})
          .then(() => console.log('It requires a valid name'))
          .catch(() => done());
      });
      it('should work when its a valid attributes', (done) => {
        Activity.create({ name:'Surf',difficulty: 5, duration: 30, seasons: 'Summer'})
        .then(() => done())
        .catch((error) => console.log("Error en el catch", error))
      });
    });
  });
});
