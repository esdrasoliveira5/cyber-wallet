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
  describe('2.2 - method readOne search by email', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findOne')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('returns a user in the db', async () => {
      const response = await user.readOne({
        email: 'roberto@email.com',
      });
      expect(response).to.be.deep.equal(payload);
    });
  });
  describe('2.3 - method readOne search by _id', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findOne')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('returns a user in the db', async () => {
      const response = await user.readOne({
        _id: '6260bca97c58e5a0b7847cfa',
      });
      expect(response).to.be.deep.equal(payload);
    });
  });
  describe('2.4 - method read', () => {
    before(async () => {
      sinon
        .stub(user.model, 'find')
        .resolves([payload]);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('returns a user in the db', async () => {
      const response = await user.read();
      expect(response).to.be.deep.equal([payload]);
    });
  });
  describe('2.5 - method update', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findByIdAndUpdate')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('return the user updated in the db', async () => {
      const response = await user.update('6260bca97c58e5a0b7847cfa', {
        name: 'Roberto',
        lastName: 'Oliveira',
        email: 'roberto@email.com',
        contact: '+5511987654321',
        password: '$2b$10$JOmGDGptDGC1.eLa3OMj0uAk4FxZT2SjLH0lbP3Uh9W7iDHGN3Lp6',
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
  describe('2.6 - method reciveTransaction', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findByIdAndUpdate')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('return the user updated in the db', async () => {
      const response = await user.reciveTransaction('6260bca97c58e5a0b7847cfa', {
        type: "deposit",
        receiver: {
          name: "Roberto",
          lastName: "Oliveira",
          email: "roberto@email.com",
          contact: "+5511987654321",
        },
        transmitter: {
          name: "Roberto",
          lastName: "Oliveira",
          email: "roberto@email.com",
          contact: "+5511987654321",
        },
        amount: 100
      })
      expect(response).to.be.deep.equal(payload);
    });
  });
  describe('2.7 - method sendTransaction', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findByIdAndUpdate')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('return the user updated in the db', async () => {
      const response = await user.sendTransaction('6260bca97c58e5a0b7847cfa', {
        type: "deposit",
        receiver: {
          name: "Roberto",
          lastName: "Oliveira",
          email: "roberto@email.com",
          contact: "+5511987654321",
        },
        transmitter: {
          name: "Roberto",
          lastName: "Oliveira",
          email: "roberto@email.com",
          contact: "+5511987654321",
        },
        amount: 100
      })
      expect(response).to.be.deep.equal(payload);
    });
  });
  describe('2.8 - method delete', () => {
    before(async () => {
      sinon
        .stub(user.model, 'findByIdAndDelete')
        .resolves(payload);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('return the user updated in the db', async () => {
      const response = await user.delete('6260bca97c58e5a0b7847cfa')
      expect(response).to.be.deep.equal(payload);
    });
  });
});