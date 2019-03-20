import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
