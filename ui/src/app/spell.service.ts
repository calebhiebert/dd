import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpellService {
  constructor(private http: HttpClient) {}

  public getSpell(id: string): Promise<ISpell> {
    return this.http
      .get<ISpell>(`${environment.apiURL}/spells/${id}`)
      .toPromise();
  }

  public getSpells(): Promise<ISpell[]> {
    return this.http.get<ISpell[]>(`${environment.apiURL}/spells`).toPromise();
  }

  public createSpell(spell: ISpell): Promise<ISpell> {
    return this.http
      .post<ISpell>(`${environment.apiURL}/spells`, { ...spell, id: undefined })
      .toPromise();
  }

  public updateSpell(spell: ISpell): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/spells/${spell.id}`, spell)
      .toPromise();
  }
}

export interface ISpell {
  id?: string;
  name: string;
  description: string;
  campaignId: string;
  userId: string;
  user?: IUser;
  tags: string[];
}
