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

describe('2 - Test UserServices', () => {
  describe('2.1 - method create', () => {
    describe('a) if success', () => {
      before(async () => {
        sinon
          .stub(user.model, 'create')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return a object with status 201 and the customer created in the db', async () => {
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

      // it('return an object with status 409 and an error message "Conflict"', async () => {
      //   const response = await user.create({
      //     name: 'Roberto',
      //     lastName: 'Oliveira',
      //     email: 'roberto@email.com',
      //     contact: '+5511987654321',
      //     password: 'roberto_password',
      //     address: {
      //       street: 'avenida',
      //       number: '100A',
      //       district: 'Bairro',
      //       zipcode: '45687-899',
      //       city: 'cidade',
      //       state: 'estado',
      //       country: 'pais'
      //     },
      //   })
      //   expect(response).to.be.deep.equal({ status: 409, response: { error: 'Conflict'} });
      // });
    });
  });
});
