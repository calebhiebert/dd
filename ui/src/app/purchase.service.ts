import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConcept } from './concept.service';
import { IEntity, ICurrency } from './entity.service';
import { IArticle } from './article.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  public getPurchases(
    campaignId: string,
    limit = 10,
    offset = 0,
    entityId: string = null,
    articleId: string = null,
    conceptId: string = null
  ): Promise<IPurchaseQueryResult> {
    let entityIdQuery = '';

    if (entityId) {
      entityIdQuery = `&entityId=${entityId}`;
    }

    return this.http
      .get<IPurchaseQueryResult>(`${environment.apiURL}/purchases?limit=${limit}&offset=${offset}&campaignId=${campaignId}${entityIdQuery}`)
      .toPromise();
  }
}

export interface IPurchase {
  id: string;
  conceptId: string;
  concept?: IConcept;
  articleId: string;
  article?: IArticle;
  entityId: string;
  entity?: IEntity;
  quantity: number;
  dateTime: Date;
  currencyCost: ICurrency;
  totalCurrencyCost: ICurrency;
}

export interface IPurchaseQueryResult {
  total: number;
  purchases: IPurchase[];
}
