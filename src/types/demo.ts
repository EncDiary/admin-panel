export interface INote {
  id: string;
  text: string;
  datetime: number;
}

export interface ICipherNote {
  ciphertext: string;
  iv: string;
  salt: string;
}
