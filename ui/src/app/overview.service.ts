import { Injectable } from '@angular/core';
import { IEntity } from './entity.service';
import { CampaignService } from './campaign.service';

export enum SortMode {
  NAME,
  HP_PERCENT,
  HP_MAX,
  HP_CURRENT,
}

export enum SortDirection {
  ASC,
  DESC,
}

export interface IOverviewPreferences {
  sortMode: SortMode;
  sortDirection: SortDirection;
}

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private _sortMode: SortMode;
  private _sortDirection: SortDirection;

  constructor(private campaignService: CampaignService) {}

  private getPrefsFromState(): IOverviewPreferences {
    return {
      sortDirection: this._sortDirection,
      sortMode: this._sortMode,
    };
  }

  private applyPrefs(prefs: IOverviewPreferences) {
    if (prefs !== null && prefs !== undefined) {
      this.setSorting(prefs.sortMode, prefs.sortDirection);
    }
  }

  private reset() {
    this._sortDirection = SortDirection.DESC;
    this._sortMode = SortMode.NAME;
  }

  private compareText(a: string, b: string, direction: SortDirection): number {
    if (direction === SortDirection.ASC) {
      return b.localeCompare(a);
    } else if (direction === SortDirection.DESC) {
      return a.localeCompare(b);
    }
  }

  private compareNumber(
    a: number,
    b: number,
    direction: SortDirection
  ): number {
    if (direction === SortDirection.ASC) {
      return a - b;
    } else if (direction === SortDirection.DESC) {
      return b - a;
    }
  }

  private savePrefs(prefs: IOverviewPreferences) {
    localStorage.setItem('overview-preferences', JSON.stringify(prefs));
  }

  private loadPrefs(): IOverviewPreferences {
    // TODO optimize localstorage calls by using a variable
    if (localStorage.getItem('overview-preferences') !== null) {
      return JSON.parse(localStorage.getItem('overview-preferences'));
    } else {
      return null;
    }
  }

  public savePreferences() {
    this.savePrefs(this.getPrefsFromState());
  }

  public loadPreferences() {
    this.applyPrefs(this.loadPrefs());
  }

  public setSorting(mode: SortMode, direction: SortDirection) {
    // Parameters are parsed because angular reactive forms submit number
    // values as strings
    this._sortMode = typeof mode === 'string' ? parseInt(mode, 10) : mode;
    this._sortDirection =
      typeof direction === 'string' ? parseInt(direction, 10) : direction;

    // Save new sorting preferences
    this.savePrefs(this.getPrefsFromState());
  }

  public get entities() {
    return this.campaignService.campaign.entities.filter((e) => !e.spawnable);
  }

  public get preferences() {
    return this.getPrefsFromState();
  }

  public get sortedEntities(): IEntity[] {
    switch (this._sortMode) {
      case SortMode.NAME:
        return this.entities.sort((a, b) => {
          return this.compareText(a.name, b.name, this._sortDirection);
        });
      case SortMode.HP_CURRENT:
        return this.entities.sort((a, b) => {
          if (a.health === null) {
            return 1;
          } else if (b.health === null) {
            return -1;
          }

          return this.compareNumber(
            a.health.current,
            b.health.current,
            this._sortDirection
          );
        });
      case SortMode.HP_MAX:
        return this.entities.sort((a, b) => {
          if (a.health === null) {
            return 1;
          } else if (b.health === null) {
            return -1;
          }

          return this.compareNumber(
            a.health.max,
            b.health.max,
            this._sortDirection
          );
        });
      case SortMode.HP_PERCENT:
        return this.entities.sort((a, b) => {
          if (a.health === null) {
            return 1;
          } else if (b.health === null) {
            return -1;
          }

          return this.compareNumber(
            a.health.current / a.health.max,
            b.health.current / b.health.max,
            this._sortDirection
          );
        });
    }

    return this.entities;
  }
}
