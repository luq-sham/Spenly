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
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton, IonList, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonItem, IonList, 
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
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
  ];

  transactions = [
    {
      date: new Date(),
      description: 'Groceries',
      amount: -50,
      type: 'expense',
      icon: 'cart',
      account:'Cash'
    },
    {
      date: new Date(),
      description: 'Salary',
      amount: 2000,
      type: 'income',
      icon: 'cart',
      account:'Cash'
    },
    {
      date: new Date(),
      description: 'Utility',
      amount: -100,
      type: 'expense',
      icon: 'cart',
      account:'Cash'
    },
    {
      date: new Date(),
      description: 'Investment',
      amount: 500,
      type: 'income',
      icon: 'cart',
      account:'Cash'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
