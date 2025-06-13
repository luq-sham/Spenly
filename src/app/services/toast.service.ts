import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastController,
  ) { }

  async customToast(message: string, duration: number = 2000, color: string = 'primary', css?:string) {
    const toast = await this.toast.create({
      message,
      duration,
      color,
      position: 'bottom',
      cssClass: css
    });
    await toast.present();
  }
}
