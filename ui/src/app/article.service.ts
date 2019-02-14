import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMap } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getArticle(id: string): Promise<IArticle> {
    return this.http
      .get<IArticle>(`${environment.apiURL}/articles/${id}`)
      .toPromise();
  }

  public getArticles(
    campaignId: string,
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<ISearchedArticle[]> {
    const searchString = search ? `&search=${encodeURIComponent(search)}` : '';

    return this.http
      .get<ISearchedArticle[]>(
        `${
          environment.apiURL
        }/articles?campaignId=${campaignId}&limit=${limit}&offset=${offset}${searchString}`
      )
      .toPromise();
  }

  public createArticle(article: IArticle): Promise<IArticle> {
    return this.http
      .post<IArticle>(`${environment.apiURL}/articles`, article)
      .toPromise();
  }

  public updateArticle(article: IArticle): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/articles/${article.id}`, article)
      .toPromise();
  }

  public getMapArticles(mapId: string): Promise<IArticle[]> {
    return this.http
      .get<IArticle[]>(`${environment.apiURL}/articles/map/${mapId}`)
      .toPromise();
  }
}

export interface IArticle {
  id?: string;
  name: string;
  text: string;
  campaignId: string;
  userId: string;
  user?: string;
  published: boolean;
  createdAt?: Date;
  mapId?: string;
  map?: IMap;
  lat?: number;
  lng?: number;
}

export interface ISearchedArticle extends IArticle {
  firstImageID: string;
}
