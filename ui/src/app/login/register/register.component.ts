import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RpcService } from 'src/app/rpc.service';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public loading = false;
  public usernameControl: FormControl;

  constructor(
    private rpc: RpcService,
    private login: LoginService,
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
        const user = await this.rpc.dd.createUser({
          token: this.login.loadToken(),
          username: this.usernameControl.value.trim(),
        });

        this.login.setUserData(user);
        this.login.registrationRequired = false;
        this.router.navigate(['home']);
      } catch (err) {
        console.log('REGISTER ERR', err);
        this.router.navigate(['home']);
      }

      this.loading = false;
    }
  }
}
