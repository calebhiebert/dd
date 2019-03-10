import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ActionQueueService } from 'src/app/action-queue.service';

@Component({
  selector: 'dd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public loading = false;
  public usernameControl: FormControl;

  constructor(
    private login: LoginService,
    public userService: UserService,
    private router: Router,
    private action: ActionQueueService
  ) { }

  ngOnInit() {
    if (!this.login.authData) {
      this.router.navigate(['login']);
    }

    this.usernameControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]);
  }

  public async submit() {
    if (this.usernameControl.valid) {
      this.loading = true;
      try {
        const newUser = await this.userService.createUser({
          id: this.login.id,
          username: this.usernameControl.value,
          pictureURL: this.login.authData.picture,
        });

        this.login.setUserData(newUser);
        this.login.resetLoginStatus();

        this.action.queue.pop();
        this.action.save();

        this.router.navigate(['home']);
      } catch (err) {
        throw err;
      }

      this.loading = false;
    }
  }
}
