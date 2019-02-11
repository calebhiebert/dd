import { Component, OnInit } from '@angular/core';
import { SpellService, ISpell } from 'src/app/spell.service';
import { FormControl } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-spell-manager',
  templateUrl: './spell-manager.component.html',
  styleUrls: ['./spell-manager.component.css'],
})
export class SpellManagerComponent implements OnInit {
  public loading = false;

  public searchControl: FormControl;

  public spells: ISpell[];
  public totalSpellCount: number;
  public queryLimit = 10;

  private _queryOffset: number;
  private _page = 1;
  private _search: string;

  constructor(
    private spellService: SpellService,
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.readURLParams();

    this.searchControl = new FormControl(this.search);

    this.searchControl.valueChanges
      .pipe(debounceTime(350))
      .subscribe((search: string) => {
        if (!search) {
          this.search = '';
          return;
        }

        this.search = search.trim().toLowerCase();
      });

    this.load(false);
  }

  private readURLParams() {
    const query = this.route.snapshot.queryParamMap;

    if (query.get('search')) {
      this._search = query.get('search');
    }

    if (query.get('limit')) {
      try {
        this.queryLimit = parseInt(query.get('limit'), 10);
      } catch (err) {
        // Do nothing
      }
    } else {
      this.queryLimit = 10;
    }

    if (query.get('offset')) {
      try {
        this._queryOffset = parseInt(query.get('offset'), 10);
      } catch (err) {
        // Do nothing
      }
    } else {
      this._queryOffset = 0;
    }

    this._page = (this._queryOffset || 0) / (this.queryLimit || 10) + 1;
  }

  private async writeURLParams() {
    const queryObj: { [key: string]: string } = {
      limit: this.queryLimit.toString(),
      offset: (this.queryLimit * (this._page - 1)).toString(),
    };

    if (this.search && this.search.trim() !== '') {
      queryObj.search = this.search;
    }

    await this.router.navigate(
      ['campaigns', this.campaignService.campaign.id, 'spells'],
      {
        queryParams: queryObj,
        replaceUrl: true,
      }
    );
  }

  public async load(navigate: boolean = true) {
    this.loading = true;

    // Rewrite the url to include the new query parameters
    if (navigate) {
      await this.writeURLParams();
    }

    try {
      const result = await this.spellService.getSpells(
        this.campaignService.campaign.id,
        this.queryLimit,
        this._queryOffset,
        this._search
      );

      this.spells = result.spells;
      this.totalSpellCount = result.total;
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public addSpell() {
    this.router.navigate([
      'campaign',
      'manage',
      this.campaignService.campaign.id,
      'spells',
      'create',
    ]);
  }

  public selectSpell(spell: ISpell) {
    this.router.navigate(['campaigns', spell.campaignId, 'spells', spell.id]);
  }

  public get search() {
    return this._search;
  }

  public set search(value: string) {
    this._search = value;

    // Setting the page triggers a re-fetch
    this.page = 1;
  }

  public get page() {
    return this._page;
  }

  public set page(value: number) {
    this._page = value;
    this._queryOffset = this.queryLimit * (this.page - 1);
    this.load();
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
