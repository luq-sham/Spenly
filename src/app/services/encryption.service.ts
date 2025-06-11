import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(value: string): string {
    const secretKey = 'Spendly@pass';
    const hashedKey = CryptoJS.enc.Hex.parse(
      CryptoJS.SHA256(secretKey).toString()
    );

    const encrypted = CryptoJS.AES.encrypt(value, hashedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  decrypt(value: string): string {
    const secretKey = 'Spendly@pass';
    const hashedKey = CryptoJS.enc.Hex.parse(
      CryptoJS.SHA256(secretKey).toString()
    );

    const decrypt = CryptoJS.AES.decrypt(value, hashedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  }
}
