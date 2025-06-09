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
          ],
          lastName:[
            {label: 'Last Name', error: 'required', message: 'Last name is required.'},
          ],
          email:[
            {label: 'Email Name', error: 'required', message: 'Email name is required.'},
            {label: 'Email Name', error: 'email', message: 'Please enter a valid email address.'},
          ],
          phone:[
            {label: 'Phone', error: 'required', message: 'Phone number is required.'},
            {label: 'Phone', error: 'pattern', message: 'Please enter a valid phone number.eg. 01234567890'},
          ],
          password:[
            {label: 'Password', error: 'required', message: 'Password is required.'},
            {label: 'Password', error: 'minlength', message: 'Password must be at least 6 characters.'},
          ],
          confirmPassword:[
            {label: 'Confirm Password', error: 'required', message: 'Confirm password is required.'},
            {label: 'Confirm Password', error: 'minlength', message: 'Confirm password must be at least 6 characters.'},
            {label: 'Confirm Password', error: 'notMatching', message: 'Passwords do not match.'},
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
