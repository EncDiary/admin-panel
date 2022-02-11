import { AES, algo, enc, lib, PBKDF2, SHA512 } from "crypto-js";
import { JSEncrypt } from "jsencrypt";

export const aesDecrypt = (
  encrypted: string,
  key: lib.WordArray,
  ivString: string
) => {
  const iv = enc.Hex.parse(ivString);
  const decrypted = AES.decrypt(encrypted, key, { iv });
  try {
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const aesEncrypt = (plaintext: string, key: lib.WordArray) => {
  const iv = generateRandomBytes(128 / 8);
  const encrypted = AES.encrypt(plaintext, key, { iv });
  return {
    ciphertext: enc.Base64.stringify(encrypted.ciphertext),
    iv: enc.Hex.stringify(iv),
  };
};

const generateRandomBytes = (bytesNumber: number) => {
  return lib.WordArray.random(bytesNumber);
};

export const passphraseToKey = (salt: lib.WordArray) => {
  const privateKeyBase64 = process.env.REACT_APP_DEMO_PRIVATE_KEY_BASE64 || "";
  const passphrase = enc.Base64.parse(privateKeyBase64);

  return PBKDF2(passphrase, salt, {
    hasher: algo.SHA512,
    keySize: 256 / 32,
    iterations: 10000,
  });
};

export const createSignature = (jse: JSEncrypt, message: string) => {
  return (
    jse.sign(message, (text: string) => SHA512(text).toString(), "sha512") || ""
  );
};
