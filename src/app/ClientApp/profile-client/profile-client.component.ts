import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-client',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css'
})
export class ProfileClientComponent implements OnInit{

  profileInfo: any;
  errorMessage: string = '';

  constructor(private readonly userService: UserService,
              private readonly router: Router) {}

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No Token Found");
      }

      const response = await this.userService.getClientProfile(token);
      this.profileInfo = response.users;
      console.log('Profile Info:', this.profileInfo);

    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}

