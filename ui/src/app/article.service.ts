import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMap } from './map.service';
import { IQuest } from './quest.service';
import { IConcept } from './concept.service';
import { ICurrency } from './entity.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getArticle(id: string): Promise<IArticle> {
    return this.http.get<IArticle>(`${environment.apiURL}/articles/${id}`).toPromise();
  }

  public getArticles(campaignId: string, limit: number = 10, offset: number = 0, search?: string): Promise<ISearchedArticle[]> {
    const searchString = search ? `&search=${encodeURIComponent(search)}` : '';

    return this.http
      .get<ISearchedArticle[]>(`${environment.apiURL}/articles?campaignId=${campaignId}&limit=${limit}&offset=${offset}${searchString}`)
      .toPromise();
  }

  public createArticle(article: IArticle): Promise<IArticle> {
    return this.http.post<IArticle>(`${environment.apiURL}/articles`, article).toPromise();
  }

  public updateArticle(article: IArticle): Promise<void> {
    return this.http.put<void>(`${environment.apiURL}/articles/${article.id}`, article).toPromise();
  }

  public getMapArticles(mapId: string): Promise<IArticle[]> {
    return this.http.get<IArticle[]>(`${environment.apiURL}/articles/map/${mapId}`).toPromise();
  }

  public deleteArticle(id: string): Promise<void> {
    return this.http.delete<void>(`${environment.apiURL}/articles/${id}`).toPromise();
  }

  public getArticleQuests(articleId: string): Promise<IArticleQuest[]> {
    return this.http.get<IArticleQuest[]>(`${environment.apiURL}/articlequests/?articleId=${articleId}`).toPromise();
  }

  public updateArticleQuest(articleQuest: IArticleQuest): Promise<IArticleQuest> {
    return this.http.put<IArticleQuest>(`${environment.apiURL}/articlequests`, articleQuest).toPromise();
  }

  public deleteArticleQuest(articleQuest: IArticleQuest): Promise<IArticleQuest> {
    return this.http
      .delete<IArticleQuest>(`${environment.apiURL}/articlequests?articleId=${articleQuest.articleId}&questId=${articleQuest.questId}`)
      .toPromise();
  }

  public getArticleConcepts(articleId: string, conceptTypeId: string): Promise<IArticleConcept[]> {
    return this.http
      .get<IArticleConcept[]>(`${environment.apiURL}/articleconcepts/?articleId=${articleId}&conceptTypeId=${conceptTypeId}`)
      .toPromise();
  }

  public updateArticleConcept(articleConcept: IArticleConcept): Promise<IArticleConcept> {
    return this.http.put<IArticleConcept>(`${environment.apiURL}/articleconcepts`, articleConcept).toPromise();
  }

  public deleteArticleConcept(articleConcept: IArticleConcept): Promise<IArticleConcept> {
    return this.http
      .delete<IArticleConcept>(
        `${environment.apiURL}/articleconcepts?articleId=${articleConcept.articleId}&conceptId=${articleConcept.conceptId}`
      )
      .toPromise();
  }
}

export interface IArticle {
  id?: string;
  name: string;
  content: any;
  campaignId: string;
  userId: string;
  user?: string;
  published: boolean;
  createdAt?: Date;
  tags: string[];
  mapId?: string;
  articleQuests?: IArticleQuest[];
  articleConcepts?: IArticleConcept[];
  map?: IMap;
  lat?: number;
  lng?: number;
  icon?: string;
}

export interface ISearchedArticle extends IArticle {
  imageURLs?: string[];
}

export interface IArticleQuest {
  articleId: string;
  questId: string;
  article?: IArticle;
  quest?: IQuest;
}

export interface IArticleConcept {
  articleId: string;
  conceptId: string;
  concept?: IConcept;
  isPurchasable: boolean;
  currencyCost?: ICurrency;
  quantity?: number;
}
