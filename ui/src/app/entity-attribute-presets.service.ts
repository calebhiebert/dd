import { Injectable } from '@angular/core';
import { IEntityFieldConfig } from './entity.service';
import { DND_5E, DND_5E_ENEMY } from './entity-attributes.presets';

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
        fields: DND_5E,
      },
      {
        name: 'D&D 5e Enemy',
        description: 'Fields for a 5e monster',
        fields: DND_5E_ENEMY,
      },
    ];
  }
}

export interface IEntityAttributePreset {
  name: string;
  description: string;
  fields: IEntityFieldConfig[];
}
