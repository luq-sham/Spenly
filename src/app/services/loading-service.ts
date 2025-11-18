import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading?: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) { }

  async present(message: string = 'Please wait...') {
    if (this.loading) await this.dismiss();

    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
      cssClass: 'custom-loading'
    });

    await this.loading.present();
  }

  async dismiss() {
    if (this.loading) {
      try {
        await this.loading.dismiss();
      } catch { }
      this.loading = undefined;
    }
  }
}
