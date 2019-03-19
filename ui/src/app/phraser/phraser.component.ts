import { Component, OnInit } from '@angular/core';
import { Chance } from 'chance';

const PHRASE_VERB: string[] = [
  'Securing',
  'Ripening',
  'Planting',
  'Cooking',
  'Loading',
  'Computing',
  'Slurping',
  'Destroying',
  'Demolishing',
];

const PHRASE_NOUN: string[] = [
  'trebuchets',
  'apples',
  'pumpkins',
  'dank memes',
  'characters',
  'dinner',
  'a smoothie',
  'chocolate cake',
  'gloves',
  'a water bottle',
  'an absolute unit',
];

@Component({
  selector: 'dd-phraser',
  templateUrl: './phraser.component.html',
  styleUrls: ['./phraser.component.css'],
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
    this.phrase = `${PHRASE_VERB[this.chance.integer({ min: 0, max: PHRASE_VERB.length - 1 })]} ${
      PHRASE_NOUN[this.chance.integer({ min: 0, max: PHRASE_NOUN.length - 1 })]
    }`;

    setTimeout(() => {
      this.generatePhrase();
    }, this.chance.integer({ min: 250, max: 1500 }));
  }
}
