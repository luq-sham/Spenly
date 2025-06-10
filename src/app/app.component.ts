import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonRouterOutlet,
  IonHeader,
  IonText,
  IonAvatar,
  IonItem,
  IonIcon,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AlertService } from './services/alert.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonButton,
    IonFooter,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonIcon,
    IonItem,
    IonAvatar,
    IonText,
    IonHeader,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
})
export class AppComponent {
  appRoutes = [
    { title: 'Transactions', url: '/folder/ikan', icon: 'file-tray-full-outline' },
    { title: 'Budgets', url: '/folder/bakar', icon: 'calculator-outline' },
    { title: 'Savings', url: '/folder/kucing', icon: 'trending-up-outline' },
  ];

  display:any;
  allowedPaths = ['/login', '/register']
  constructor(
    private router: Router,
    private alert: AlertService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.display = !this.allowedPaths.includes(event.urlAfterRedirects);
      });
  }

  logout(){
    this.alert.customComfirmationAlert('Logout','Are you sure to logout this session?','Logout','Cancel').then(response=>{
      if(response == 'confirm'){
        this.toast.customToast('User Successful Logout', 2000, 'warning')
        this.router.navigate(['/login'])
      }
    })
  }
}
