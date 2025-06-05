import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  IonLabel, IonAccordion, IonAccordionGroup, IonFooter, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonButton, IonFooter, IonAccordionGroup, IonAccordion, 
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
}
