import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { IItem } from './item.service';
import { IArticle } from './article.service';
import { ISpell } from './spell.service';
import { IMap } from './map.service';
import { IQuest } from './quest.service';
import { IUser } from './user.service';
import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private campaignService: CampaignService,
    private http: HttpClient
  ) {}

  public search(search: string): Promise<ISearchResult[]> {
    return this.http
      .get<ISearchResult[]>(
        `${environment.apiURL}/search?campaignId=${
          this.campaignService.campaign.id
        }&search=${encodeURIComponent(search)}`
      )
      .toPromise();
  }
}

export interface ISearchResult {
  type: SearchObjectType;
  entity?: IEntity;
  spell?: ISpell;
  item?: IItem;
  article?: IArticle;
  map?: IMapMini;
  quest?: IQuest;
  user?: IUser;
}

export interface IMapMini {
  id: string;
  name: string;
}

export enum SearchObjectType {
  ENTITY,
  SPELL,
  ITEM,
  ARTICLE,
  MAP,
  QUEST,
  USER,
}
