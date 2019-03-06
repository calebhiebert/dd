import { Injectable } from '@angular/core';
import { IDynamicFieldConfig } from './dynform/form-types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICampaign } from './campaign.service';

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
}

export interface IConceptType {
  id?: string;
  name: string;
  description?: string;
  userId: string;
  icon?: string;
  fields: IConceptField[];
  campaignId: string;
  campaign?: ICampaign;
}

export interface IConceptField extends IDynamicFieldConfig {}
