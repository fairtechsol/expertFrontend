import CryptoJS from "crypto-js";
import forge from "node-forge";

// Your RSA public and private keys
const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLmH1O1jB7eXt+dxndkX2JiElk
Q7exjVwsiM16HVOLNJ9IzaUcy+MGtLTsZndrG8D2MqxxjieblvUZ1+kM3jZ+wuh0
AGG6OUYiZifS4bDUAtMkavi+72fi6y+1MCsQjFHGXD869M97cX5RZQo79PAmYgP8
b5qUjnAO9xEQJlXmiwIDAQAB
-----END PUBLIC KEY-----`;

const rsaPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgG7EQxi3C5zeptp2KKWDghoO45Q13u28kD+r/LiBZ4HGo9josDZv
pmxPBfUkkDWTO4L7Vo+eIxsKTtR1RaL479MOYpWlqiCAneaqAZ+wVvKhwVy7AbY3
5pV7mFm1Cm8WgS2LVg4UVBtAGW6mJG1WVHVHcBevxm98zIxmZZyVjUlHAgMBAAEC
gYA3GoXylqU9Tfqdtah05p5jjkKjKcWUaXktY8celqnCguph7ygyfIrDWPCyypS/
QlaZy6V9XwNB4Xfj889HyyWrJLHBBjcrC7LApjbYk1IBzWGLmAz71q0WkvWTJGN8
lownMqI2duVxys4aAh/rFIqCoPIhH7OVaNdimYG/z0mVAQJBAMZcAdfI38PupRLA
X0q8+3Lbqgo1kGd9O5VV1CTJ4bxVUp1nd6k+iFOBk6XpsnQesdeM88zY3/W0x7ls
4iEu58cCQQCO9Dax6tKM6hS5fGML7zbUKgrXPIrrbFE4+tr6bioySPTz53cKayXb
gAiqpIzh/k2bFU5qFl/q3sxbFnorbZKBAkANLA7zRWOWn0JW/G9XhzUra2rfQq9U
L/zE7e4ogz96QjA6Q6SumHh1EyW63sn67A7jQXjvIXe92UNqDND3YyYBAkALYcJh
FBNDiPexdQfl0VwKNHa8gGOHLw6gfMimm9LcQhbOvKUrvTA8c8s82vEkpTzElkOy
CqoEZ0zaC8YaYxUBAkEAwwMvzRcop7F2PqFLm4333VgNuJb1knkTXXyYvhqkV/oS
mr1wBa6Z303d7P9Ziv3FzcY07h1FXuH7Fex3LgKv2A==
-----END RSA PRIVATE KEY-----`;

// AES Encryption
export function encryptWithAES(data: any, aesKey: any) {
  try {
    const key = CryptoJS.enc.Utf8.parse(aesKey.padEnd(32, "0").slice(0, 32)); // Ensure 32-byte key
    const iv = CryptoJS.enc.Utf8.parse(aesKey.slice(0, 16)); // Use part of the AES key as IV (16 bytes)
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
    });
    console.log(JSON.stringify(data));
    return encrypted.toString(); // Base64 encoded string
  } catch (error) {
    console.error("AES Encryption Error:", error);
  }
}

// AES Decryption
export function decryptWithAES(encryptedData: any, aesKeyBinary: any) {
  try {
    const aesKey = CryptoJS.enc.Latin1.parse(aesKeyBinary); // Convert binary AES key
    const iv = aesKeyBinary.slice(0, 16); // Use the first 16 bytes of the AES key as IV

    const decrypted = CryptoJS.AES.decrypt(encryptedData, aesKey, {
      iv: CryptoJS.enc.Latin1.parse(iv),
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)); // Decrypted JSON data
  } catch (error) {
    console.error("AES Decryption Error:", error);
  }
}

// RSA Encryption (using node-forge)
export function encryptAESKeyWithRSA(aesKey: any) {
  try {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encryptedAESKey = publicKey.encrypt(aesKey, "RSA-OAEP");
    return forge.util.encode64(encryptedAESKey); // Return as base64-encoded string
  } catch (error) {
    console.error("RSA Encryption Error:", error);
  }
}

// RSA Decryption (using node-forge)
export function decryptAESKeyWithRSA(encryptedAESKey: any) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(rsaPrivateKey);
    const decryptedAESKey = privateKey.decrypt(
      forge.util.decode64(encryptedAESKey),
      "RSA-OAEP"
    );
    return decryptedAESKey;
  } catch (error) {
    console.error("RSA Decryption Error:", error);
  }
}

// Generate random bytes (Web Crypto API)
export function generateRandomBytes(length: any) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}
