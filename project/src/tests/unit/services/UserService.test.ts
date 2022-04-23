import * as sinon from 'sinon';
import chai from 'chai';

import UserService from '../../../services/UserService';
import { UserInfo } from '../../../types/UserInfoType';
import { Login } from '../../../types';

const user = new UserService();
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

describe('3 - Test UserServices', () => {
  describe('3.1 - method create', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null);

        sinon
          .stub(user.model, 'create')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 201 and the User created in the db', async () => {
        const response = await user.create({
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          }
        })
        expect(response).to.be.deep.equal({ status: 201, response: payload });
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload);
        sinon
          .stub(user.model, 'create')
          .resolves(undefined);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 400 and an error message "name is required"', async () => {
        const response = await user.create({
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          },
        } as UserInfo)
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 409 and an error message "Conflict"', async () => {
        const response = await user.create({
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          },
        })
        expect(response).to.be.deep.equal({ status: 409, response: { error: 'Conflict'} });
      });
    });
  });
  describe('3.2 - method login', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 200 and the user in the db with token', async () => {
        const response = await user.login({
          email: 'roberto@email.com',
          password: 'roberto_password',
        })

        expect(response.status).to.be.equal(200);
        expect(response.response).to.have.deep.keys({user: payload, token: 'bearer token'});
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 400 and an error message "password is required"', async () => {
        const response = await user.login({
          email: 'roberto@email.com',
        } as Login)
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 404 and an error message "Not Found"', async () => {
        const response = await user.login({
          email: 'roberto@email.com',
          password: 'roberto_password',
        })
        expect(response).to.be.deep.equal({ status: 404, response: { error: 'Not Found'} });
      });
    });
    describe('c) if password is wrong', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 401 and an error message "Invalid Password"', async () => {
        const response = await user.login({
          email: 'roberto@email.com',
          password: 'roberto_',
        })
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Invalid Password'} });
      });
    });
  });
  describe('3.3 - method readOne', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 200 and the user in the db', async () => {
        const response = await user.readOne(token, '6260bca97c58e5a0b7847cfa')

        expect(response.status).to.be.equal(200);
        expect(response.response).to.be.deep.equal(payload);
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null)
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 401 and an error message "invalid Token"', async () => {
        const response = await user.readOne('123', '1234');
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Invalid Token'} });
      });

      it('return an object with status 401 and an error message "Unauthorized"', async () => {
        const response = await user.readOne(token, '6260bca97c58e5a0b7847cfa');
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Unauthorized'} });
      });
    });
    describe('c) if id is invalid ', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .onFirstCall()
        .resolves(payload)
        .onSecondCall()
        .resolves(null)
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 400 and an error message "_id must have 24 hexadecimal characters"', async () => {
        const response = await user.readOne(token, '1234');
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 404 and an error message "Not Found"', async () => {
        const response = await user.readOne(token, '6260bca97c58e5a0b7847cfa');
        expect(response).to.be.deep.equal({ status: 404, response: { error: 'Not Found'} });
      });
    });
  });
  describe('3.4 - method read', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload)
        sinon
        .stub(user.model, 'read')
        .resolves([payload]);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 200 and the users in the db', async () => {
        const response = await user.read(token)
        expect(response.status).to.be.equal(200);
        expect(response.response).to.be.deep.equal([payload]);
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null)
        sinon
        .stub(user.model, 'read')
        .resolves(undefined);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 401 and an error message "invalid Token"', async () => {
        const response = await user.read('123');
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Invalid Token'} });
      });
      it('return an object with status 401 and an error message "Unauthorized"', async () => {
        const response = await user.read(token);
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Unauthorized'} });
      });
    });
  });
  describe('3.5 - method update', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload)
        sinon
        .stub(user.model, 'update')
        .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 200 and the user updated in the db', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          }
        })
        expect(response.status).to.be.equal(200);
        expect(response.response).to.be.deep.equal(payload);
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null)
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 400 and an error message "name is required"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          lastName: 'Oliveira',
          contact: '+5511987654321',
          email: 'roberto@email.com',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          },
        }as UserInfo)
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 400 and an error message "_id must have 24 hexadecimal characters"', async () => {
        const response = await user.update(token, '123', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 401 and an error message "invalid Token"', async () => {
        const response = await user.update('123', '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Invalid Token'} });
      });
      it('return an object with status 401 and an error message "Unauthorized"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Unauthorized'} });
      });
    });
    describe('c) id not found', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload)
        sinon
        .stub(user.model, 'update')
        .resolves(undefined);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 404 and an error message "Not Found"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 404, response: { error: 'Not Found'} });
      });
    });
  });
  describe('3.5 - method transaction', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
        .stub(user.model, 'readOne')
        .onFirstCall()
        .resolves(payload)
        .onSecondCall()
        .resolves(payload)
        sinon
        .stub(user.model, 'update')
        .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 200 and the user updated in the db', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          }
        })
        expect(response.status).to.be.equal(200);
        expect(response.response).to.be.deep.equal(payload);
      });
    });
    describe('b) if fail', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(null)
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 400 and an error message "name is required"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          lastName: 'Oliveira',
          contact: '+5511987654321',
          email: 'roberto@email.com',
          password: 'roberto_password',
          address: {
            street: 'avenida',
            number: '100A',
            district: 'Bairro',
            zipcode: '45687-899',
            city: 'cidade',
            state: 'estado',
            country: 'pais'
          },
        }as UserInfo)
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 400 and an error message "_id must have 24 hexadecimal characters"', async () => {
        const response = await user.update(token, '123', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response.status).to.be.equal(400);
      });

      it('return an object with status 401 and an error message "invalid Token"', async () => {
        const response = await user.update('123', '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Invalid Token'} });
      });
      it('return an object with status 401 and an error message "Unauthorized"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 401, response: { error: 'Unauthorized'} });
      });
    });
    describe('c) id not found', () => {
      before(() => {
        sinon
        .stub(user.model, 'readOne')
        .resolves(payload)
        sinon
        .stub(user.model, 'update')
        .resolves(undefined);
      });

      after(()=>{
        sinon.restore();
      });

      it('return an object with status 404 and an error message "Not Found"', async () => {
        const response = await user.update(token, '6260bca97c58e5a0b7847cfa', {
          name: 'Roberto',
          lastName: 'Oliveira',
          email: 'roberto@email.com',
          contact: '+5511987654321',
          password: 'roberto_password',
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
        
        expect(response).to.be.deep.equal({ status: 404, response: { error: 'Not Found'} });
      });
    });
  });
});
