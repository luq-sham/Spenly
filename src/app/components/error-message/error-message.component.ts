import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false
})
export class ErrorMessageComponent implements OnInit {
  @Input() message!: string;
  @Input() field!: AbstractControl | any;
  @Input() error!: string;
  @Input() debug: any = false;

  @Input() submitted!: boolean;
  constructor() { }

  ngOnInit() { }

  shouldShowError() {
    // console.log('Field',this.field);
    // console.log('Field',);
    if ((this?.field.touched && this?.field.errors?.[this.error]) || (this.submitted && this?.field.errors?.[this.error])) {
      return true;
    }
    return false;
  }
}
