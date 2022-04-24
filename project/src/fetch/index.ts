import fetch from 'node-fetch';

import { CepError, Ceptype } from '../types';

const fetchViaCep = async (cep: string): Promise< Ceptype | CepError> => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const results = await response.json() as Ceptype | CepError;    
    return results;
  } catch (error) {
    return { erro: 'true' };
  }
};

export default fetchViaCep;