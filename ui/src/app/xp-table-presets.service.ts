import { Injectable } from '@angular/core';
import { DND_5E, DND_4E } from './xp-table.presets';

@Injectable({
  providedIn: 'root',
})
export class XpTablePresetsService {
  constructor() {}

  public async getPresets(): Promise<IXPTablePreset[]> {
    return [
      { name: 'DnD 5E', xpTable: DND_5E },
      { name: 'DnD 4E', xpTable: DND_4E },
    ];
  }
}

export interface IXPTablePreset {
  name: string;
  xpTable: number[];
}
