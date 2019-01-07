import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

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
    private router: Router
  ) {}

  ngOnInit() {
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
          pictureURl: this.login.authData.picture,
        });

        this.login.setUserData(newUser);

        this.router.navigate(['home']);
      } catch (err) {
        console.log('REGISTER ERR', err);
        this.router.navigate(['home']);
      }

      this.loading = false;
    }
  }
}
