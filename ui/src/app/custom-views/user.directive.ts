import { Directive, Input, HostBinding } from '@angular/core';
import { IUser } from '../user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[ddUser]',
})
export class UserDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('ddUser')
  public user: IUser;

  constructor(private sanitize: DomSanitizer) {}

  @HostBinding('innerHTML')
  public get html() {
    if (this.user) {
      return this.sanitize.bypassSecurityTrustHtml(`<div class="columns col-gapless">
      <div class="column col-auto mr-1 d-flex align-items-center">
        <figure class="avatar avatar-xs">
          <img src="${this.user.pictureURL}" alt="avatar" />
        </figure>
      </div>
      <div class="column col-auto">${this.user.username}</div>
    </div>`);
    } else {
      return '';
    }
  }
}
