import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) { }

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  async handleSubmit() {
    if (!this.email || !this.password) {
      this.showError("Email and Password are required");
      return;
    }

    try {
      const response = await this.userService.login(this.email, this.password);
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'AGENT') {
          if (response.mustChangePassword) {
            console.log('mustChangePassword:', response.mustChangePassword);
            console.log('Navigating to change password');
            this.router.navigate(['/agent/change-password']);
          } else {
            this.router.navigate(['/agent']);
          }
        }
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
