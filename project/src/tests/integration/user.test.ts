import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import UserModel from '../../models/UserModel';
import server from '../../server';
const user = new UserModel();

chai.use(chaiHttp);

const { expect } = chai;

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