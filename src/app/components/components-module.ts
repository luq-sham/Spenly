import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { AddAccountModalComponent } from './add-account-modal/add-account-modal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertInterfaceComponent } from './alert-interface/alert-interface.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { TransactionsListComponent } from '../pages/transactions/transactions-list/transactions-list.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { AddTransactionsModalComponent } from './add-transactions-modal/add-transactions-modal.component';
import { BudgetsListComponent } from '../pages/budgets/budgets-list/budgets-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AddAccountModalComponent,
    AlertInterfaceComponent,
    ErrorMessageComponent,
    TransactionsListComponent,
    FabButtonComponent,
    AddTransactionsModalComponent,
    BudgetsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    HeaderComponent,
    AddAccountModalComponent,
    AlertInterfaceComponent,
    ErrorMessageComponent,
    TransactionsListComponent,
    FabButtonComponent,
    AddTransactionsModalComponent,
    BudgetsListComponent
  ]
})
export class ComponentsModule { }
