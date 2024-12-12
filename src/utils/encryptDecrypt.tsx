import CryptoJS from "crypto-js";
import forge from "node-forge";
import { Constants } from "./Constants";

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
    const publicKey = forge.pki.publicKeyFromPem(
      generateRandomeNumber(Constants.publicNumber)
    );
    const encryptedAESKey = publicKey.encrypt(aesKey, "RSA-OAEP");
    return forge.util.encode64(encryptedAESKey); // Return as base64-encoded string
  } catch (error) {
    console.error("RSA Encryption Error:", error);
  }
}

// RSA Decryption (using node-forge)
export function decryptAESKeyWithRSA(encryptedAESKey: any) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(
      generateRandomeNumber(Constants.privateNumber)
    );
    const decryptedAESKey = privateKey.decrypt(
      forge.util.decode64(encryptedAESKey),
      "RSA-OAEP"
    );
    return decryptedAESKey;
  } catch (error) {
    console.error("RSA Decryption Error:", error);
  }
}

const generateRandomeNumber = (ciphertext: any) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, Constants.randomeNumber);
  const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
  return originalMessage;
};

// Generate random bytes (Web Crypto API)
export function generateRandomBytes(length: number) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(array)
    .map((byte) => chars[byte % chars.length])
    .join("");
}
