import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-update-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-agent.component.html',
  styleUrl: './update-agent.component.css'
})
export class UpdateAgentComponent implements OnInit {

  constructor(private readonly agentsService: UserService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  agentId: any;
  profileInfo: any = {};
  errorMessage: string = '';

  ngOnInit(): void {
    this.getAgentById();
  }

  async getAgentById() {
    this.agentId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.agentId || !token) {
      this.showError("Agent ID or Token is required");
      return;
    }

    try {
      let agentDataResponse = await this.agentsService.getUsersById(this.agentId, token);
      const { fname, lname, identityType, cin, date, address, email, tel, numImmatriculation, numPatente } = agentDataResponse.agent;
      this.profileInfo = { fname, lname, identityType, cin, date, address, email, tel, numImmatriculation, numPatente };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateProfile() {
    const confirmUpdate = confirm("Are you sure you want to update this profile?");
    if (!confirmUpdate) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await this.agentsService.updateUser(this.agentId, this.profileInfo, token);
      console.log(res);

      if (res.statusCode === 200) {
        this.router.navigate(['/agents']);
      } else {
        this.showError(res.message);
      }

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
