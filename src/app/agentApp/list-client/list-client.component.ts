import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule],
})
export class ListClientComponent implements OnInit {
  clients: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly userService: UserService,
  ) { }


  ngOnInit(): void {
    this.loadClients();
  }
  async loadClients() {
    try {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        console.log("before calling get agents")
        const response = await this.userService.getAllClients(token);
        if (response && response.statusCode === 200 && response.listUsers) {
          console.log("after calling get agents")
          this.clients = response.listUsers;

        } else {
          console.log("error 404")
          this.showError('No users found.');
        }
      } else {
        this.showError('Token is missing. Please log in again.');
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
