import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false
})
export class TransactionsPage implements OnInit {

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
    {
      transaction_type: 'Expense',
      transaction_desc: 'Dinner with friends',
      transaction_amount: 98.40,
      transaction_account: 'Credit Card',
      transaction_date: '2025-11-06',
      icon: 'restaurant-outline',
    },
    {
      transaction_type: 'Expense',
      transaction_desc: 'Fuel Refill',
      transaction_amount: 65.00,
      transaction_account: 'Cash Wallet',
      transaction_date: '2025-11-04',
      icon: 'car-outline',
    },
    {
      transaction_type: 'Income',
      transaction_desc: 'Stock Dividend',
      transaction_amount: 220.75,
      transaction_account: 'Bank Account',
      transaction_date: '2025-10-25',
      icon: 'trending-up-outline',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
