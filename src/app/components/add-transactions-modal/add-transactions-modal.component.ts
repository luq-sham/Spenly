import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, ModalController } from '@ionic/angular';
import { CacheService } from 'src/app/services/cache-service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-transactions-modal',
  templateUrl: './add-transactions-modal.component.html',
  styleUrls: ['./add-transactions-modal.component.scss'],
  standalone: false
})
export class AddTransactionsModalComponent implements OnInit {

  currentDate: any = moment().format('YYYY-MM-DD')

  form: FormGroup = this.fb.group({
    transaction_user: ['', Validators.required],
    transaction_account: ['', Validators.required],
    transaction_category: ['', Validators.required],
    transaction_type: ['expense', Validators.required],
    transaction_note: ['', Validators.required],
    amount: ['', Validators.required],
    date: [this.currentDate, Validators.required],
  })

  userData: any
  transactionCategory: any
  transactionAccount: any


  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.userData = this.cache.getUserData().userData
    console.log(this.currentDate);

  }

  async dismiss(isSubmit?: any) {
    if (!isSubmit) {
      this.modalCtrl.dismiss()
    } else {
      this.onSubmit()
    }
  }

  selectAccountCategory(event: any) {

  }

  onChangeSegment(event: any) {
    this.form.get('transaction_type')?.setValue(event.detail.value)

    console.log(this.form.get('transaction_type')?.value);

  }

  onChangeDate(value: any, popover: IonPopover) {
    this.form.get('date')?.setValue(value);

    popover.dismiss();
  }

  onSubmit() {
    this.form.patchValue({
      transaction_user: this.userData.uid,
    })


  }
}
