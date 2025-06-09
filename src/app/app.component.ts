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
    { title: 'Transaction', url: '/folder/ikan', icon: 'file-tray-full-outline' },
    { title: 'Budget', url: '/folder/bakar', icon: 'calculator-outline' },
    { title: 'Saving', url: '/folder/kucing', icon: 'trending-up-outline' },
  ];

  display:any;
  allowedPaths = ['/login', '/register']
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.display = !this.allowedPaths.includes(event.urlAfterRedirects);
      });
  }
}
