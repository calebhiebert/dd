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

  public getSpellset(entityId: string): Promise<IEntitySpell[]> {
    return this.http
      .get<IEntitySpell[]>(`${environment.apiURL}/spellset/${entityId}`)
      .toPromise();
  }

  // TODO either move this into entity service to align with how inventories are done
  // or move inventory mangement into the item service
  public updateSpellsetItem(spellsetItem: IEntitySpell): Promise<IEntitySpell> {
    return this.http
      .put<IEntitySpell>(`${environment.apiURL}/spellset`, spellsetItem)
      .toPromise();
  }

  public deleteSpellsetItem(entityId: string, spellId: string): Promise<void> {
    return this.http
      .delete<void>(
        `${environment.apiURL}/spellset/${entityId}/spell/${spellId}`
      )
      .toPromise();
  }
}

export interface IEntitySpell {
  entityId: string;
  spellId: string;
  spell?: ISpell;
}

export interface ISpell {
  id?: string;
  name: string;
  content?: any;
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
