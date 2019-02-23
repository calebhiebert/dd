import { Component, OnInit } from '@angular/core';
import { Chance } from 'chance';

@Component({
  selector: 'dd-quick-dice',
  templateUrl: './quick-dice.component.html',
  styleUrls: ['./quick-dice.component.scss'],
})
export class QuickDiceComponent implements OnInit {
  public diceOptions: IDie[] = [
    { n: 4, src: '/assets/dice/d4.png' },
    { n: 6, src: '/assets/dice/d6.png' },
    { n: 8, src: '/assets/dice/d8.png' },
    { n: 10, src: '/assets/dice/d10.png' },
    { n: 12, src: '/assets/dice/d12.png' },
    { n: 20, src: '/assets/dice/d20.png' },
  ];

  public dieCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  public die: IDie;
  public dieCount: number;
  public rollResults: IDieResult[];

  constructor() {}

  ngOnInit() {}

  public selectDie(die: IDie) {
    this.die = die;
  }

  public selectDieCount(dieCount: number) {
    this.dieCount = dieCount;
    this.roll();
  }

  public roll() {
    const results: IDieResult[] = [];
    const chance = new Chance();

    for (let i = 0; i < this.dieCount; i++) {
      const rollValue = chance.integer({ min: 1, max: this.die.n });

      results.push({
        dieValue: this.die.n,
        rollValue: rollValue,
      });
    }

    this.rollResults = results;
  }

  public reset() {
    this.die = undefined;
    this.dieCount = undefined;
    this.rollResults = undefined;
  }

  public get resultTotal() {
    if (this.rollResults) {
      return this.rollResults
        .map((r) => r.rollValue)
        .reduce((dv, cv) => dv + cv);
    } else {
      return 0;
    }
  }
}

export interface IDie {
  // The number of sides on the die
  n: number;

  // The src for the die image
  src: string;
}

export interface IDieResult {
  // The number of sides on the die
  dieValue: number;

  // The value rolled
  rollValue: number;
}
