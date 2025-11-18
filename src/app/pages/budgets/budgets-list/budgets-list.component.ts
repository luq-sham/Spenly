import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'],
  standalone: false
})
export class BudgetsListComponent implements OnInit {

  budgets: any[] = [
    {},
    {},
    {},
  ]
  constructor() { }

  ngOnInit() { }

}
