import { Injectable } from '@angular/core';
import { IEntityAttribute } from './entity.service';
import { DND_5E } from './entity-attributes.presets';

@Injectable({
  providedIn: 'root',
})
export class EntityAttributePresetsService {
  constructor() {}

  public async getPresets(): Promise<IEntityAttributePreset[]> {
    return [
      {
        name: 'DnD 5e',
        description: 'Attributes from the 5th edition of DnD',
        attributes: DND_5E,
      },
    ];
  }
}

export interface IEntityAttributePreset {
  name: string;
  description: string;
  attributes: IEntityAttribute[];
}
