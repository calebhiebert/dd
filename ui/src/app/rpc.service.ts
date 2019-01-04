import { Injectable } from '@angular/core';
import { dd } from 'src/dd.pb';
import { createDD } from 'src/dd.twirp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RpcService {
  public dd: dd.DD;

  constructor() {
    this.dd = createDD(environment.rpcURL);
  }
}
