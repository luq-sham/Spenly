import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  accountData: any[] = [
    {
      icon: 'card-outline',
      account_name: 'Main Account',
      balance: 1250.75
    },
    {
      icon: 'wallet-outline',
      account_name: 'Savings Account',
      balance: 8200.00
    },
    
  ]

  constructor() { }

  ngOnInit() {
  }

  addAccount() {
  }

}
