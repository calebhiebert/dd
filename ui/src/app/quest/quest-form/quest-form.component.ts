import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuest, QuestService } from 'src/app/quest.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.css'],
})
export class QuestFormComponent implements OnInit {
  public loading = false;

  public formGroup: FormGroup;

  private quest: IQuest;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private questService: QuestService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      visible: new FormControl(false),
      active: new FormControl(false),
    });

    this.active.disable();

    this.visible.valueChanges.subscribe(() => {
      this.dataToUI();
    });

    if (this.editing) {
      const questId = this.route.snapshot.paramMap.get('q_id');
      this.loadQuest(questId);
    }
  }

  private dataToUI() {
    const isVisible = this.visible.value as boolean;

    if (!isVisible) {
      this.active.setValue(false);
      this.active.disable();
    } else {
      this.active.enable();
    }
  }

  private async loadQuest(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      this.quest = await this.questService.getQuest(id);

      this.formGroup.patchValue(this.quest);

      setTimeout(() => {
        this.dataToUI();
      }, 1);
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
    this.formGroup.enable();
  }

  private constructQuest(): IQuest {
    const quest: IQuest = {
      name: this.name.value,
      description: this.description.value,
      visible: this.visible.value,
      active: this.active.value,
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
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'quests',
          this.quest.id,
        ]);
      } catch (err) {
        console.log('EDIT ERR', err);
      }
    } else {
      try {
        const createdQuest = await this.questService.createQuest(quest);
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'quests',
          createdQuest.id,
        ]);
      } catch (err) {
        console.log('CREATE ERR', err);
      }
    }

    this.loading = false;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get visible() {
    return this.formGroup.get('visible');
  }

  public get active() {
    return this.formGroup.get('active');
  }
}
