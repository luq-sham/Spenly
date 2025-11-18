import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';
import { MenuController } from '@ionic/angular';
import { CacheService } from './services/cache-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  isMenuEnabled = false;
  menuItems: any[] = [
    { title: 'Dashboard', icon: 'home', route: '/dashboard' },
    { title: 'Transactions', icon: 'list', route: '/transactions' },
    { title: 'Budgets', icon: 'file-tray-full', route: '/budgets' },
  ];
  userData: any

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private cache: CacheService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;

        // ❌ Hide menu on login or register page
        if (url.includes('/login') || url.includes('/register')) {
          this.isMenuEnabled = false;
          this.menuCtrl.enable(false, 'main-menu'); // disable swipe
        } else {
          this.userData = this.cache.getUserData().userData
          this.isMenuEnabled = true;
          this.menuCtrl.enable(true, 'main-menu'); // enable swipe
        }
      });
  }


  onLogout() {
    this.menuCtrl.close()
    this.authService.logout()
  }

  onSelectItems() {
    return this.menuCtrl.close()
  }
}
