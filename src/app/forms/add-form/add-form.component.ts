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
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  imports: [
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
export class AddFormComponent implements OnInit {
  title: any;
  formID: any;

  accountForm!: FormGroup;
  validations: any = this.validate.formValidation('accounts');
  isSubmitted: boolean = false;

  types: any = [
    { name: 'Bank', icon: 'business' },
    { name: 'Credit & Debit', icon: 'card-outline' },
    { name: 'Investment', icon: 'trending-up' },
    { name: 'E-Wallet', icon: 'wallet' },
    { name: 'Business', icon: 'stats-chart' },
    { name: 'Cash', icon: 'cash-outline' },
  ];

  currentDate = new Date()

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
  }

  formBuilder() {
    this.accountForm = this.fb.group({
      account_name: ['', [Validators.required]],
      account_type: ['', [Validators.required]],
      initialBalance: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.accountForm.invalid) {
      console.log('Account Form Invalid');
      return;
    }

    const param = {
      ...this.accountForm.value,
      currentBalance: parseFloat(this.accountForm.get('initialBalance')?.value),
      initialBalance: parseFloat(this.accountForm.get('initialBalance')?.value),
      isActive: true,
      icon: this.types.find((t: any) => t.name === this.accountForm.get('account_type')?.value)?.icon || '',
      userID: localStorage.getItem('id'),
      created_at: this.currentDate,
      updated_at: this.currentDate,
    };

    this.loading.customLoading()
    this.api.postAddAccount(param).subscribe((res) => {
      if (res.status_code == 200) {
        this.loading.dismiss()
        this.toast.customToast(res.msg, 2000, 'success');
        this.modals.dismiss(true)
      } else {
        this.loading.dismiss()
        this.toast.customToast(res.msg, 2000, 'warning');
      }
    });
    console.log(param);
  }

  onDismiss() {
    this.modals.dismiss();
  }
}
