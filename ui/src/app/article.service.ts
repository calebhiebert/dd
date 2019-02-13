import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  public getArticles(): Promise<IArticle[]> {
    return this.http
      .get<IArticle[]>(`${environment.apiURL}/articles`)
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
}
