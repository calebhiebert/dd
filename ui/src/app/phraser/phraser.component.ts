import { Component, OnInit } from '@angular/core';
import { Chance } from 'chance';

const PHRASES: string[] = [
  'Securing trebuchets',
  'Ripening apples',
  'Planting pumpkins',
  'Generating dank memes',
  'Loading characters',
  'Computing the meaning of life',
  'Cooking dinner'
];

@Component({
  selector: 'dd-phraser',
  templateUrl: './phraser.component.html',
  styleUrls: ['./phraser.component.css']
})
export class PhraserComponent implements OnInit {
  public phrase: string;

  private chance: Chance.Chance;

  constructor() {
    this.chance = new Chance();
  }

  ngOnInit() {
    this.generatePhrase();
  }

  private generatePhrase() {
    this.phrase = PHRASES[this.chance.integer({ min: 0, max: PHRASES.length })];

    setTimeout(() => {
      this.generatePhrase();
    }, this.chance.integer({ min: 500, max: 3000 }));
  }
}
