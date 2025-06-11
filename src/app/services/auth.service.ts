import { Injectable, inject, OnDestroy } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly tokenRefreshInterval = 5 * 60 * 1000; // 5 minutes for token refresh
  private readonly inactivityTimeout = 60 * 60 * 1000; // 1 hour in milliseconds (fixed from 5 seconds)
  private auth = inject(Auth);
  private timeoutId: any;
  private tokenRefreshId: any;
  private activityListenersBound = false;

  constructor(
    private router: Router,
    private toast: ToastService,
    private api: ApiService,
    private alert: AlertService,
    private loading: LoadingService
  ) {
    if (window.innerWidth > 768) {
      // Only initialize session management on desktop (not phone/tablet)
      this.initializeSessionManagement();
    }
  }

  private initializeSessionManagement() {
    if (this.hasToken()) {
      this.setupActivityListeners();
      this.startTokenRefresh();
      this.resetInactivityTimer();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private setupActivityListeners() {
    if (this.activityListenersBound) return;

    // Use arrow functions to maintain proper 'this' context
    const resetTimer = () => this.resetInactivityTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    this.activityListenersBound = true;
  }

  private removeActivityListeners() {
    if (!this.activityListenersBound) return;

    const resetTimer = () => this.resetInactivityTimer();

    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keypress', resetTimer);
    window.removeEventListener('scroll', resetTimer);
    window.removeEventListener('click', resetTimer);
    window.removeEventListener('touchstart', resetTimer);

    this.activityListenersBound = false;
  }

  private resetInactivityTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.handleInactiveTimeout();
    }, this.inactivityTimeout);
  }

  private async handleInactiveTimeout() {
    const response = await this.alert.customComfirmationAlert(
      'Session Timeout',
      'Your session is about to expire. Would you like to stay logged in?',
      'Stay Logged In',
      'Logout'
    );

    if (response === 'confirm') {
      this.resetInactivityTimer();
    } else {
      await this.performLogout();
    }
  }

  private startTokenRefresh() {
    this.stopTokenRefresh(); // Clear any existing interval
    this.tokenRefreshId = setInterval(async () => {
      if (this.auth.currentUser) {
        try {
          const token = await this.auth.currentUser.getIdToken(true);
          localStorage.setItem('token', JSON.stringify({ token }));
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }
    }, this.tokenRefreshInterval);
  }

  private stopTokenRefresh() {
    if (this.tokenRefreshId) {
      clearInterval(this.tokenRefreshId);
      this.tokenRefreshId = null;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      const param = { email };
      this.api.postLogin(param).subscribe({
        next: (res) => {
          localStorage.setItem('token', JSON.stringify({ token }));
          localStorage.setItem('userData', JSON.stringify(res.return_data));
          this.initializeSessionManagement();
          this.router.navigate(['/dashboard']);
          this.toast.customToast(
            'User successfully logged in',
            2000,
            'success'
          );
        },
        error: (err) => {
          this.handleLoginError(err);
        },
      });
    } catch (error: any) {
      this.handleLoginError(error);
    }
  }

  async signup(email: string, password: string, param: any): Promise<void> {
    this.loading.customLoading();

    try {
      await this.api.postRegister(param).toPromise();
      await createUserWithEmailAndPassword(this.auth, email, password);

      this.loading.dismiss();
      this.toast.customToast('User Successfully Registered.', 2000, 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.loading.dismiss();
      this.handleSignupError(error);
    }
  }

  async logout(): Promise<void> {
    const response = await this.alert.customComfirmationAlert(
      'Logout',
      'Are you sure to logout this session?',
      'Logout',
      'Cancel'
    );

    if (response === 'confirm') {
      await this.performLogout();
    }
  }

  private handleLoginError(error: any): void {
    const message =
      error.code === 'auth/invalid-credential'
        ? 'Login failed: Invalid credentials. Please try again.'
        : `Login failed: ${error.message}`;

    this.toast.customToast(message, 3000, 'warning');
    throw error;
  }

  private handleSignupError(error: any): void {
    const message =
      error.code === 'auth/email-already-in-use'
        ? 'Email already in use. Please use a different email.'
        : error.message || 'Registration failed.';

    this.toast.customToast(message, 2000, 'warning');
    console.error('Signup failed:', error);
  }

  private cleanupSession(): void {
    localStorage.clear();
    clearTimeout(this.timeoutId);
    this.stopTokenRefresh();
    this.removeActivityListeners();
  }

  async getIdToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  private async performLogout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.cleanupSession();
      this.toast.customToast('User Successfully Logged Out', 2000, 'warning');
      window.location.href = '/login';
    } catch (error) {
      this.toast.customToast(
        'Logout failed: ' + (error as Error).message,
        3000,
        'warning'
      );
    }
  }

  ngOnDestroy(): void {
    this.cleanupSession();
  }
}
