import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './LoginClient.component.html',
  styleUrls: ['./LoginClient.component.css']
})
export class LoginClientComponent {

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) { }

  tel: string = '';
  password: string = '';
  errorMessage: string = '';

  async handleSubmit() {
    if (!this.tel || !this.password) {
      this.showError("tel and Password are required");
      return;
    }

    try {
      const response = await this.userService.loginClient(this.tel, this.password);
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
          if (response.mustChangePassword) {
            console.log('mustChangePassword:', response.mustChangePassword);
            console.log('Navigating to change password');
            this.router.navigate(['/client/changePasswordClient']);
          } else {
            this.router.navigate(['/client/home']);
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
