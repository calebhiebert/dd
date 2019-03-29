import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OverviewStateService {
  constructor(private http: HttpClient) {}

  public getOverviewState(id: string): Promise<IOverviewState> {
    return this.http.get<IOverviewState>(`${environment.apiURL}/overviewstates/${id}`).toPromise();
  }

  public updateOverviewState(overviewState: IOverviewState, campaignId: string): Promise<IOverviewState> {
    return this.http.put<IOverviewState>(`${environment.apiURL}/overviewstates/campaign/${campaignId}`, overviewState).toPromise();
  }
}

export interface EntitySortOrder {
  [key: string]: number;
}

export interface IEntityLabels {
  [key: string]: string;
}

export interface IOverviewState {
  id?: string;
  entitySortOrder: EntitySortOrder;
  entityLabels: IEntityLabels;
}
