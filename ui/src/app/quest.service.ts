import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICampaign } from './campaign.service';
import { environment } from 'src/environments/environment';
import { IArticle } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  constructor(private http: HttpClient) {}

  public getQuests(
    campaignId: string,
    search?: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<IQuest[]> {
    let searchQuery = '';

    if (search !== null && search !== undefined) {
      searchQuery = `&search=${encodeURIComponent(
        search.trim().toLowerCase()
      )}`;
    }

    return this.http
      .get<IQuest[]>(
        `${
          environment.apiURL
        }/quests?campaignId=${campaignId}${searchQuery}&limit=${limit}&offset=${offset}`
      )
      .toPromise();
  }

  public getQuest(id: string): Promise<IQuest> {
    return this.http
      .get<IQuest>(`${environment.apiURL}/quests/${id}`)
      .toPromise();
  }

  public createQuest(quest: IQuest): Promise<IQuest> {
    return this.http
      .post<IQuest>(`${environment.apiURL}/quests`, { ...quest, id: undefined })
      .toPromise();
  }

  public updateQuest(quest: IQuest): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/quests/${quest.id}`, quest)
      .toPromise();
  }
}

export interface IQuest {
  id?: string;
  name: string;
  description: string;
  accepted: boolean;
  available: boolean;
  visible: boolean;
  status: QuestStatus;
  acceptedAt?: Date;
  originId?: string;
  origin?: IArticle;
  campaignId: string;
  campaign?: ICampaign;
  createdAt?: Date;
}

export enum QuestStatus {
  NONE,
  ON_HOLD,
  IN_PROGRESS,
  TO_DO,
}
