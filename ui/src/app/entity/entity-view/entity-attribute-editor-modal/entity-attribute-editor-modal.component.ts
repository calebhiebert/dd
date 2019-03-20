import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IViewField } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { ModalComponent } from 'src/app/custom-controls/modal/modal.component';
import { IDynamicFieldConfig } from 'src/app/custom-controls/dynform/form-types';

@Component({
  selector: 'dd-entity-attribute-editor-modal',
  templateUrl: './entity-attribute-editor-modal.component.html',
  styleUrls: ['./entity-attribute-editor-modal.component.css'],
})
export class EntityAttributeEditorModalComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<any>;

  public config: IDynamicFieldConfig;
  public modifiers: IViewField[];

  public control: FormControl;
  public modifiersGroup: FormGroup;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public async editAttribute(
    config?: IDynamicFieldConfig,
    currentValue?: any,
    modifiers?: IViewField[]
  ): Promise<{ value: any; mods: any }> {
    this.config = config;
    this.modifiers = modifiers;

    this.control = new FormControl(currentValue);

    if (this.modifiers) {
      this.modifiersGroup = new FormGroup({});

      for (const m of this.modifiers) {
        this.modifiersGroup.addControl(m.config.name, new FormControl(m.field.value));
      }
    }

    return this.modal.open().then((res) => {
      this.config = undefined;
      this.modifiers = undefined;
      this.modifiersGroup = undefined;
      return res;
    });
  }

  public trackModifier(idx: number) {
    return idx;
  }

  public ok() {
    if (this.control.invalid) {
      return;
    }

    this.modal.close({
      value: this.control.value,
      mods: this.modifiersGroup ? this.modifiersGroup.value : null,
    });
  }

  public cancel() {
    this.modal.close(null);
  }
}
