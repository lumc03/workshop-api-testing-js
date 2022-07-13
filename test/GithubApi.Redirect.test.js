const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://github.com/aperdomob/redirect-test';
let response;
const redirectUrl = 'https://github.com/aperdomob/new-redirect-test';

describe('Consume Head Service', () => {
  it('Checking redirect Url', async () => {
    response = await instance.head(`${urlBase}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.request.res.responseUrl).to.equal(redirectUrl);
    expect(response.data).to.equal('');
  });

  it('Verify redirect', async () => {
    response = await instance.get(`${urlBase}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.request.res.responseUrl).to.equal(redirectUrl);
    expect(response.data).to.not.be.equal('');
  });
});
