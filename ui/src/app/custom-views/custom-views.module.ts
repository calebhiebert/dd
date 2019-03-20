import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDirective } from './user.directive';
import { HttpErrorsComponent } from './http-errors/http-errors.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CurrencyDirective } from './currency.directive';

@NgModule({
  declarations: [UserDirective, HttpErrorsComponent, ErrorPageComponent, CurrencyDirective],
  imports: [CommonModule],
  exports: [UserDirective, HttpErrorsComponent, CurrencyDirective],
})
export class CustomViewsModule {}
