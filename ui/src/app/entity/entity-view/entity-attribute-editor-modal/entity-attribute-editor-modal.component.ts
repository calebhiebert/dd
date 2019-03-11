import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AttributeType } from 'src/app/attributes';
import { numberValidator } from '../../dynamic-attribute-form/dynamic-attribute-form.component';
import { IEntityAttribute } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { IDynamicFieldConfig } from 'src/app/dynform/form-types';

@Component({
  selector: 'dd-entity-attribute-editor-modal',
  templateUrl: './entity-attribute-editor-modal.component.html',
  styleUrls: ['./entity-attribute-editor-modal.component.css'],
})
export class EntityAttributeEditorModalComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<any>;

  public attribute: IEntityAttribute;
  public config: IDynamicFieldConfig;

  public control: FormControl;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public async editAttribute(attribute?: IEntityAttribute, config?: IDynamicFieldConfig, currentValue?: any): Promise<any> {
    this.attribute = attribute;
    this.config = config;

    this.control = new FormControl(currentValue);

    return this.modal.open().then((res) => {
      this.config = undefined;
      this.attribute = undefined;
      return res;
    });
  }

  public ok() {
    if (this.control.invalid) {
      return;
    }

    this.modal.close(this.control.value);
  }

  public cancel() {
    this.modal.close(null);
  }
}
