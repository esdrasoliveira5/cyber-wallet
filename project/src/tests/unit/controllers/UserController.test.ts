import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import UserController from '../../../controllers/UserController';

const { expect } = chai;
const user = new UserController();
const request = {} as Request;
const response = {} as Response;

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
    zipcode: '01001000',
    city: 'cidade',
    state: 'estado',
    country: 'pais'
  }
}

describe('1 - Test UserController', () => {
  describe('1.1 - method create', () => {
    before(async () => {
      request.body = {
        name: 'Roberto',
        lastName: 'Oliveira',
        email: 'roberto@email.com',
        contact: '+5511987654321',
        password: 'roberto_password',
        address: {
          street: 'avenida',
          number: '100A',
          district: 'Bairro',
          zipcode: '01001000',
          city: 'cidade',
          state: 'estado',
          country: 'pais'
        }
      }
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'create')
        .resolves({ status: 201, response: payload });
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('return the status 201 and the user created', async () => {
      await user.create(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith(payload)).to.be.equal(true);
    });
  });
  describe('1.2 - method login', () => {
    before(async () => {
      request.body = {
        email: 'roberto@email.com',
        password: 'roberto_password',
      }
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'login')
        .resolves({ status: 200, 
          response: { user: payload, token: 'bearer token'},
        });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 200 and the user with a token', async () => {
      await user.login(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ user: payload, token: 'bearer token'})).to.be.equal(true);
    });
  });
  describe('1.3 - method readOne', () => {
    before(async () => {
      request.params = { id: '6260bca97c58e5a0b7847cfa'};
      request.headers = { authorization: 'bearer token'}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'readOne')
        .resolves({ status: 200, 
          response: payload,
        });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 200 and the user', async () => {
      await user.readOne(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith(payload)).to.be.equal(true);
    });
  });
  describe('1.4 - method read', () => {
    before(async () => {
      request.headers = { authorization: 'bearer token'}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'read')
        .resolves({ status: 200, response: [payload] });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 200 and the users', async () => {
      await user.read(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith([payload])).to.be.equal(true);
    });
  });
  describe('1.5 - method update', () => {
    before(async () => {
      request.headers = { authorization: 'bearer token'};
      request.params = { id: '6260bca97c58e5a0b7847cfa'};
      request.body = {
        name: 'Roberto',
        lastName: 'Oliveira',
        email: 'roberto@email.com',
        contact: '+5511987654321',
        password: 'roberto_password',
        address: {
          street: 'avenida',
          number: '100A',
          district: 'Bairro',
          zipcode: '01001000',
          city: 'cidade',
          state: 'estado',
          country: 'pais'
        }
      };

      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'update')
        .resolves({ status: 200, response: payload });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 200 and the user updated', async () => {
      await user.update(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith(payload)).to.be.equal(true);
    });
  });
  describe('1.6 - method transaction', () => {
    before(async () => {
      request.headers = { authorization: 'bearer token'};
      request.body = {
        type: "transfer",
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
      };
  
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'transaction')
        .resolves({ status: 200, response: payload });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 200 and the user updated', async () => {
      await user.transaction(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith(payload)).to.be.equal(true);
    });
  });
  describe('1.7 - method delete', () => {
    before(async () => {
      request.headers = { authorization: 'bearer token'};
      request.params = { id: '6260bca97c58e5a0b7847cfa'};

      response.status = sinon.stub().returns(response)
      response.json = sinon.stub()
      
      sinon
        .stub(user.service, 'delete')
        .resolves({ status: 204, response: [] });
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the status 204', async () => {
      await user.delete(request, response);
      
      expect((response.status as sinon.SinonStub).calledWith(204)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith([])).to.be.equal(true);
    });
  });
});
