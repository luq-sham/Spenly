import { Injectable, inject  } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  constructor() { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
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
