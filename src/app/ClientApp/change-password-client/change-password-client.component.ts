import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-change-password-client',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './change-password-client.component.html',
  styleUrl: './change-password-client.component.css'
})
export class ChangePasswordClientComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
      private readonly userService: UserService,
      private router: Router
  ) {}

  async handleSubmit() {
    if (!this.newPassword || !this.confirmPassword) {
      this.showError("Both fields are required");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showError("Passwords do not match");
      return;
    }

    try {
      const response = await this.userService.changePasswordClient(this.newPassword);
      if (response.statusCode === 200) {
        this.showSuccess("Password changed successfully");
        this.router.navigate(['/client/home']);
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

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

}
