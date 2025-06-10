import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loading: LoadingController) {}

  async customLoading(message: string = 'Loading...') {
    const loader = await this.loading.create({
      message,
      spinner: 'crescent',
      duration: 3000,
      translucent: true,
      cssClass: 'custom-loading'
    });
    await loader.present();
    return loader;
  }

  async dismiss() {
    await this.loading.dismiss();
  }
}
