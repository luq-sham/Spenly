import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service';
import { ValidationServices } from 'src/app/services/validation-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loading = false;
  showPassword = false
  validations: any

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private validationService: ValidationServices,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.validations = this.validationService.AuthValidations('login')
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  async login() {
    if (this.form.invalid) return;
    this.loading = true;

    this.auth.login(this.form.getRawValue())
  }

  goToForgotPassword() {

  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword
  }

}
