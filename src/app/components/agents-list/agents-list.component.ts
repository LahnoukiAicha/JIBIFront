import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavComponent } from "../nav/nav.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-agents-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NavComponent, FormsModule, RouterLinkActive],
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {

  agents: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        console.log("before calling get agents")
        const response = await this.userService.getAllUsers(token);
        if (response && response.statusCode === 200 && response.listUsers) {
          console.log("after calling get agents")
          this.agents = response.listUsers;
          // Initialize editMode property
          this.agents.forEach(agent => agent.editMode = false);
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

  editAgent(agent: any) {
    agent.editMode = true;
  }

  async saveAgent(agent: any) {
    console.log('saveAgent called for:', agent); // Debug log
    const confirmUpdate = confirm('Are you sure you want to update this user?');
    if (confirmUpdate) {
      try {
        const token: string | null = localStorage.getItem('token');
        if (token) {
          console.log('Token:', token); // Debug log
          const res = await this.userService.updateUser(agent.id, agent, token);
          console.log('Update response:', res); // Debug log
          if (res.statusCode === 200) {
            agent.editMode = false;
            await this.loadUsers();
          } else {
            this.showError(res.message);
          }
        } else {
          this.showError('Token is missing. Please log in again.');
        }
      } catch (error: any) {
        this.showError(error.message);
        console.error('Update error:', error); // Debug log
      }
    }
  }

  async deleteUser(userId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const token: string | null = localStorage.getItem('token');
        if (token) {
          await this.userService.deleteUser(userId, token);
          // Refresh the user list after deletion
          await this.loadUsers();
        } else {
          this.showError('Token is missing. Please log in again.');
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
