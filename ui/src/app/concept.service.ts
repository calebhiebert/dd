import { Injectable } from '@angular/core';
import { IDynamicFieldConfig } from './dynform/form-types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICampaign } from './campaign.service';
import { IUser } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  constructor(private http: HttpClient) {}

  public getConceptType(id: string): Promise<IConceptType> {
    return this.http
      .get<IConceptType>(`${environment.apiURL}/concepttypes/${id}`)
      .toPromise();
  }

  public createConceptType(conceptType: IConceptType): Promise<IConceptType> {
    return this.http
      .post<IConceptType>(`${environment.apiURL}/concepttypes`, conceptType)
      .toPromise();
  }

  public updateConceptType(conceptType: IConceptType): Promise<void> {
    return this.http
      .put<void>(
        `${environment.apiURL}/concepttypes/${conceptType.id}`,
        conceptType
      )
      .toPromise();
  }

  public deleteConceptType(id: string): Promise<IConceptType> {
    return this.http
      .delete<IConceptType>(`${environment.apiURL}/concepttypes/${id}`)
      .toPromise();
  }

  public getConcept(id: string): Promise<IConcept> {
    return this.http
      .get<IConcept>(`${environment.apiURL}/concepts/${id}`)
      .toPromise();
  }

  public getConcepts(
    typeId: string,
    limit?: number,
    offset?: number,
    search?: string
  ): Promise<IConceptsQueryResult> {
    if (limit === undefined || limit === null || limit <= 0) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    }

    if (offset === undefined || offset === null || offset < 0) {
      offset = 0;
    }

    let searchQuery = '';

    if (search !== null && search !== undefined && search.trim().length > 0) {
      searchQuery = `&search=${encodeURIComponent(search)}`;
    }

    return this.http
      .get<IConceptsQueryResult>(
        `${
          environment.apiURL
        }/concepts?type=${typeId}&limit=${limit}&offset=${offset}${searchQuery}`
      )
      .toPromise();
  }

  public createConcept(Concept: IConcept): Promise<IConcept> {
    return this.http
      .post<IConcept>(`${environment.apiURL}/concepts`, Concept)
      .toPromise();
  }

  public updateConcept(Concept: IConcept): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/concepts/${Concept.id}`, Concept)
      .toPromise();
  }

  public deleteConcept(id: string): Promise<IConcept> {
    return this.http
      .delete<IConcept>(`${environment.apiURL}/concepts/${id}`)
      .toPromise();
  }
}

export interface IConceptType {
  id?: string;
  name: string;
  pluralForm: string;
  description?: string;
  userId: string;
  icon?: string;
  fields: IConceptField[];
  campaignId: string;
  campaign?: ICampaign;
}

export interface IConcept {
  id?: string;
  name: string;
  content?: any;
  userId: string;
  fields: IField[];
  tags: string[];
  imageId?: string;
  conceptTypeId: string;
  conceptType?: IConceptType;
}

export interface IConceptField extends IDynamicFieldConfig {}

export interface IField {
  name: string;
  value: any;
}

export interface IConceptsQueryResult {
  total: number;
  concepts: IConcept[];
}
