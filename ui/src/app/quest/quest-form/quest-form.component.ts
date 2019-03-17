import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuest, QuestService, QuestStatus } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';
import { Location } from '@angular/common';
import { distinctUntilChanged } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';

@Component({
  selector: 'dd-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.css'],
})
export class QuestFormComponent implements OnInit, ComponentCanDeactivate {
  public loading = false;
  public deleting = false;

  public formGroup: FormGroup;

  private quest: IQuest;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private questService: QuestService,
    private location: Location
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      accepted: new FormControl(false),
      available: new FormControl(false),
      visible: new FormControl(false),
      status: new FormControl('0'),
      content: new FormControl(null),
    });

    this.visible.valueChanges.subscribe(() => {
      this.dataToUI();
    });

    this.available.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.dataToUI();
    });

    this.dataToUI();

    if (this.editing) {
      const questId = this.route.snapshot.paramMap.get('q_id');
      this.loadQuest(questId);
    }
  }

  canDeactivate() {
    return !this.formGroup.dirty;
  }

  private dataToUI() {
    if (!this.quest && this.editing) {
      return;
    }

    const isAvailable = this.available.value as boolean;
    const isVisible = this.visible.value as boolean;

    if (!isVisible) {
      this.available.setValue(false);
      this.accepted.setValue(false);
      this.status.setValue(QuestStatus.NONE);

      this.accepted.disable();
      this.available.disable();
      this.status.disable();
    } else {
      this.available.enable();

      if (!isAvailable) {
        this.accepted.setValue(false);
        this.status.setValue(QuestStatus.NONE);

        this.accepted.disable();
        this.status.disable();
      } else {
        this.accepted.enable();
        this.status.enable();
      }
    }
  }

  private async loadQuest(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      const questResult = await this.questService.getQuest(id);
      this.formGroup.patchValue(questResult);
      this.quest = questResult;

      setTimeout(() => {
        this.dataToUI();
      }, 1);
    } catch (err) {
      throw err;
    }

    this.loading = false;
    this.formGroup.enable();
  }

  private constructQuest(): IQuest {
    const quest: IQuest = {
      name: this.name.value,
      accepted: this.accepted.value,
      available: this.available.value,
      visible: this.visible.value,
      content: this.formGroup.get('content').value,
      status: this.status.value,
      campaignId: this.campaignService.campaign.id,
    };

    if (this.editing) {
      quest.id = this.quest.id;
    }

    return quest;
  }

  public async submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const quest = this.constructQuest();

    this.loading = true;

    if (this.editing) {
      try {
        await this.questService.updateQuest(quest);
        this.formGroup.markAsPristine();
        this.cancel();
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const createdQuest = await this.questService.createQuest(quest);
        this.formGroup.markAsPristine();
        this.router.navigate(['campaigns', this.campaignService.campaign.id, 'quests', createdQuest.id]);
      } catch (err) {
        throw err;
      }
    }

    this.loading = false;
  }

  public async delete() {
    this.deleting = true;

    try {
      await this.questService.deleteQuest(this.quest);
    } catch (err) {
      throw err;
    }

    this.location.back();

    this.deleting = false;
  }

  public cancel() {
    this.location.back();
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get accepted() {
    return this.formGroup.get('accepted');
  }

  public get available() {
    return this.formGroup.get('available');
  }

  public get visible() {
    return this.formGroup.get('visible');
  }

  public get status() {
    return this.formGroup.get('status');
  }
}
