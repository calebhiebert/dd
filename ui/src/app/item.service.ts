import { Injectable } from '@angular/core';
import { Chance } from 'chance';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient, private login: LoginService) {}

  public createItem(item: IItem): Promise<IItem> {
    return this.http
      .post<IItem>(`${environment.apiURL}/items`, {
        ...item,
        userId: this.login.id,
        id: undefined
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
    tags?: string[],
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<IItemQueryResult> {
    let tagString = '';

    if (tags) {
      tagString = `&tags=${tags.join(',')}`;
    }

    let searchString = '';

    if (search) {
      searchString = `&search=${search}`;
    }

    return this.http
      .get<IItemQueryResult>(
        `${
          environment.apiURL
        }/items?campaignId=${campaignId}${tagString}${searchString}&limit=${limit}&offset=${offset}`
      )
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
  cost: number;
  weight: number;
  imageId?: string;
  userId: string;
  rarity: number;
  playerVisible: boolean;
  tags?: string[];
}

export interface IItemQueryResult {
  items: IItem[];
  total: number;
}
