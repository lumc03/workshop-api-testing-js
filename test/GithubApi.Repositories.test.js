const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

require('dotenv').config();

chai.use(chaiSubset);

const instance = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});
const urlBase = 'https://api.github.com/users/aperdomob';

describe('Consume Github Api Get Service', () => {
  // Get
  it('Consume GET Service', async () => {
    const response = await instance.get(`${urlBase}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.id).to.equal(17033942);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('Consume GET Service Jas Repo', async () => {
    const response = await instance.get(`${urlBase}/repos`);

    const array = response.data;
    const jasRepo = array.find((i) => i.name === 'jasmine-json-report');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(jasRepo.name).to.equal('jasmine-json-report');
    expect(jasRepo.description).to.equal('A Simple Jasmine JSON Report');
    expect(jasRepo.private).to.equal(false);

    // download Jasmine Json Report
    const download = await instance.get(`${jasRepo.svn_url}/archive/${jasRepo.default_branch}.zip`);
    expect(download.headers['content-type']).to.equal('application/zip');

    const readme = await instance.get(`${jasRepo.url}/contents/README.md`);
    expect(readme.data).to.containSubset({
      path: 'README.md',
      name: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    });

    // Here, the download_url of readme json always
    // throws me an error when I use ${readme.download_url} instead of the following
    // so I use the url directly
    const urlDownload = 'https://raw.githubusercontent.com/aperdomob/jasmine-json-report/master/README.md';
    const downloadReadme = await instance.get(`${urlDownload}`);
    const content = downloadReadme.data;
    expect(downloadReadme.status).to.equal(StatusCodes.OK);
    expect(md5(content)).to.equal('497eb689648cbbda472b16baaee45731');
  });
});
