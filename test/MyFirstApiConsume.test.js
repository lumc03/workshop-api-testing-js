const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {

    //Get
    it('Consume GET Service', async () => {
        const response = await axios.get('https://httpbin.org/get');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
    })


    //Get with Parameters
    it('Consume GET Service with Query Parameters', async () => {
        const data = {
            id: '3',
        };

        const response = await axios.get('https://httpbin.org/get', data);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
    });

    //Head 
    it('Consume Head Service', async () => {

        const data = {
            id: '3',
        };
        const response = await axios.head('https://httpbin.org', data);

        expect(response.status).to.equal(StatusCodes.OK);
    });

    //Post
    it('Consume Post Service', async () => {
        config = {
            id: '3',
            name: 'luisa',
            age: 22,

        };

        const response = await axios.post('https://httpbin.org/post', config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');

    });

    it('Consume Patch Service', async () => {
        data = {
            id: '3',
        };

        config = {
            name: 'sofia'
        }

        const response = await axios.patch('https://httpbin.org/patch', data, config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.name).to.equal("sofia");
    });

    it('Consume Put Service', async () => {
        data = {
            id: '3',
        };

        config = {
            name: 'juana',
            age: 21,
        }

        const response = await axios.put('https://httpbin.org/put', data, config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.name).to.equal("juana");
        expect(response.config.age).to.equal(21);
    });
});
