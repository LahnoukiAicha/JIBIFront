import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
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
    role:'CLIENT',
    mustChangePassword:false,
    initialBalance:200

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

      const response = await this.userService.createClient(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['/agent/clients']);
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
