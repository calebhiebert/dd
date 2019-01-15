import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICampaign } from './campaign.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  constructor(private http: HttpClient) {}

  public getQuests(campaignId: string): Promise<IQuest[]> {
    return this.http
      .get<IQuest[]>(`${environment}/quests?campaignId=${campaignId}`)
      .toPromise();
  }

  public getQuest(id: string): Promise<IQuest> {
    return this.http.get<IQuest>(`${environment}/quests/${id}`).toPromise();
  }

  public createQuest(quest: IQuest): Promise<IQuest> {
    return this.http.post<IQuest>(`${environment}/quests`, quest).toPromise();
  }

  public updateQuest(quest: IQuest): Promise<void> {
    return this.http
      .post<void>(`${environment}/quests/${quest.id}`, quest)
      .toPromise();
  }
}

export interface IQuest {
  id?: string;
  name: string;
  description: string;
  visible: boolean;
  active: boolean;
  campaignId: string;
  campaign?: ICampaign;
  createdAt: Date;
}
