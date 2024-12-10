import CryptoJS from "crypto-js";
import forge from "node-forge";

// Your RSA public and private keys
const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG1QT06IR/MsxhJQYOG2ksIddsSy
ociTWCkXih2e44Ay3TzCszh525gHjtbRYRCmEFkqlJhXbGllZJ7CM3EdGQXck1+W
zjkQ0d1uDGzeNvBzBdROeSu9Awe4MY0Ns0wqIkY7VqAALnrm5s6Rr0wIGjcOBiGt
QmRv1xu9vaA27hHfAgMBAAE=
-----END PUBLIC KEY-----`;

const rsaPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC52suyH90zc0I3RTfHQUFJesErWHTy8FN+l1gOJHW2Dnm2EpuB
iPHRDzfpahFzM6pexnyWf5PK9r/4IpQgACzuL5Shua/831tFa4YTxeny0piWdUap
HDeTIVEU+IG8HG5dAW9yxqvJuZJgZDjRzXJI7zKrFS5ENsysr5jGrRfpnQIDAQAB
AoGARY16GYkPMQf7Sc/flfP3yNXloKET8y65MHDXBUPjwWQdbGP+SjXDuWcml3WY
XjKBmcJSMchAuP4qzWOzZ15pcX6asXFYJ8YcVW+RE3T8QJXCiNuMEjrVaFcuvJes
SJGMq90ZEx1QghIka6Yw3XlGSR5RL/7oiUgqfwa8onzqVAkCQQDc5mW6zo+9ds6n
V5Is1QCZaYUQA4HsmxfkWf4o/h+fSdeKiNt2UYnVbzoJutMT1CXjX52vSLcBfwHm
b++FRFE7AkEA12LZ8QtKnzVyJ2DOZkCUwyPvSJxrm4BOxDqqm2Yh0wid1DSva97r
9rDWCbKK/PcwYSlZgp3B+ZR8fcJ5PXIDBwJAS5zt24jTOPZO/IcEOSZcAydUbcvV
kEjyX67SSfPanSqohfocrR5yAMYG5se1cscehPr4vcQ1KGTyII/WPBbLewJBAI7i
ENqLNxGvDu94lPPYW9eoexCcU/Zwg9BBavR0KHQq/yjLWqQg2kBox1TfkLyH7xxF
pg+0P/4ltwBmhq9wdvkCQDH5jP39HaU86Czc1XcgJ2i+adeB4NTllchPi3rZiqAw
xHS0venvM/O0x2ikwenbM45+/YgfzvgKvJD1G4UDQ+w=
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
export function generateRandomBytes(length: number) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(array)
    .map((byte) => chars[byte % chars.length])
    .join("");
}

