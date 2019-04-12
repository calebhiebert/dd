import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private srcPrefix = '/assets/article-icons/';
  private srcPostfix = '.png';
  private icons = [
    'hanging-sign',
    'mushroom-gills',
    'pointy-sword',
    'round-bottom-flask',
    'shirt',
    'virtual-marker',
    'falling-leaf',
    'brutal-helm',
    'graduate-cap',
    'uncertainty',
    'hazard-sign',
    'drakkar',
    'pig',
    'sharp-shuriken',
    'swap-bag',
    'radar-sweep',
    'ship-wheel',
    'coffee-cup',
    'cheese-wedge',
    'cancel',
    'donut',
    'grave-flowers',
    'mustache',
    'imperial-crown',
    'magick-trick',
    'barrel',
  ];

  constructor() {}

  public getIcons(): IIcon[] {
    return this.icons.map((i) => {
      return {
        id: i,
        src: this.getIconSrc(i),
      };
    });
  }

  public getIconSrc(id: string) {
    return `${this.srcPrefix}${id}${this.srcPostfix}`;
  }
}

export interface IIcon {
  id: string;
  src: string;
}
