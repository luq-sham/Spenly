import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddAccountModalComponent } from 'src/app/components/add-account-modal/add-account-modal.component';
import { AlertService } from 'src/app/services/alert-service';
import { ApiService } from 'src/app/services/api-service';
import { CacheService } from 'src/app/services/cache-service';
import { LoadingService } from 'src/app/services/loading-service';
import { Chart, registerables } from 'chart.js';
import { AddTransactionsModalComponent } from 'src/app/components/add-transactions-modal/add-transactions-modal.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  @ViewChild('chartCanvas') chartCanvas: any;
  chart: any;
  transactions: any[] = [
    {
      transaction_type: 'Expense',
      transaction_desc: 'Groceries at Tesco',
      transaction_note: 'Groceries at Tesco',
      transaction_amount: 120.50,
      transaction_account: 'Cash Wallet',
      transaction_date: '2025-11-05',
      icon: 'cart-outline',
    },
    {
      transaction_type: 'Income',
      transaction_desc: 'Salary for November',
      transaction_note: 'Groceries at Tesco',
      transaction_amount: 4500.00,
      transaction_account: 'Bank Account',
      transaction_date: '2025-11-01',
      icon: 'cash-outline',
    },
    {
      transaction_type: 'Expense',
      transaction_desc: 'Electricity Bill',
      transaction_note: 'Groceries at Tesco',
      transaction_amount: 180.25,
      transaction_account: 'Credit Card',
      transaction_date: '2025-11-03',
      icon: 'flash-outline',
    },
    {
      transaction_type: 'Expense',
      transaction_desc: 'Netflix Subscription',
      transaction_amount: 45.90,
      transaction_account: 'Bank Account',
      transaction_date: '2025-10-30',
      icon: 'film-outline',
    },
    {
      transaction_type: 'Income',
      transaction_desc: 'Freelance Web Project',
      transaction_amount: 750.00,
      transaction_account: 'PayPal',
      transaction_date: '2025-10-28',
      icon: 'laptop-outline',
    },
  ];
  accountData: any[] = []
  userData: any

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private cache: CacheService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getAccounts()
    this.userData = this.cache.getUserData().userData
  }

  ngAfterViewInit() {
    if (this.transactions.length > 0) {
      this.initChart();
    }
  }

  initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Jan', 'Jan', 'Jan'],
        datasets: [
          {
            data: [20, 23, 24],
          }
        ]
      },
      options: {
        animation: {
          animateRotate: true,
          animateScale: false
        },

        animations: {
          radius: { duration: 0 },
          x: { duration: 0 },
          y: { duration: 0 },
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  async addAccount() {
    const modal = await this.modalCtrl.create({
      component: AddAccountModalComponent,
      componentProps: {
      },
      cssClass: 'addAccModal',
      backdropDismiss: false
    })

    await modal.present()
    const { data } = await modal.onDidDismiss()
    if (data) {
      this.getAccounts()
    }
  }

  async getAccounts() {
    await this.loadingService.present()
    this.apiService.getAccounts({ 'user_id': this.userData.uid }).subscribe({
      next: async (res) => {
        this.accountData = res.accounts
        await this.loadingService.dismiss()
      }
    })
  }

  async openAccount() {

  }

  showMore(type: any) {
    if (type == 2) {
      this.navCtrl.navigateForward('/transactions')
    }

    if (type == 3) {
      this.navCtrl.navigateForward('/budgets')
    }
  }

  async onAddTransaction() {
    const modal = await this.modalCtrl.create({
      component: AddTransactionsModalComponent,
      cssClass: 'addTransModal',
    });

    await modal.present()
    const { data } = await modal.onDidDismiss()
    if (data) {
      this.getAccounts()
    }
  }

}
