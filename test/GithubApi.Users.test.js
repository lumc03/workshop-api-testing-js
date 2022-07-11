const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://api.github.com/users';

describe('Query Params', () => {
  it('User List Per Page', async () => {
    const response = await instance.get(`${urlBase}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.length).to.equal(30);
  });

  it('Get 10 User Per Page', async () => {
    const users = await instance.get(`${urlBase}`, { params: { per_page: 10 } });

    expect(users.status).to.equal(StatusCodes.OK);
    expect(users.data.length).to.equal(10);
  });

  it('Get 100 User Per Page', async () => {
    const users = await instance.get(`${urlBase}`, { params: { per_page: 100 } });

    expect(users.status).to.equal(StatusCodes.OK);
    expect(users.data.length).to.equal(100);
  });
});
