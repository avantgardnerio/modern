const {expect} = require('chai');
const knex = require('../db');
const request = require('supertest');
const app = require('../app');

describe('the server', () => {
    it('should serve users', async () => {
        // setup
        await knex('person').delete();
        const expected = {id: 1, givenName: 'Alan', familyName: 'Turing'};
        await knex('person').insert(expected);

        // exercise
        const response = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        // assert
        expect(response.body).to.deep.equal([expected]);
    })
})