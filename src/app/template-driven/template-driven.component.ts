import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent {
  // Declare formSubmitted as a boolean
  formSubmitted: boolean = false;
  user: any = {
    username: '',
    email: '',
    password: ''
  };

  // Show alerts when a field is invalid
  usernameAlert: boolean = false;
  emailAlert: boolean = false;
  passwordAlert: boolean = false;

  onSubmit() {
    this.formSubmitted = true; // Mark form as submitted
    console.log('Form Submitted!', this.user); // Log form data to the console
    // Check if any field has errors and show custom popup alert
    if (this.user.username === '' || this.user.email === '' || this.user.password === '') {
      this.showAlert();
    }
  }

  // Show popup alert for errors
  showAlert() {
    if (this.user.username === '') {
      this.usernameAlert = true;
    } else {
      this.usernameAlert = false;
    }
    if (this.user.email === '') {
      this.emailAlert = true;
    } else {
      this.emailAlert = false;
    }
    if (this.user.password === '') {
      this.passwordAlert = true;
    } else {
      this.passwordAlert = false;
    }
  }
}
