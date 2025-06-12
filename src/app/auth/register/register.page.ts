import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonImg, IonCard, IonCardContent, IonItem, IonIcon, IonInput, IonButton, IonCheckbox, IonGrid, IonCol, IonRow, IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ValidateMessageService } from 'src/app/services/validate-message.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, IonTitle, IonToolbar, IonFooter, IonRow, IonCol, IonGrid, IonButton, IonIcon, IonItem, IonCardContent, IonCard, IonImg, IonContent, IonInput, IonCheckbox, ErrorMessageComponent, ],
})
export class RegisterPage implements OnInit {
  public registerForm!: FormGroup;
  public showPassword = false;
  public showConfirmPassword = false;
  public isSubmitted = false;
  public readonly validations: any;

  constructor(
    private readonly menu: MenuController,
    private readonly fb: FormBuilder,
    private readonly validationService: ValidateMessageService,
    private readonly alert: AlertService,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly crypt: EncryptionService
  ) {
    this.validations = this.validationService.formValidation('register');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = this.fb.group(
      {
        first_name: ['',[Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],],
        last_name: ['',[Validators.required, Validators.pattern(/^[a-zA-Z\s'-]+$/)],],
        email: ['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),],],
        phone: ['',[Validators.required, Validators.pattern(/^01[0-46-9]-?\d{7,8}$/)],],
        password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/),],],
        confirmPassword: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100),],],
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
    }

    return null;
  }

  public async onSubmit(): Promise<void> {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      if (this.registerForm.get('termsAccepted')?.invalid) {
        this.alert.customAlertOK('Terms & Conditions','Please accept terms and conditions');
      }
      return;
    }

    const { email, password, ...userInfo } = this.registerForm.value;

    const param = {
      ...userInfo,
      email,
      isActive: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.auth.signup(email, this.crypt.encrypt(password), param);
    this.registerForm.reset()
  }

  public togglePasswordVisibility(type: 'password' | 'confirmPassword'): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  public ionViewWillEnter(): void {
    this.menu.enable(false);
  }

  public showTerms(): void {
    this.alert.customAlertOK(
      'Terms & Conditions',
      'By creating an account, you agree to our Terms of Service and Privacy Policy. We will process your personal information in accordance with these terms.'
    );
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
