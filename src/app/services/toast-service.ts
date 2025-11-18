import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private toastCtrl: ToastController
  ) { }

  async present(msg: string, type: string, duration?: any, position?: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration || 2000,
      position: position || 'bottom',
      color: type, // Use a standard color name or hex string with quotes
    });
    await toast.present();
  }
}
