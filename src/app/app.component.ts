import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonRouterOutlet, IonHeader, IonText, IonAvatar, IonItem, IonIcon, IonLabel, IonAccordion, IonAccordionGroup, IonFooter, IonButton, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonImg,  IonButton, IonFooter, IonAccordionGroup, IonAccordion, IonLabel, IonIcon, IonItem, IonAvatar, IonText, IonHeader, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonRouterOutlet, RouterLink, RouterLinkActive, CommonModule, ],
})
export class AppComponent {
  appRoutes = [
    { title: 'Transactions', url: '/folder/ikan', icon: 'file-tray-full-outline'},
    { title: 'Budgets', url: '/folder/bakar', icon: 'calculator-outline' },
    { title: 'Savings', url: '/folder/kucing', icon: 'trending-up-outline' },
  ];

  userData = localStorage.getItem('userData')
  fname:any
  lname:any

  display: any;
  allowedPaths = ['/login', '/register'];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.display = !this.allowedPaths.includes(event.urlAfterRedirects);
      });
      this.loadUserData()
  }

  logout() {
    this.auth.logout()
  }

  loadUserData(){
    const userData = localStorage.getItem('userData')
    if (userData) {
      const userDetails = JSON.parse(userData);
      this.fname = userDetails.first_name;
      this.lname = userDetails.last_name;
    } else {
      this.fname = '';
      this.lname = '';
    }
  }
}
