import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';

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
    private api: ApiService
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);

      if (!user) {
        localStorage.clear();
      }
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user.getIdToken().then((token) => {
          let param = {
            email: email
          }
          this.api.postLogin(param).subscribe(res=>{
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(res.return_data));
            localStorage.setItem('id', res.return_data.id);
            this.router.navigate(['/dashboard']);
          })
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

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async getIdToken() {
    const user = await this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }
}
