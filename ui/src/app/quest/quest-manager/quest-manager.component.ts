import { Component, OnInit } from '@angular/core';
import { Quest } from 'src/app/quest';

@Component({
  selector: 'dd-quest-manager',
  templateUrl: './quest-manager.component.html',
  styleUrls: ['./quest-manager.component.css'],
})
export class QuestManagerComponent implements OnInit {
  public loading = false;
  public quests: Quest[];

  constructor() {}

  ngOnInit() {
    this.loadQuests();
  }

  private async loadQuests() {
    this.loading = true;

    try {
      // const resp = await this.rpc.dd.getQuests({});
      // this.quests = resp.quests;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }
}
