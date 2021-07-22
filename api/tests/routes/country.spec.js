/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const agent = session(app);
const activity = {
  name:'Surf',
  difficulty: 5, 
  duration: 30, 
  seasons: 'Summer'
};

describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Activity.sync({ force: true })
    .then(() => Activity.create(activity)));
  describe('POST /activity', () => {
      it('should get 200', () =>
        agent.get('/activity').expect(200)
      );
    });
  describe('GET /activity', () => {
    it('should get 200', () =>
      agent.get('/activity').expect(200)
    );
  });
});

