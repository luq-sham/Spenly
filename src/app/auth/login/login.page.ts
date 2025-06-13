import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardContent, IonItem, IonIcon, IonFooter, IonInput, IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ValidateMessageService } from 'src/app/services/validate-message.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonFooter, IonIcon, IonItem, IonCardContent, IonCard, IonCol, IonGrid, IonRow, IonContent, IonTitle, IonInput, IonCheckbox, IonToolbar, ErrorMessageComponent, ],
})
export class LoginPage implements OnInit {
  public loginForm!: FormGroup;
  public showPassword = false;
  public isSubmitted = false;
  public validations: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly validate: ValidateMessageService,
    private readonly auth: AuthService,
    private readonly loading: LoadingService,
    private readonly crypt: EncryptionService
  ) {
    this.validations = this.validate.formValidation('login');
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      console.warn('Login Form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email, this.crypt.encrypt(password))
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public forgotPassword(): void {
    // TODO: Implement forgot password logic or navigation
  }

  public goToSignup(): void {
    this.router.navigate(['/register']);
  }
}
