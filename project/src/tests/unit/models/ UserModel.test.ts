import * as sinon from 'sinon';
import chai from 'chai';
import UserModel from '../../../models/UserModel';

const user = new UserModel();
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


describe('2 - Test UserModel', () => {
  describe('2.1 - method create', () => {
    before(async () => {
      sinon
        .stub(user.model, 'create')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('return the user created in the db', async () => {
      const response = await user.create({
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
      })
      expect(response).to.be.deep.equal(payload);
    });
  });
});