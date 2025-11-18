import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private readonly secretKey = CryptoJS.enc.Utf8.parse('spenly-1234567890-key-01');

  encrypt(value: any): string {
    const data = typeof value === 'object' ? JSON.stringify(value) : value.toString();
    const encrypted = CryptoJS.AES.encrypt(data, this.secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 192 / 32
    }).toString();
    return encrypted;
  }

  decrypt(encryptedValue: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, this.secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 192 / 32
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
