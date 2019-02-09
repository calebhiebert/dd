import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISpell, SpellService } from 'src/app/spell.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-spell-select',
  templateUrl: './spell-select.component.html',
  styleUrls: ['./spell-select.component.css'],
})
export class SpellSelectComponent implements OnInit {
  @Output()
  public selected = new EventEmitter<ISpell>();

  public loading = false;
  public searchControl: FormControl;
  public spells: ISpell[];

  private _search: string;

  constructor(
    private spellService: SpellService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search) => {
        this._search = search;
        this.load();
      });

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      const result = await this.spellService.getSpells(
        this.campaignService.campaign.id,
        6,
        0,
        this._search
      );

      this.spells = result.spells;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public selectSpell(spell: ISpell) {
    this.selected.emit(spell);
  }
}
