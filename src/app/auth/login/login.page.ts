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
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

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
    private validate: ValidateMessageService,
    private auth: AuthService,
    private toast: ToastService,
    private loading: LoadingService
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
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      console.log('Login Form:', this.loginForm.value);

      this.loading.customLoading();
      this.auth
        .login(email, password)
        .then((userCredential) => {
          this.loading.dismiss();
          console.log('Logged in:', userCredential.user);
          this.router.navigate(['/dashboard']); // or your desired route
          this.toast.customToast('User Successfully Login', 2000, 'success');
        })
        .catch((error) => {
          this.loading.dismiss();
          console.error('Login failed:', error.message);
          this.toast.customToast(
            'Authentication failed. Please check your credentials and try again.',
            2000,
            'warning'
          );
        });
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
