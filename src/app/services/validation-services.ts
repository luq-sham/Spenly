import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationServices {

  AuthValidations(type: any) {
    let validations: any

    switch (type) {
      case 'register':
        return validations = {
          name: [
            { label: 'Name', error: 'required', message: 'Please enter your name' },
            { label: 'Name', error: 'minlength', message: 'Name must be at least 2 characters long' },
            { label: 'Name', error: 'maxlength', message: 'Name cannot exceed 50 characters' },
            { label: 'Name', error: 'pattern', message: 'Name can only contain letters and spaces' },
          ],

          phone_number: [
            { label: 'Phone Number', error: 'required', message: 'Please enter your phone number' },
            { label: 'Phone Number', error: 'pattern', message: 'Please enter a valid phone number (e.g., +60123456789)' },
          ],

          email: [
            { label: 'Email', error: 'required', message: 'Please enter your email address' },
            { label: 'Email', error: 'email', message: 'Please enter a valid email address' },
          ],

          password: [
            { label: 'Password', error: 'required', message: 'Please enter your password' },
            { label: 'Password', error: 'minlength', message: 'Password must be at least 8 characters long' },
            { label: 'Password', error: 'maxlength', message: 'Password cannot exceed 32 characters' },
            { label: 'Password', error: 'pattern', message: 'Password must contain uppercase, lowercase, number, and special character' },
          ],
        };

      case 'login':
        return validations = {
          email: [
            { label: 'Email', error: 'required', message: 'Please enter your email address' },
            { label: 'Email', error: 'email', message: 'Please enter a valid email address' },
          ],

          password: [
            { label: 'Password', error: 'required', message: 'Please enter your password' },
          ],
        };
      default: {
        return validations = null; // or any other default value you want to return
      }
    }
  }
}
