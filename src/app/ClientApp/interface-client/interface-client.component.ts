import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-interface-client',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './interface-client.component.html',
  styleUrl: './interface-client.component.css'
})
export class InterfaceClientComponent implements OnInit{

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
