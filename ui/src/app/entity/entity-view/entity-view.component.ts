import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityAttributeEditorModalComponent } from './entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { Entity, EntityAttribute, AttributeClass } from 'src/app/entity';
import { EntityService, IEntity } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { AttributeType, Attribute } from 'src/app/attributes';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss']
})
export class EntityViewComponent implements OnInit {
  @ViewChild('attributemodal')
  public attributeModal: EntityAttributeEditorModalComponent;

  public entity: IEntity;

  public loading = false;

  public saving = false;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private campaignService: CampaignService,
    private sanitizer: DomSanitizer,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadEntity(params.get('ent_id'));
    });
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      const ent = await this.entityService.getEntity(id);
      this.entity = ent;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public async editAttribute(attr: {
    attr: Attribute;
    pattr: EntityAttribute;
  }) {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      { ...attr.pattr },
      attr.attr.data
    );

    if (attrValue !== null && attrValue !== undefined) {
      for (const attribute of this.entity.attributes) {
        if (attribute.name === attr.attr.name) {
          attribute.data = attrValue;
          break;
        }
      }

      this.updateEntity();
    }
  }

  public async editCurrency() {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'Gold Pieces',
        description: `How many money you have`,
        type: AttributeType.NUMBER,
        required: true,
        min: 0,
        class: AttributeClass.NORMAL
      },
      this.entity.currency.toString()
    );

    if (attrValue !== null && attrValue !== undefined) {
      this.entity.currency = parseInt(attrValue);
      this.updateEntity();
    }
  }

  public async editName() {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'Name',
        description: `What the ${this.entity.preset.name} is called`,
        type: AttributeType.STRING,
        required: true,
        min: 2,
        max: 30,
        class: AttributeClass.NORMAL
      },
      this.entity.name
    );

    if (attrValue !== null && attrValue !== undefined) {
      this.entity.name = attrValue;
      this.updateEntity();
    }
  }

  public async editXP() {
    if (!this.editable) {
      return;
    }

    const attrValue = await this.attributeModal.editAttribute(
      {
        name: 'XP',
        description: `Experience points that this ${
          this.entity.preset.name
        } has`,
        type: AttributeType.NUMBER,
        required: true,
        min: 0,
        max: 2147483647,
        class: AttributeClass.NORMAL
      },
      this.entity.xp.toString()
    );

    if (attrValue !== null && attrValue !== undefined) {
      this.entity.xp = parseInt(attrValue, 10);
      this.updateEntity();
    }
  }

  private async updateEntity() {
    this.saving = true;

    try {
      await this.entityService.updateEntity(this.entity);
    } catch (err) {
      console.log('UPDATE ERR', err);
    }

    this.saving = false;
  }

  private getEntityAttribute(name: string) {
    return this.entity.preset.attributes.find(e => e.name === name);
  }

  public get processedAttributes(): {
    attr: Attribute;
    pattr: EntityAttribute;
  }[] {
    return this.entity.attributes.map(a => {
      return {
        attr: a,
        pattr: this.getEntityAttribute(a.name)
      };
    });
  }

  public get majorAttributes(): { attr: Attribute; pattr: EntityAttribute }[] {
    return this.entity.attributes
      .map(a => {
        return {
          attr: a,
          pattr: this.getEntityAttribute(a.name)
        };
      })
      .filter(a => a.pattr && a.pattr.class === 0);
  }

  public get normalAttributes(): { attr: Attribute; pattr: EntityAttribute }[] {
    return this.entity.attributes
      .map(a => {
        return {
          attr: a,
          pattr: this.getEntityAttribute(a.name)
        };
      })
      .filter(a => a.pattr && a.pattr.class === 1);
  }

  public get minorAttributes(): { attr: Attribute; pattr: EntityAttribute }[] {
    return this.entity.attributes
      .map(a => {
        return {
          attr: a,
          pattr: this.getEntityAttribute(a.name)
        };
      })
      .filter(a => a.pattr && a.pattr.class === 2);
  }

  public get unimportantAttributes(): {
    attr: Attribute;
    pattr: EntityAttribute;
  }[] {
    return this.entity.attributes
      .map(a => {
        return {
          attr: a,
          pattr: this.getEntityAttribute(a.name)
        };
      })
      .filter(a => a.pattr && a.pattr.class === 3);
  }

  public get level() {
    return this.campaignService.calculateLevel(this.entity.xp);
  }

  public get editable() {
    return this.campaignService.canEdit || this.entity.userId == this.login.id;
  }

  public get formattedCurrency() {
    if (!this.entity) {
      return '0';
    }

    let currency = '';
    const currencyString = this.entity.currency.toString();

    for (let i = 0; i < currencyString.length; i++) {
      currency += currencyString[i];
      if (
        (currencyString.length - i - 1) % 3 === 0 &&
        currencyString.length - i - 1 > 0
      ) {
        currency += ',';
      }
    }

    return currency;
  }

  public backgroundCSS(imageId: string) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url("https://res.cloudinary.com/dqhk8k6iv/image/upload/t_chr_blur/${imageId}.jpg")`
    );
  }
}
