const {expect} = require('chai');
const knex = require('../db');

describe('the server', () => {
    it('should serve users', () => {
        // setup
        knex('person').insert({givenName: 'Alan', familyName: 'Turing'});

        // exercise

        // assert
        expect(true).to.equal(true);
    })
})