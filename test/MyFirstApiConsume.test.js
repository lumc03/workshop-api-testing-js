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
        config = {
            id: 3,
        };

        const response = await axios.get('https://httpbin.org/get', config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.id).to.equal(3);
    });

    //Head 
    it('Consume Head Service', async () => {

        config = {
            id: 3,
        };

        const response = await axios.head('https://httpbin.org', config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.empty;
    });

    //Post
    it('Consume Post Service', async () => {

        config = {
            id: 3
        }
        data = {
            name: 'luisa',
            age: 22

        };

        const response = await axios.post('https://httpbin.org/post', data, config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.id).to.equal(3);


    });

    it('Consume Patch Service', async () => {

        config = {
            id: 3,
        }

        data = {
            name: 'sofia',
        };

        const response = await axios.patch('https://httpbin.org/patch', data, config);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.id).to.equal(3);

    });

    it('Consume Put Service', async () => {

        data = {
            name: 'maria',
            age: 20
        }


        const response = await axios.put('https://httpbin.org/put', data, { id: 3 });
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.id).to.equal(3);

    });



    it('Consume Delete Service', async () => {

        config = {
            id: 3
        }


        const response = await axios.delete('https://httpbin.org/delete', config);
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.id).to.equal(3);

    });
});
