const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');
require('dotenv').config();

chai.use(chaiSubset);

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://api.github.com/gists';
const promise = 'new Promise((resolve, reject) => {resolve(123)})';
let createdGist;
let getGist;
let deleteGist;

const gist = {
  description: 'Creating a Gist',
  public: true,
  files: {
    'Promise.js': {
      content: promise
    }
  }
};

describe('Create and Delete a Gist', () => {
  before(async () => {
    createdGist = await instance.post(`${urlBase}`, gist);
  });

  it('Create a Gist', async () => {
    expect(createdGist.status).to.equal(StatusCodes.CREATED);
    expect(createdGist.data).to.containSubset(gist);
  });

  it('Get a Gist', async () => {
    getGist = await instance.get(createdGist.data.url);

    expect(getGist.status).to.equal(StatusCodes.OK);
  });

  it('Delete a Gist', async () => {
    deleteGist = await instance.delete(createdGist.data.url);

    expect(deleteGist.status).to.equal(StatusCodes.NO_CONTENT);
  });
});

describe('Check deletion Gist', () => {
  it('Verify Deletion', async () => {
    try {
      await instance.get(createdGist.data.url);
    } catch (error) {
      expect(error.response.status).to.equal(StatusCodes.NOT_FOUND);
    }
  });
});
