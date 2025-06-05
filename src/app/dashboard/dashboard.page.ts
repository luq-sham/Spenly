import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonRow, IonGrid, 
    IonIcon,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class DashboardPage implements OnInit {
  
  accounts = [
    { name: 'Cash', balance: 1000, icon: 'cash-outline' },
    { name: 'Bank', balance: 5000, icon: 'bank-outline' },
    { name: 'Credit Card', balance: -200, icon: 'card-outline' },
    { name: 'Investment', balance: 15000, icon: 'trending-up-outline' },
  ]

  constructor() {}

  ngOnInit() {}
}
