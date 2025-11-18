import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) { }

  async success(header: string = 'Success', message: string = '', buttons: any = ['OK']) {
    await this.showAlert(header, message, '', buttons);
  }

  async warning(header: string = 'Warning', message: string = '', buttons: any = ['OK']) {
    await this.showAlert(header, message, '', buttons);
  }

  async danger(header: string = 'Error', message: string = '', buttons: any = ['OK']) {
    await this.showAlert(header, message, '', buttons);
  }

  async apiError(header: string = 'Error', message: string = '', buttons: any = ['OK']) {
    await this.showAlert('Sorry', 'Please try again later', '', buttons);
  }

  async showAlert(header: string, message: string, cssClass?: string, buttons: any = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass,
      backdropDismiss: false,
    });
    await alert.present();
  }
}
