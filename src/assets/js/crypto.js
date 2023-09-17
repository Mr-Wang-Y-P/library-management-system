import CryptoJS from 'crypto-js';

const SECRET_KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const SECRET_IV = CryptoJS.enc.Utf8.parse("1234567890123456");
// 加密
export const encrypt=(word)=> {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, SECRET_KEY, {
        iv: SECRET_IV ,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }


// 解密数据
export const decrypt =(word) =>{
    let base64  = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(srcs, SECRET_KEY, {
      iv: SECRET_IV ,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  }