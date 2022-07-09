const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://api.github.com/user/following';

describe('Consume Put Method', () => {
  // Get
  it('Follow a user service', async () => {
    const response = await instance.put(`${urlBase}/aperdomob`);

    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    expect(response.data).to.equal('');
  });

  it('Following Check', async () => {
    const response = await instance.get(`${urlBase}`);

    const userFollowed = response.data.find((i) => i.login === 'aperdomob');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(userFollowed.login).to.equal('aperdomob');
  });

  it('Follow a user again', async () => {
    const response = await instance.put(`${urlBase}/aperdomob`);

    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    expect(response.data).to.equal('');
  });
});
