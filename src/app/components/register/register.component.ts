import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData: any = {
    fname: '',
    lname: '',
    cin: '',
    date: '',
    address: '',
    email: '',
    confirmEmail: '',
    tel: '',
    numImmatriculation: '',
    numPatente: '',
    password:'',
    role:'AGENT',
    mustChangePassword:false

  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  async handleSubmit() {
    // Validate email confirmation
    if (this.formData.email !== this.formData.confirmEmail) {
      this.showError('Emails do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.register(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['/admin/agents']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
