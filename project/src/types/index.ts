export type Email = {
  email: string,
};

export type ID = {
  _id: string,
};

export type Login = {
  email: string,
  password: string,
};

export type TokenType = {
  id: string;
  email: string;
};

export type Ceptype = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type CepError = {
  erro: string;
};