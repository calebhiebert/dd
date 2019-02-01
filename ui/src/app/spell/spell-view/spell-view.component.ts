import { Component, OnInit } from '@angular/core';
import { ISpell, SpellService } from 'src/app/spell.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-spell-view',
  templateUrl: './spell-view.component.html',
  styleUrls: ['./spell-view.component.css'],
})
export class SpellViewComponent implements OnInit {
  public loading = false;
  public spell: ISpell;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spellService: SpellService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('s_id');

      if (id) {
        this.load(id);
      }
    });
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.spell = await this.spellService.getSpell(id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }
}
