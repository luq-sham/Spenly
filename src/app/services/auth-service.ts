import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { NavController } from '@ionic/angular';
import { EncryptionService } from './encryption-service';
import { ToastService } from './toast-service';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private encryption: EncryptionService,
    private toastService: ToastService,
    private loading: LoadingService
  ) { }

  async logout() {
    await this.loading.present()
    // this.apiService.().subscribe({})
    const valueID = localStorage.getItem('ValueID');
    const localData = valueID ? JSON.parse(valueID) : null;

    await this.loading.present()
    this.apiService.logout({ token: localData.localId || '' }).subscribe({
      next: async (res) => {
        // console.log('Registration successful:', res);
        localStorage.clear()
        await this.navCtrl.navigateRoot('/login');
        await this.loading.dismiss()
        await this.toastService.present('The user successfully logout!', 'success')
      },
      error: async (err) => {
        console.error('Registration failed:', err);

        await this.loading.dismiss()

        let errorMessage = 'Registration failed. Please try again.';
        if (err.error && err.error.detail) {
          errorMessage = err.error.detail[0].msg;
        }

        await this.toastService.present(errorMessage, 'warning', 2000)
      }
    })
  }

  async register(param: any) {
    const encryptPassword = this.encryption.encrypt(param.password)
    const newParam = {
      ...param,
      password: encryptPassword
    }
    console.log(newParam);


    await this.loading.present()
    this.apiService.register(newParam).subscribe({
      next: async (res) => {
        // console.log('Registration successful:', res);

        await this.navCtrl.navigateRoot('/login');
        await this.loading.dismiss()
        await this.toastService.present('The user successfully registered!', 'success')
      },
      error: async (err) => {
        console.error('Registration failed:', err);

        await this.loading.dismiss()

        let errorMessage = 'Registration failed. Please try again.';
        if (err.error && err.error.detail) {
          errorMessage = err.error.detail.msg;
        }

        await this.toastService.present(errorMessage, 'warning', 2000)
      }
    });
  }

  async login(param: any) {
    const encryptPassword = this.encryption.encrypt(param.password)
    const newParam = {
      ...param,
      password: encryptPassword
    }
    console.log(newParam);

    await this.loading.present()
    this.apiService.login(newParam).subscribe({
      next: async (res) => {
        // console.log('Registration successful:', res);

        localStorage.setItem('ValueID', JSON.stringify({
          idToken: res.idToken,
          refreshToken: res.refreshToken,
          localId: res.localId,
          userData: res.userData
        }));

        this.navCtrl.navigateRoot('/dashboard');
        this.loading.dismiss()
        this.toastService.present('The user successfully login!', 'success')
      },
      error: async (err) => {
        console.error('Login failed:', err);

        await this.loading.dismiss()

        let errorMessage = 'Login failed. Please try again.';
        if (err.error && err.error.detail) {
          errorMessage = err.error.detail.msg;
        }

        await this.toastService.present(errorMessage, 'warning', 2000)
      }
    });
  }
}
