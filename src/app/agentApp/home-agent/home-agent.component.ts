import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home-agent',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './home-agent.component.html',
  styleUrl: './home-agent.component.css'
})
export class HomeAgentComponent implements OnInit {

  constructor(private readonly userService: UserService,
  ){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;


  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }


  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

}
