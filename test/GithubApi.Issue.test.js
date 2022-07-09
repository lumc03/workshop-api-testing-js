const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://api.github.com/user';
const urlIssue = 'https://api.github.com/repos';
let selectedRepo;
let issue;

describe('Consume Post&Patch', () => {
  it('Logged User', async () => {
    const loggedUser = await instance.get(`${urlBase}`);

    expect(loggedUser.status).to.equal(StatusCodes.OK);
    expect(loggedUser.data.public_repos).to.be.greaterThanOrEqual(1);
  });

  it('Get a Repository', async () => {
    const repos = await instance.get(`${urlBase}/repos`);
    selectedRepo = repos.data.find((i) => i.name === 'PostmanPerfBootcamp');

    expect(repos.status).to.equal(StatusCodes.OK);
    expect(selectedRepo.name).to.equal('PostmanPerfBootcamp');
  });

  it('Create an Issue', async () => {
    issue = await instance.post(
      `${urlIssue}/${selectedRepo.owner.login}/${selectedRepo.name}/issues`,
      {
        title: 'Issue'
      }
    );

    expect(issue.status).to.equal(StatusCodes.CREATED);
    expect(issue.data.title).to.equal('Issue');
    expect(issue.data.body).to.equal(null);
  });

  it('Modify an Issue', async () => {
    const response = await instance.patch(
      `${urlIssue}/${selectedRepo.owner.login}/${selectedRepo.name}/issues/${issue.data.number}
      `,
      {
        body: 'Test'
      }
    );

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.title).to.equal('Issue');
    expect(response.data.body).to.equal('Test');
  });
});
