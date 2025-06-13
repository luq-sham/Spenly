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
  IonText,
  IonSkeletonText,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { FormComponent } from '../forms/form/form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonSkeletonText,
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
  accounts: any = [];
  accountLoading = true;
  transactionLoading = true;

  transactions:any = [];

  budgets = [
    { budget_name: 'Groceries', amount: 200, used: 10, updated_at: new Date() },
    { budget_name: 'Food', amount: 100, used: 80, updated_at: new Date() },
    { budget_name: 'Social', amount: 50, used: 45, updated_at: new Date() },
  ];

  userID = localStorage.getItem('id');

  constructor(private modals: ModalController, private api: ApiService) {}

  ngOnInit() {
    this.getAccountsData();
    this.getTransactionData();
  }

  getAccountsData() {
    let param = {
      userID: this.userID,
    };
    this.api.getAccountsByUser(param).subscribe((res) => {
      if (res.status_code == 200) {
        this.accountLoading = false;
        this.accounts = res.return_data;
      }
    });
  }

  getTransactionData(){
    let param = {
      userID: this.userID
    }

    this.api.getTransactionByUser(param).subscribe(res=>{
      if(res.status_code == 200){
        this.transactionLoading = false
        this.transactions = res.return_data
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
      component: FormComponent,
      componentProps: {
        title: 'New Account',
        formID: 1,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      window.location.reload();
    }
  }

  async editAccountModal(account: any) {
    const modal = await this.modals.create({
      component: FormComponent,
      componentProps: {
        title: 'Edit Account',
        formID: 1,
        isEdit: true,
        dataEdit: account,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      window.location.reload();
    }
  }

  async addTransactionModal(){
    const modal = await this.modals.create({
      component: FormComponent,
      componentProps: {
        title: 'New Transaction',
        formID: 2,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.ngOnInit();
    }
  }
}
