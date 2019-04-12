import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService, IPurchase } from 'src/app/purchase.service';
import { CampaignService } from 'src/app/campaign.service';
import { IEntity, EntityService } from 'src/app/entity.service';

@Component({
  selector: 'dd-entity-purchase-list',
  templateUrl: './entity-purchase-list.component.html',
  styleUrls: ['./entity-purchase-list.component.css'],
})
export class EntityPurchaseListComponent implements OnInit {
  public loading = false;
  public totalPurchases: number;
  public purchases: IPurchase[];
  public entity: IEntity;
  public page = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private campaignService: CampaignService,
    private entityService: EntityService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.load(params.get('ent_id'));
    });
  }

  private async load(entityId: string) {
    this.loading = true;

    try {
      await Promise.all([this.loadPurchases(entityId), this.loadEntity(entityId)]);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  private async loadEntity(entityId: string) {
    this.entity = await this.entityService.getEntity(entityId);
  }

  private async loadPurchases(entityId: string) {
    const result = await this.purchaseService.getPurchases(this.campaignService.campaign.id, 10, 10 * (this.page - 1), entityId);
    this.totalPurchases = result.total;
    this.purchases = result.purchases;
  }

  public setPage(page: number) {
    if (!this.entity) {
      return;
    }

    this.page = page;
    this.load(this.entity.id);
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
