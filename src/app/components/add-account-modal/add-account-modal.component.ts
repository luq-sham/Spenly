import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert-service';
import { AlertInterfaceComponent } from '../alert-interface/alert-interface.component';
import { LoadingService } from 'src/app/services/loading-service';
import { ApiService } from 'src/app/services/api-service';
import { CacheService } from 'src/app/services/cache-service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss'],
  standalone: false
})
export class AddAccountModalComponent implements OnInit {

  @Input() title: any = "Add New Account";

  accountTypes = [
    { title: 'Cash', icon: 'cash-outline' },
    { title: 'Bank', icon: 'business-outline' },
    { title: 'Credit Card', icon: 'card-outline' },
    { title: 'Savings', icon: 'wallet-outline' },
    { title: 'Investment', icon: 'trending-up-outline' },
    { title: 'Loan', icon: 'file-tray-stacked-outline' },
    { title: 'E-Wallet', icon: 'phone-portrait-outline' },
    { title: 'Other', icon: 'ellipsis-horizontal-circle-outline' },
  ];

  backButtonSub!: Subscription;
  form!: FormGroup
  userData: any
  selectedType: any

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private cacheService: CacheService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initForm()
    this.userData = this.cacheService.getUserData()
  }

  initForm() {
    this.form = this.fb.group({
      account_name: ['', Validators.required],
      account_type: [null, Validators.required],
      account_balance: [null, Validators.required],
      icon: ['', Validators.required],
    })
  }

  selectAccountType(title: string) {
    const selectedItem = this.accountTypes.find(a => a.title === title);
    this.selectedType = title;
    this.form.get('account_type')?.setValue(title);
    this.form.get('icon')?.setValue(selectedItem?.icon || '');
  }

  async dismiss(isSubmit?: any) {
    if (!isSubmit) {
      this.modalCtrl.dismiss()
    } else {
      this.onSubmit()
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.alertService.warning('Warning', 'Please fill in all required fields.');
    } else {
      await this.loadingService.present()
      this.apiService.postAddAccount({ ...this.form.getRawValue(), 'account_user': this.userData.userData.uid }).subscribe({
        next: async (res) => {
          await this.loadingService.dismiss()
          this.toastService.present('The account has been created successfully.', 'success');
          this.modalCtrl.dismiss(true)
        },
        error: async (err) => {
          if (err.error.detail.status_id == "2") {
            await this.loadingService.dismiss()
            this.toastService.present('Account name has already been registered.', 'warning');
            return
          }
          await this.loadingService.dismiss()
          this.alertService.apiError()
        }
      })
    }

  }

  // ionViewDidEnter() {
  //   // Listen for the hardware back button
  //   this.backButtonSub = this.platform.backButton.subscribeWithPriority(10, () => {
  //     this.dismiss(); // Dismiss the modal when back is pressed
  //   });
  // }

  // ionViewWillLeave() {
  //   // Clean up the subscription
  //   if (this.backButtonSub) {
  //     this.backButtonSub.unsubscribe();
  //   }
  // }

  // ngOnDestroy() {
  //   if (this.backButtonSub) {
  //     this.backButtonSub.unsubscribe();
  //   }
  // }
}
