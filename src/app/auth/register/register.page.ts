import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonImg,
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  IonCheckbox,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ValidateMessageService } from 'src/app/services/validate-message.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonFooter,
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    IonIcon,
    IonItem,
    IonCardContent,
    IonCard,
    IonImg,
    IonContent,
    IonInput,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonCheckbox,
    ErrorMessageComponent,
  ],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isSubmitted: boolean = false;

  validations: any = this.validation.formValidation('register');

  constructor(
    private menu: MenuController,
    private fb: FormBuilder,
    private validation: ValidateMessageService,
    private alert: AlertService,
    private router: Router,
    private auth: AuthService,
    private toast: ToastService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        first_name: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],
        ],
        last_name: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^01[0-46-9]-?\d{7,8}$/)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
        termsAccepted: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ notMatching: true });
      return { notMatching: true };
    }

    return null;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const email: string = this.registerForm.get('email')?.value || '';
      const password: string = this.registerForm.get('password')?.value || '';

      this.loading.customLoading();
      this.auth
        .signup(email, password)
        .then((res) => {
          this.loading.dismiss();
          this.router.navigate(['/login']);
          this.toast.customToast(
            'User Successfully Registered.',
            2000,
            'success'
          );
        })
        .catch((error) => {
          if (error.code == 'auth/email-already-in-use') {
            this.loading.dismiss();
            console.error('Signup failed:', error.message);
            this.toast.customToast(
              'Email already in use. Please use a different email.',
              2000,
              'warning'
            );
          } else {
            this.toast.customToast(error.message, 2000, 'warning');
          }
        });
      console.log('Form submitted:', this.registerForm.value);
    } else if (this.registerForm.get('termsAccepted')?.invalid) {
      this.alert.customAlertOK(
        'Terms & Conditions',
        'Please accept terms and conditions'
      );
    } else {
      console.log('Invalid Register Form');
    }
  }

  togglePasswordVisibility(type: any) {
    if (type == 'password') {
      this.showPassword = !this.showPassword;
    }
    if (type == 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  showTerms() {
    this.alert.customAlertOK(
      'Terms & Conditions',
      'By creating an account, you agree to our Terms of Service and Privacy Policy. We will process your personal information in accordance with these terms.'
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
