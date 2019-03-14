import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { IArticle } from './article.service';
import { IQuest } from './quest.service';
import { IUser } from './user.service';
import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IConcept } from './concept.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private campaignService: CampaignService, private http: HttpClient) {}

  public search(search: string): Promise<ISearchResult[]> {
    return this.http
      .get<ISearchResult[]>(
        `${environment.apiURL}/search?campaignId=${this.campaignService.campaign.id}&search=${encodeURIComponent(search)}`
      )
      .toPromise();
  }
}

export interface ISearchResult {
  type: SearchObjectType;
  entity?: IEntity;
  article?: IArticle;
  map?: IMapMini;
  quest?: IQuest;
  user?: IUser;
  concept?: IConcept;
}

export interface IMapMini {
  id: string;
  name: string;
}

export enum SearchObjectType {
  ENTITY,
  LEGACY_SPELL,
  LEGACY_ITEM,
  ARTICLE,
  MAP,
  QUEST,
  USER,
  CONCEPT,
}
