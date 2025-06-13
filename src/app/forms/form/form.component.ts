import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonIcon,
  IonItem,
  IonInput,
  IonFooter,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTextarea,
  IonDatetime,
  IonPopover,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidateMessageService } from 'src/app/services/validate-message.service';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    IonPopover,

    IonDatetime,
    IonTextarea,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonNote,
    IonButton,
    IonFooter,
    IonInput,
    IonItem,
    IonIcon,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class FormComponent implements OnInit {
  title: any;
  formID: any;
  isEdit: any;
  dataEdit: any;
  showDatePicker: any;

  accountForm!: FormGroup;
  transactionForm!: FormGroup;

  accountValidations: any = this.validate.formValidation('accounts');
  transactionValidations: any = this.validate.formValidation('transactions');

  isSubmitted: boolean = false;

  types: any = [
    { name: 'Bank', icon: 'business' },
    { name: 'Credit & Debit', icon: 'card-outline' },
    { name: 'Investment', icon: 'trending-up' },
    { name: 'E-Wallet', icon: 'wallet' },
    { name: 'Business', icon: 'stats-chart' },
    { name: 'Cash', icon: 'cash-outline' },
  ];
  accounts: any;
  expense: any;
  income: any;
  categories: any;
  typeLabel: any;

  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private validate: ValidateMessageService,
    private modals: ModalController,
    private api: ApiService,
    private toast: ToastService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.formBuilder();
    this.getData();
  }

  getData() {
    const param = {
      userID: localStorage.getItem('id'),
    };
    if (this.formID == 2) {
      //get categories
      this.api.getCategories().subscribe((res) => {
        if (res.status_code == 200) {
          this.income = res.income;
          this.expense = res.expense;
          this.categories = res.expense;
          this.typeLabel = 'Expense';
        }
      });

      //get accounts
      this.api.getAccountsByUser(param).subscribe((res) => {
        if (res.status_code == 200) {
          this.accounts = res.return_data;
        }
      });
    }
  }

  formBuilder() {
    switch (this.formID) {
      //Add Accounts
      case 1:
        if (this.isEdit) {
          this.accountForm = this.fb.group({
            account_id: [this.dataEdit?.id],
            account_name: [this.dataEdit?.account_name, [Validators.required]],
            account_type: [this.dataEdit?.account_type, [Validators.required]],
            currentBalance: [
              this.dataEdit?.currentBalance,
              [Validators.required],
            ],
          });
        } else {
          this.accountForm = this.fb.group({
            account_name: ['', [Validators.required]],
            account_type: ['', [Validators.required]],
            initialBalance: ['', [Validators.required]],
          });
        }
        break;

      //Add transactions
      case 2:
        if (this.isEdit) {
          this.transactionForm = this.fb.group({});
        } else {
          this.transactionForm = this.fb.group({
            amount: ['', [Validators.required]],
            date: [
              this.currentDate.toISOString().slice(0, 10),
              [Validators.required],
            ],
            type: ['expense'],
            description: [''],
            accountID: ['', [Validators.required]],
            categoryID: ['', [Validators.required]],
          });
        }
        break;
      default:
        return;
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    switch (this.formID) {
      //Account
      case 1:
        if (this.accountForm.invalid) {
          console.log('Account Form Invalid');
          return;
        }

        if (this.isEdit) {
          const param = {
            ...this.accountForm.value,
            userID: localStorage.getItem('id'),
            currentBalance: parseFloat(
              this.accountForm.get('currentBalance')?.value
            ),
            updated_at: this.currentDate,
          };

          this.loading.customLoading();
          this.api.postEditAccount(param).subscribe((res) => {
            if (res.status_code == 200) {
              this.loading.dismiss();
              this.toast.customToast(res.msg, 2000, 'success');
              this.modals.dismiss(true);
            } else {
              this.loading.dismiss();
              this.toast.customToast(res.msg, 2000, 'warning');
            }
          });
          console.log(param);
        } else {
          const param = {
            ...this.accountForm.value,
            currentBalance: parseFloat(
              this.accountForm.get('initialBalance')?.value
            ),
            initialBalance: parseFloat(
              this.accountForm.get('initialBalance')?.value
            ),
            isActive: true,
            icon:
              this.types.find(
                (t: any) =>
                  t.name === this.accountForm.get('account_type')?.value
              )?.icon || '',
            userID: localStorage.getItem('id'),
            created_at: this.currentDate,
            updated_at: this.currentDate,
          };

          this.loading.customLoading();
          this.api.postAddAccount(param).subscribe((res) => {
            if (res.status_code == 200) {
              this.loading.dismiss();
              this.toast.customToast(res.msg, 2000, 'success');
              this.modals.dismiss(true);
            } else {
              this.loading.dismiss();
              this.toast.customToast(res.msg, 2000, 'warning');
            }
          });
          console.log(param);
        }

        break;

      //transactions
      case 2:
        if (this.transactionForm.invalid) {
          console.log('Transaction Form Invalid');
          return;
        }

        if (this.isEdit) {
        } else {
          const param = {
            ...this.transactionForm.value,
            userID: localStorage.getItem('id'),
            created_at: this.currentDate,
            updated_at: this.currentDate,
          };

          this.loading.customLoading();
          this.api.postAddTransactions(param).subscribe((res) => {
            if (res.status_code == 200) {
              this.loading.dismiss();
              this.toast.customToast(
                'Transaction successfully created',
                2000,
                'success',
              );
              this.modals.dismiss(true);
            } else {
              this.loading.dismiss();
              this.toast.customToast(
                '<ion-icon name="calendar-outline" slot="start"></ion-icon>Something was error. Please try again',
                2000,
                'warning'
              );
            }
          });

          console.log(param);
        }

        break;

      default:
        return;
    }
  }

  onDismiss() {
    this.modals.dismiss();
  }

  setCategory(event: any) {
    if (event.detail.value == 'expense') {
      this.typeLabel = 'Expense';
      this.categories = this.expense;
    } else {
      this.typeLabel = 'Income';
      this.categories = this.income;
    }
  }
}
