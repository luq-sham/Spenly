import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateMessageService {

  constructor() { }

  formValidation(type:any){
    let validations:any

    switch(type){
      case 'register': {
        return validations = {
          firstName:[
            {label: 'First Name', error: 'required', message: 'First name is required.'},
            {label: 'First Name', error: 'maxlength', message: 'First name cannot exceed 50 characters.'},
            {label: 'First Name', error: 'pattern', message: 'First name can only contain letters, spaces, apostrophes, and hyphens.'},
          ],
          lastName:[
            {label: 'Last Name', error: 'required', message: 'Last name is required.'},
            {label: 'Last Name', error: 'pattern', message: 'Last name can only contain letters, spaces, apostrophes, and hyphens.'},
          ],
          email:[
            {label: 'Email', error: 'required', message: 'Email address is required.'},
            {label: 'Email', error: 'email', message: 'Please enter a valid email address.'},
            {label: 'Email', error: 'pattern', message: 'Please enter a valid email address format.'},
          ],
          phone:[
            {label: 'Phone', error: 'required', message: 'Phone number is required.'},
            {label: 'Phone', error: 'pattern', message: 'Please enter a valid phone number (e.g., +01234567890).'},
          ],
          password:[
            {label: 'Password', error: 'required', message: 'Password is required.'},
            {label: 'Password', error: 'minlength', message: 'Password must be at least 8 characters.'},
            {label: 'Password', error: 'maxlength', message: 'Password cannot exceed 100 characters.'},
            {label: 'Password', error: 'pattern', message: 'Password must contain number, and special character.'},
          ],
          confirmPassword:[
            {label: 'Confirm Password', error: 'required', message: 'Please confirm your password.'},
            {label: 'Confirm Password', error: 'minlength', message: 'Confirmation password must be at least 8 characters.'},
            {label: 'Confirm Password', error: 'maxlength', message: 'Confirmation password cannot exceed 100 characters.'},
            {label: 'Confirm Password', error: 'notMatching', message: 'Passwords do not match.'},
          ],
          termsAccepted:[
            {label: 'Terms', error: 'required', message: 'You must accept the terms and conditions.'},
            {label: 'Terms', error: 'requiredTrue', message: 'You must accept the terms and conditions.'},
          ]
        }
      }

      case 'login': {
        return validations = {
          email:[
            {label: 'Email Name', error: 'required', message: 'Email name is required.'},
            {label: 'Email Name', error: 'email', message: 'Please enter a valid email address.'},
          ],
          password:[
            {label: 'Password', error: 'required', message: 'Password is required.'},
            {label: 'Password', error: 'minlength', message: 'Password must be at least 6 characters.'},
          ],
        }
      }
    }

    return 'invalid input'
  }
}
