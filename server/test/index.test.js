const {expect, fail} = require('chai');
const knex = require('../db');
const request = require('supertest');
const {app, start, stop} = require('../app');
const webdriver = require('w3c-webdriver');

describe('the server', () => {
    let session;

    before(async () => {
        app.set('port', 3000);
        await start();
        session = await webdriver.newSession('http://localhost:9515', {
            desiredCapabilities: {
                "browserName": "chrome",
                "chromeOptions": {
                    "args": ["--headless", "--disable-gpu", "--no-sandbox"]
                }
            }
        });
    })

    after(async () => {
        await session.delete();
        await stop();
    })

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
        await knex('person').delete();
        const expected = {id: 1, givenName: 'Alan', familyName: 'Turing'};
        await knex('person').insert(expected);

        try {
            await session.go('http://localhost:3000/');
            await waitForElements(session, 'h1');
            const lis = await waitForElements(session, 'li');

            // Assert
            expect(lis.length).to.equal(1);
            expect(await lis[0].getText()).to.equal('Alan Turing');
        } catch(ex) {
            console.error(ex);
            throw ex;
        }
    })

    const waitForElements = (session, qs, timeout = 5000) =>{
        return new Promise((resolve, reject) => {
            const start = new Date().getTime();
            const id = setInterval(() => {
                if (new Date().getTime() - start >= 5000) {
                    clearInterval(id);
                    reject(new Error(`Timeout waiting for elements: ${qs}`));
                }
                session.findElements('css selector', qs).then((elements) => {
                    // console.log('-------------', elements)
                    if (elements.length > 0) {
                        clearInterval(id);
                        resolve(elements);
                    }
                });
            }, 100);
        })
    }

})