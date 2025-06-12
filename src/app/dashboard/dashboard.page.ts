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
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
  IonProgressBar,
  IonText, IonSkeletonText } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ModalController } from '@ionic/angular/standalone';
import { AddFormComponent } from '../forms/add-form/add-form.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, 
    IonText,
    IonProgressBar,
    IonAvatar,
    IonItem,
    IonList,
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
  accounts:any = [];
  accountLoading = true;

  transactions = [
    {
      date: new Date(),
      description: 'Groceries',
      amount: -50,
      type: 'expense',
      icon: 'cart',
      account: 'Cash',
    },
    {
      date: new Date(),
      description: 'Salary',
      amount: 2000,
      type: 'income',
      icon: 'cart',
      account: 'Cash',
    },
    {
      date: new Date(),
      description: 'Utility',
      amount: -100,
      type: 'expense',
      icon: 'cart',
      account: 'Cash',
    },
    {
      date: new Date(),
      description: 'Investment',
      amount: 500,
      type: 'income',
      icon: 'cart',
      account: 'Cash',
    },
  ];

  budgets = [
    { budget_name: 'Groceries', amount: 200, used: 10, updated_at: new Date() },
    { budget_name: 'Food', amount: 100, used: 80, updated_at: new Date() },
    { budget_name: 'Social', amount: 50, used: 45, updated_at: new Date() },
  ];

  userID = localStorage.getItem('id')

  constructor(private modals: ModalController, private api: ApiService) {}

  ngOnInit() {
    this.getAccountsData()
  }

  getAccountsData(){
    let param ={
      userID: this.userID
    }
    this.api.getAccountsByUser(param).subscribe(res=>{
      if(res.status_code == 200){
        this.accountLoading = false
        this.accounts = res.return_data
      }
    })
  }

  getProgressColor(type: any, budget: any) {
    if (type == 'percent') {
      if (budget < 0.5) {
        return 'success';
      } else if (budget < 0.9) {
        return 'warning';
      }
    }

    return 'danger';
  }

  async addAccountModal() {
    const modal = await this.modals.create({
      component: AddFormComponent,
      componentProps: {
        title: 'New Account',
        formID: 1,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      window.location.reload()
    }
  }
}
