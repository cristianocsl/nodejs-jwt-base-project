const chai = require('chai');
const chaiHttp = require('chai-http'); // com esse plugin poderemos simular uma request a nossa API sem precisar subir a api manualmente.
const { expect } = chai;

const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
// Agora é só testar nossos end-points utilizando a referência deles contida em ./src/api/app.js :
const server = require('../src/api/app');

chai.use(chaiHttp);

describe('POST /api/users', () => {
  describe('quando é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
      .post('/api/users')
      .send({
        username: 'jane',
        password: 'senha123'
      });
    });
  
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 201', () => {
      chai.expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      chai.expect(response.body).to.be.a('object')
    });

    it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"', () => {
      chai.expect(response.body.message)
                    .to.be.equal('Novo usuário criado com sucesso');
    });
  })
})