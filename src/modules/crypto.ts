import CryptoJS, { enc } from "crypto-js";

export const aesDecrypt = (
  encrypted: string,
  saltString: string,
  ivString: string
) => {
  const salt = CryptoJS.enc.Hex.parse(saltString);
  const iv = CryptoJS.enc.Hex.parse(ivString);
  const key = passphraseToKey(salt);

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });
  try {
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const aesEncrypt = (plaintext: string) => {
  const salt = generateRandomBytes(256);
  const iv = generateRandomBytes(16);
  const key = passphraseToKey(salt);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });

  return {
    ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    salt: CryptoJS.enc.Hex.stringify(salt),
    iv: CryptoJS.enc.Hex.stringify(iv),
  };
};

const generateRandomBytes = (bytesNumber: number) => {
  return CryptoJS.lib.WordArray.random(bytesNumber);
};

const passphraseToKey = (salt: CryptoJS.lib.WordArray) => {
  const privateKeyBase64 = process.env.REACT_APP_DEMO_PRIVATE_KEY_BASE64 || "";

  const passphrase = enc.Base64.parse(privateKeyBase64);

  return CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 1000,
  });
};
