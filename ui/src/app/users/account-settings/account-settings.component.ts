import { Component, OnInit } from '@angular/core';
import { UserService, IUser } from 'src/app/user.service';
import { LoginService } from 'src/app/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dd-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  public loading = false;
  public saving = false;
  public user: IUser;
  public formGroup: FormGroup;

  public editUsername = false;

  constructor(private userService: UserService, private login: LoginService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
    });

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.user = await this.userService.getUser(this.login.user.id);
      this.patchForm();
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private patchForm() {
    this.formGroup.patchValue(this.user);
  }

  public async save() {
    if (this.formGroup.invalid) {
      return;
    }

    this.user.username = this.username.value;

    this.saving = true;

    try {
      await this.userService.updateUser(this.user);
    } catch (err) {
      throw err;
    }

    this.editUsername = false;
    this.formGroup.markAsPristine();
    this.saving = false;
  }

  public get username() {
    return this.formGroup.get('username');
  }

  public get dirty() {
    return this.formGroup.dirty;
  }
}
