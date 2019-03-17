import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IArticleConcept, ArticleService } from 'src/app/article.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IDynamicFieldConfig, DynamicFieldType } from 'src/app/dynform/form-types';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dd-article-concept-manager-list-item',
  templateUrl: './article-concept-manager-list-item.component.html',
  styleUrls: ['./article-concept-manager-list-item.component.css'],
})
export class ArticleConceptManagerListItemComponent implements OnInit {
  @Input()
  public articleConcept: IArticleConcept;

  @Input()
  public editable: boolean;

  @Output()
  public remove = new EventEmitter<any>();

  public saving = false;
  public expanded = false;
  public formGroup: FormGroup;
  public currencyFieldConfig: IDynamicFieldConfig;
  public quantityFieldConfig: IDynamicFieldConfig;
  public isPurchasableFieldConfig: IDynamicFieldConfig;

  constructor(private router: Router, private campaignService: CampaignService, private articleService: ArticleService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      quantity: new FormControl(this.articleConcept.quantity),
      currencyCost: new FormControl(this.articleConcept.currencyCost),
      isPurchasable: new FormControl(this.articleConcept.isPurchasable),
    });

    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe((val) => {
        if (this.formGroup.valid) {
          this.articleConcept.isPurchasable = val.isPurchasable;
          this.articleConcept.quantity = val.quantity;
          this.articleConcept.currencyCost = val.currencyCost;
          this.save();
        }
      });

    this.currencyFieldConfig = {
      name: 'Cost',
      type: DynamicFieldType.CURRENCY,
      options: {
        levels: this.campaignService.campaign.currencyMap,
        trackCoins: this.campaignService.campaign.trackCoins,
      },
    };

    this.quantityFieldConfig = {
      name: 'Quantity (stock)',
      type: DynamicFieldType.INT,
      options: {
        min: 0,
      },
    };

    this.isPurchasableFieldConfig = {
      name: 'Is Purchasable',
      type: DynamicFieldType.BOOLEAN,
    };
  }

  private async save() {
    this.saving = true;

    try {
      await this.articleService.updateArticleConcept(this.articleConcept);
    } catch (err) {
      throw err;
    }

    this.saving = false;
  }

  public doRemove() {
    this.remove.emit();
  }

  public async edit() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'concepts',
      this.articleConcept.concept.conceptTypeId,
      this.articleConcept.conceptId,
      'edit',
    ]);
  }

  public async viewConcept() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'concepts',
      this.articleConcept.concept.conceptTypeId,
      this.articleConcept.conceptId,
      'view',
    ]);
  }

  public get currencyCost() {
    return this.formGroup.get('currencyCost');
  }

  public get quantity() {
    return this.formGroup.get('quantity');
  }

  public get isPurchasable() {
    return this.formGroup.get('isPurchasable');
  }
}
