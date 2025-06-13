import { Injectable, inject, OnDestroy, ApplicationRef } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly tokenRefreshInterval = 5 * 60 * 1000; // 5 minutes for token refresh
  private readonly inactivityTimeout = 60 * 60 * 1000; // 1 hour in milliseconds
  private readonly sessionExpiryKey = 'sessionExpiry';
  private auth = inject(Auth);
  private timeoutId: any;
  private tokenRefreshId: any;
  private activityListenersBound = false;
  private lastActivityTime: number | null = null;

  constructor(
    private router: Router,
    private toast: ToastService,
    private api: ApiService,
    private alert: AlertService,
    private loading: LoadingService,
    private appRef: ApplicationRef,
    private platform: Platform
  ) {
    this.initializeSessionManagement();
    this.setupAppStateListeners();
  }

  private initializeSessionManagement() {
    if (Capacitor.getPlatform() === 'web') {
      if (this.hasToken()) {
        this.checkSessionExpiry();
        this.setupActivityListeners();
        this.startTokenRefresh();
        this.resetInactivityTimer();
      }
    }
  }

  private setupAppStateListeners() {
    // Listen for app becoming active
    this.platform.resume.subscribe(() => {
      if (this.hasToken()) {
        this.checkSessionExpiry();
      }
    });

    // Save last activity time when app is paused
    this.platform.pause.subscribe(() => {
      if (this.hasToken()) {
        this.lastActivityTime = Date.now();
      }
    });
  }

  private checkSessionExpiry() {
    const expiryTime = localStorage.getItem(this.sessionExpiryKey);
    if (expiryTime) {
      const now = Date.now();
      if (now > parseInt(expiryTime)) {
        this.alert
          .customAlertOK(
            'Session Expired',
            'Your session has expired due to inactivity. Please log in again.'
          )
          .then((res) => {
            if (res == 'confirm') {
              this.performLogout();
            }
          });
      } else {
        // Update expiry time based on last activity
        if (this.lastActivityTime) {
          const newExpiryTime = this.lastActivityTime + this.inactivityTimeout;
          localStorage.setItem(this.sessionExpiryKey, newExpiryTime.toString());
          this.resetInactivityTimer();
        }
      }
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private setupActivityListeners() {
    if (this.activityListenersBound) return;

    const resetTimer = () => {
      this.lastActivityTime = Date.now();
      localStorage.setItem(
        this.sessionExpiryKey,
        (Date.now() + this.inactivityTimeout).toString()
      );
      this.resetInactivityTimer();
    };

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

    // Update session expiry in storage
    localStorage.setItem(
      this.sessionExpiryKey,
      (Date.now() + this.inactivityTimeout).toString()
    );
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
    this.stopTokenRefresh();
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
    this.loading.customLoading();
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
          this.loading.dismiss();
          localStorage.setItem('token', token);
          localStorage.setItem('id', res.return_data.id);
          localStorage.setItem('userData', JSON.stringify(res.return_data));
          // Set initial session expiry
          localStorage.setItem(
            this.sessionExpiryKey,
            (Date.now() + this.inactivityTimeout).toString()
          );

          this.initializeSessionManagement();
          this.router.navigate(['/dashboard']);
          this.toast.customToast(
            'User successfully logged in',
            2000,
            'success'
          );
        },
        error: (err) => {
          this.loading.dismiss();
          this.handleLoginError(err);
        },
      });
    } catch (error: any) {
      this.loading.dismiss();
      this.handleLoginError(error);
    }
  }

  async signup(email: string, password: string, param: any): Promise<void> {
    this.loading.customLoading();

    try {
      await this.api.postRegister(param);
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
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('id');
    localStorage.removeItem(this.sessionExpiryKey);
    clearTimeout(this.timeoutId);
    this.stopTokenRefresh();
    this.removeActivityListeners();
    this.lastActivityTime = null;
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
