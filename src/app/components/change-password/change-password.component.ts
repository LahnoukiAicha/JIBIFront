import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
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
      const response = await this.userService.changePassword(this.newPassword);
      if (response.statusCode === 200) {
        this.showSuccess("Password changed successfully");
        this.router.navigate(['/agent']);
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
