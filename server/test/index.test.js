const {expect} = require('chai');
const knex = require('../db');
const request = require('supertest');
const app = require('../app');
const webdriver = require('w3c-webdriver');

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

    it('should render page', async () => {
        let session;
        try {
            session = await webdriver.newSession('http://localhost:9515', {
                desiredCapabilities: {
                    "browserName": "chrome",
                    "chromeOptions": {
                        "args": ["--headless", "--disable-gpu", "--no-sandbox"]
                    }
                }
            });
            await session.go('http://motherfuckingwebsite.com/');
            console.log('gone')
            const header = await session.findElement('css selector', 'h1');
            console.log('found')
            const text = await header.getText();
            console.log(`---${text}---`)
            expect(text).to.equal('This is a motherfucking website.');
        } catch (err) {
            console.log(err.stack);
        } finally {
            session.delete();
        }
    })
})