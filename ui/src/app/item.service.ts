import { Injectable } from '@angular/core';
import { Chance } from 'chance';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  public createItem(item: IItem): Promise<IItem> {
    return this.http
      .post<IItem>(`${environment.apiURL}/items`, item)
      .toPromise();
  }

  public async updateItem(item: IItem): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/items/${item.id}`, item)
      .toPromise();
  }

  public async getItems(campaignId: string): Promise<IItem[]> {
    return this.http
      .get<IItem[]>(`${environment.apiURL}/items?campaignId=${campaignId}`)
      .toPromise();
  }

  public async getItem(id: string): Promise<IItem> {
    return this.http
      .get<IItem>(`${environment.apiURL}/items/${id}`)
      .toPromise();
  }
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  campaignId: string;
  imageId?: string;
  rarity: number;
  tags?: string[];
}
