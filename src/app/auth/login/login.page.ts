import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonRow,
  IonGrid,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonFooter,
  IonInput,
  IonButton,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ValidateMessageService } from 'src/app/services/validate-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonFooter,
    IonIcon,
    IonItem,
    IonCardContent,
    IonCard,
    IonCol,
    IonGrid,
    IonRow,
    IonContent,
    IonTitle,
    IonInput,
    IonCheckbox,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isSubmitted: boolean = false;

  validations: any = this.validate.formValidation('login');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validate: ValidateMessageService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('Login Form', this.loginForm.value);
    } else {
      console.log('Login Form Invalid');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {}

  goToSignup() {
    this.router.navigate(['/register']);
  }
}
