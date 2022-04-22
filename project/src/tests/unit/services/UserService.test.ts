import * as sinon from 'sinon';
import chai from 'chai';

import UserService from '../../../services/UserService';
import { UserInfo } from '../../../types/UserInfoType';

const user = new UserService();
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
    
      it('return a object with status 200 and the user in the db', async () => {
        const response = await user.login({
          email: 'roberto@email.com',
          password: 'roberto_password',
        })
        expect(response).to.be.deep.equal({ status: 201, response: payload });
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
        })
        
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
  });
});
