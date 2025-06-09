import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  imports: [IonIcon, CommonModule]
})
export class ErrorMessageComponent implements OnInit {
  @Input() message!: string;
  @Input() field?: AbstractControl;
  @Input() error!: string;
  @Input() submitted!: boolean;

  constructor() {}

  ngOnInit() {}

  shouldShowError() {
    if ((this.field?.touched && this.field?.errors?.[this.error]) || (this.submitted && this.field?.errors?.[this.error])) {
      return true;
    }

    return false;
  }
}
