import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'dd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private login: LoginService) {}

  ngOnInit() {
    console.log(this.login.user);
  }

  public get user() {
    return this.login.user;
  }
}
