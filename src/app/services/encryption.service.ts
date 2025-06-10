import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = 'Spendly@pass';

  constructor() { }

  encrypt(value: string): string {
    const secretKey = 'myExpenses';
    const hashedKey = CryptoJS.enc.Hex.parse(
      CryptoJS.SHA256(secretKey).toString()
    );

    const encrypted = CryptoJS.AES.encrypt(value, hashedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
