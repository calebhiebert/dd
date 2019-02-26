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

  public deleteMap(mapId: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/maps/${mapId}`)
      .toPromise();
  }

  public updateMap(map: IMap): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/maps/${map.id}`, map)
      .toPromise();
  }
}

export interface IMap {
  id: string;
  name: string;
  minZoom: number;
  maxZoom: number;
  campaignId: string;
  status: MapStatus;
  shapes?: IMapShape[];
  playerVisible: boolean;
  userId: string;
  mapping?: { [key: string]: number[] };
}

export enum MapStatus {
  PROCESSING,
  PROCESSED,
}

export interface IMapShape {
  type: MapShapeType;
  lat?: number;
  lng?: number;
  points?: number[][];
  radius?: number;
}

export enum MapShapeType {
  POLYLINE,
  CIRCLE,
  MARKER,
  POLYGON,
  RECTANGLE,
}