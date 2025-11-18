import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  standalone: false
})
export class TransactionsListComponent implements OnInit {

  @Input() transactions: any[] = []
  constructor() { }

  ngOnInit() { }

}
