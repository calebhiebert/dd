import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  public getMaps(campaignId: string): Promise<IMap[]> {
    return this.http
      .get<IMap[]>(`${environment.apiURL}/maps?campaignId=${campaignId}`)
      .toPromise();
  }

  public getMap(mapId: string): Promise<IMap> {
    return this.http
      .get<IMap>(`${environment.apiURL}/maps/${mapId}`)
      .toPromise();
  }
}

export interface IMap {
  id: string;
  name: string;
  minZoom: number;
  maxZoom: number;
  campaignId: string;
  userId: string;
  mapping?: { [key: string]: number[] };
}
