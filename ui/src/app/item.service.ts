import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private login: LoginService) {}

  public createItem(item: IItem): Promise<IItem> {
    return this.http
      .post<IItem>(`${environment.apiURL}/items`, {
        ...item,
        userId: this.login.id,
        id: undefined,
      })
      .toPromise();
  }

  public async updateItem(item: IItem): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/items/${item.id}`, item)
      .toPromise();
  }

  public async getItems(
    campaignId: string,
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<IItemQueryResult> {
    let searchQuery = '';

    if (search) {
      searchQuery = `&search=${search}`;
    }

    return this.http
      .get<IItemQueryResult>(
        `${
          environment.apiURL
        }/items?campaignId=${campaignId}${searchQuery}&limit=${limit}&offset=${offset}`
      )
      .toPromise();
  }

  public async getItem(id: string): Promise<IItem> {
    return this.http
      .get<IItem>(`${environment.apiURL}/items/${id}`)
      .toPromise();
  }

  public async getTags(campaignId: string): Promise<string[]> {
    return this.http
      .get<string[]>(
        `${environment.apiURL}/items/tags?campaignId=${campaignId}`
      )
      .toPromise();
  }
}

export interface IItem {
  id: string;
  name: string;
  content?: any;
  campaignId: string;
  cost: number;
  weight: number;
  imageId?: string;
  userId?: string;
  rarity: number;
  playerVisible: boolean;
  tags?: string[];
}

export interface IItemQueryResult {
  items: IItem[];
  total: number;
}
