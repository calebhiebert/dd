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

  public getSpells(
    campaignId: string,
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<ISpellQueryResult> {
    let searchQuery = '';

    if (search) {
      searchQuery = `&search=${search}`;
    }

    return this.http
      .get<ISpellQueryResult>(
        `${
          environment.apiURL
        }/spells?campaignId=${campaignId}${searchQuery}&limit=${limit}&offset=${offset}`
      )
      .toPromise();
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
  playerVisible: boolean;
  imageId?: string;
  userId: string;
  user?: IUser;
  tags: string[];
}

export interface ISpellQueryResult {
  spells: ISpell[];
  total: number;
}
