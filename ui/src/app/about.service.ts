import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  public remoteAbout(): Promise<IAboutInfo> {
    return this.http
      .get<IAboutInfo>(`${environment.apiURL}/aboutinfo`)
      .toPromise();
  }

  public localAbout(): IAboutInfo {
    return {
      gitHash: environment.gitHash,
      gitTag: environment.gitTag,
    };
  }
}

export interface IAboutInfo {
  gitHash: string;
  gitTag: string;
}
