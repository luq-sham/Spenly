import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private toast: ToastService,
    private api: ApiService,
    private alert: AlertService,
    private loading: LoadingService
  ) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user.getIdToken().then((token) => {
          let param = {
            email: email,
          };
          this.api.postLogin(param).subscribe((res) => {
            localStorage.setItem('token', JSON.stringify({ token }));
            localStorage.setItem('userData', JSON.stringify(res.return_data));
            this.router.navigate(['/dashboard']);
          });
        });
      })
      .catch((error) => {
        if (error.code == 'auth/invalid-credential') {
          this.toast.customToast('Login failed: Invalid credencial. Please try again.',3000,'warning');
        } else {
          this.toast.customToast('Login failed: ' + error.message,3000,'warning');
          throw error; // Rethrow if needed
        }
      });
  }

  signup(email: string, password: string, param:any) {
    try {
      this.loading.customLoading();
      this.api.postRegister(param).subscribe({
        next: () => {
          this.loading.dismiss();
          this.toast.customToast('User Successfully Registered.',2000,'success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading.dismiss();
          this.toast.customToast('Server error during registration.',2000,'danger');
          console.error('API registration failed:', err);
        },
      });
    } catch (error: any) {
      this.loading.dismiss();

      if (error.code === 'auth/email-already-in-use') {
        this.toast.customToast('Email already in use. Please use a different email.',2000,'warning');
      } else {
        this.toast.customToast(error.message || 'Registration failed.',2000,'warning');
      }
      console.error('Signup failed:', error);
    }
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.alert.customComfirmationAlert('Logout', 'Are you sure to logout this session?', 'Logout', 'Cancel').then(async (response) => {
      if (response === 'confirm') {
        try {
          await signOut(this.auth);
          localStorage.clear();
          this.toast.customToast('User Successfully Logged Out', 2000, 'warning');
          this.router.navigate(['/login']);
        } catch (error) {
          this.toast.customToast('Logout failed: ' + (error as Error).message, 3000, 'warning');
        }
      }
    });
  }

  async getIdToken() {
    const user = await this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }
}
