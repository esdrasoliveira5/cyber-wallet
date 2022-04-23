import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import UserModel from '../../models/UserModel';
import server from '../../server';
const user = new UserModel();

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjJmOTZmYjk1ODQxYmJmODI2MGRjMCIsImVtYWlsIjoicm9iZXJ0b0BlbWFpbC5jb20iLCJpYXQiOjE2NTA2NTM2MzQsImV4cCI6MTY1MTI1ODQzNH0.Fl6dMrria95qYgRXe1Lsk63bmhZcUpQ6qJkkRh3LoqA'
const payload = {
  _id: '6260bca97c58e5a0b7847cfa',
  name: 'Roberto',
  lastName: 'Oliveira',
  email: 'roberto@email.com',
  contact: '+5511987654321',
  password: '$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6',
  balance: 0,
  transactions: [],
  address: {
    street: 'avenida',
    number: '100A',
    district: 'Bairro',
    zipcode: '45687-899',
    city: 'cidade',
    state: 'estado',
    country: 'pais'
  }
}

describe('1 - Test endpoint POST /user', () => {
  describe('1.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(null);
      sinon
      .stub(user.model, 'create')
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });
    it('a) return status 201 and the user created', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "name": "Roberto",
          "lastName": "Oliveira",
          "email": "roberto@email.com",
          "contact": "+5511987654321",
          "password": "roberto_password",
          "address": {
              "street": "avenida",
              "number": "100A",
              "district": "Bairro",
              "zipcode": "45687-899",
              "city": "cidade",
              "state": "estado",
              "country": "pais"
          }
      });
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.deep.equal({
        "_id": "6260bca97c58e5a0b7847cfa",
        "name": "Roberto",
        "lastName": "Oliveira",
        "email": "roberto@email.com",
        "contact": "+5511987654321",
        "password": "$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6",
        "balance": 0,
        "transactions": [],
        "address": {
            "street": "avenida",
            "number": "100A",
            "district": "Bairro",
            "zipcode": "45687-899",
            "city": "cidade",
            "state": "estado",
            "country": "pais"
        }
      });
    });
  });
  describe('1.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(null);
      sinon
      .stub(user.model, 'create')
      .rejects({ message: 'Internal Server Error'});
      sinon
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "name": "Roberto",
          "lastName": "Oliveira",
          "email": "roberto@email.com",
          "contact": "+5511987654321",
          "password": "roberto_password",
          "address": {
              "street": "avenida",
              "number": "100A",
              "district": "Bairro",
              "zipcode": "45687-899",
              "city": "cidade",
              "state": "estado",
              "country": "pais"
          }
      });
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});

describe('2 - Test endpoint POST /user/login', () => {
  describe('2.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });
    it('a) return status 200 and the user with token', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user/login')
         .set('X-API-Key', 'foobar')
         .send({
          "email": "roberto@email.com",
          "password": "roberto_password",
        });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.deep.keys({
        "user": {
          "_id": "6260bca97c58e5a0b7847cfa",
          "name": "Roberto",
          "lastName": "Oliveira",
          "email": "roberto@email.com",
          "contact": "+5511987654321",
          "password": "$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6",
          "balance": 0,
          "transactions": [],
          "address": {
              "street": "avenida",
              "number": "100A",
              "district": "Bairro",
              "zipcode": "45687-899",
              "city": "cidade",
              "state": "estado",
              "country": "pais"
          }
        },
        "token": "bearer Token"
      });
    });
  });
  describe('2.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .rejects({ message: 'Internal Server Error'});
      sinon
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user/login')
         .set('X-API-Key', 'foobar')
         .send({
          "email": "roberto@email.com",
          "password": "roberto_password",
      });
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});

describe('3 - Test endpoint GET /user/:id', () => {
  describe('3.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .onFirstCall()
      .resolves(payload)
      .onSecondCall()
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });
    it('a) return status 200 and the user', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/6260bca97c58e5a0b7847cfa')
         .set('authorization', token)

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.deep.keys({
        "_id": "6260bca97c58e5a0b7847cfa",
        "name": "Roberto",
        "lastName": "Oliveira",
        "email": "roberto@email.com",
        "contact": "+5511987654321",
        "password": "$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6",
        "balance": 0,
        "transactions": [],
        "address": {
            "street": "avenida",
            "number": "100A",
            "district": "Bairro",
            "zipcode": "45687-899",
            "city": "cidade",
            "state": "estado",
            "country": "pais"
          }
      });
    });
  });
  describe('3.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .rejects({ message: 'Internal Server Error'});
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {

      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/6260bca97c58e5a0b7847cfa')
         .set('authorization', token)

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});

describe('4 - Test endpoint GET /user', () => {
  describe('4.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload)

      sinon
      .stub(user.model, 'find')
      .resolves([payload])
    });
    after(()=>{
      sinon.restore();
    });
    it('a) return status 200 and a array with users', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user')
         .set('authorization', token)

      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('4.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .rejects({ message: 'Internal Server Error'});
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {

      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user')
         .set('authorization', token)

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});

describe('5 - Test endpoint PUT /user/:id', () => {
  describe('5.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload);
      sinon
      .stub(user.model, 'findByIdAndUpdate')
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 200 and the user updated', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .put('/user/6260bca97c58e5a0b7847cfa')
         .set('authorization', token)
         .send({
          "name": "Roberto",
          "lastName": "Oliveira",
          "email": "roberto@email.com",
          "contact": "+5511987654321",
          "password": "roberto_password",
          "address": {
              "street": "avenida",
              "number": "100A",
              "district": "Bairro",
              "zipcode": "45687-899",
              "city": "cidade",
              "state": "estado",
              "country": "pais"
          }
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        "_id": "6260bca97c58e5a0b7847cfa",
        "name": "Roberto",
        "lastName": "Oliveira",
        "email": "roberto@email.com",
        "contact": "+5511987654321",
        "password": "$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6",
        "balance": 0,
        "transactions": [],
        "address": {
            "street": "avenida",
            "number": "100A",
            "district": "Bairro",
            "zipcode": "45687-899",
            "city": "cidade",
            "state": "estado",
            "country": "pais"
        }
      });
    });
  });
  describe('5.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload);
      sinon
      .stub(user.model, 'findByIdAndUpdate')
      .rejects({ message: 'Internal Server Error'});
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .put('/user/6260bca97c58e5a0b7847cfa')
         .set('authorization', token)
         .send({
          "name": "Roberto",
          "lastName": "Oliveira",
          "email": "roberto@email.com",
          "contact": "+5511987654321",
          "password": "roberto_password",
          "address": {
              "street": "avenida",
              "number": "100A",
              "district": "Bairro",
              "zipcode": "45687-899",
              "city": "cidade",
              "state": "estado",
              "country": "pais"
          }
      });
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});

describe('6 - Test endpoint PUT /user/transaction', () => {
  describe('6.1 - if success', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload);
      sinon
      .stub(user.model, 'findByIdAndUpdate')
      .resolves({
        _id: '6260bca97c58e5a0b7847cfa',
        name: 'Roberto',
        lastName: 'Oliveira',
        email: 'roberto@email.com',
        contact: '+5511987654321',
        password: '$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6',
        balance: 100,
        transactions: [{
          type: "deposit",
          receiver: {
            name: "Roberto",
            lastName: "Oliveira",
            email: "roberto@email.com",
            contact: "+5511987654321",
          },
          transmitter: {
            name: 'Maria',
            lastName: 'Pereira',
            email: 'maria@email.com',
            contact: '+5511937659321',
          },
          amount: 50
        }
        ],
        address: {
          street: 'avenida',
          number: '100A',
          district: 'Bairro',
          zipcode: '45687-899',
          city: 'cidade',
          state: 'estado',
          country: 'pais'
        }
      });
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 200 and the user updated with the transaction', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .put('/user/transaction')
         .set('authorization', token)
         .send({
          "type": "deposit",
          "receiver": {
            "name": "Roberto",
            "lastName": "Oliveira",
            "email": "roberto@email.com",
            "contact": "+5511987654321",
          },
          "transmitter": {
            "name": "Roberto",
            "lastName": "Oliveira",
            "email": "roberto@email.com",
            "contact": "+5511987654321",
          },
          "amount": 100
        });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        "_id": "6260bca97c58e5a0b7847cfa",
        "name": "Roberto",
        "lastName": "Oliveira",
        "email": "roberto@email.com",
        "contact": "+5511987654321",
        "password": "$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6",
        "balance": 100,
        "transactions": [{
          "type": "deposit",
          "receiver": {
            "name": "Roberto",
            "lastName": "Oliveira",
            "email": "roberto@email.com",
            "contact": "+5511987654321",
          },
          "transmitter": {
            "name": 'Maria',
            "lastName": 'Pereira',
            "email": 'maria@email.com',
            "contact": '+5511937659321',
          },
          "amount": 50
        }],
        "address": {
            "street": "avenida",
            "number": "100A",
            "district": "Bairro",
            "zipcode": "45687-899",
            "city": "cidade",
            "state": "estado",
            "country": "pais"
        }
      });
    });
  });
  describe('6.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(user.model, 'findOne')
      .resolves(payload);
      sinon
      .stub(user.model, 'findByIdAndUpdate')
      .rejects({ message: 'Internal Server Error'});
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .put('/user/transaction')
         .set('authorization', token)
         .send({
          "type": "deposit",
          "receiver": {
            "name": "Roberto",
            "lastName": "Oliveira",
            "email": "roberto@email.com",
            "contact": "+5511987654321",
          },
          "transmitter": {
            "name": "Roberto",
            "lastName": "Oliveira",
            "email": "roberto@email.com",
            "contact": "+5511987654321",
          },
          "amount": 100
        });
        
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Erro: Internal Server Error"});
    });
  });
});