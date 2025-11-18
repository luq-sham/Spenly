import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { ValidationServices } from 'src/app/services/validation-services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  form: FormGroup = this.fb.group({
    name: [
      '', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)],
    ],

    phone_number: [
      '', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)],
    ],

    email: [
      '', [Validators.required, Validators.email],
    ],

    password: [
      '', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),],
    ],
  });

  loading = false;
  showPassword = false;
  validation: any

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationServices,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.validation = this.validationService.AuthValidations('register')
  }

  async register() {
    this.authService.register(this.form.getRawValue())
  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword
  }

}
