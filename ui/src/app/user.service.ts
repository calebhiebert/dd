import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(id: string): Promise<IUser> {
    return this.http
      .get<IUser>(`${environment.apiURL}/users/${id}`)
      .toPromise();
  }

  public createUser(user: IUser): Promise<IUser> {
    return this.http
      .post<IUser>(`${environment.apiURL}/users`, user)
      .toPromise();
  }

  public updateUser(user: IUser): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/users/${user.id}`, user)
      .toPromise();
  }
}

export interface IUser {
  id: string;
  username: string;
  pictureURL: string;
  createdAt?: Date;
}
