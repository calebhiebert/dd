import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActionQueueService, ActionType } from '../action-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ICampaign,
  CampaignService,
  ICampaignInvite,
} from '../campaign.service';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'dd-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
})
export class InviteComponent implements OnInit {
  public loading = false;
  public campaign: ICampaign;
  public invite: ICampaignInvite;

  public accepting = false;
  public denying = false;

  constructor(
    private login: LoginService,
    private actions: ActionQueueService,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const actions = this.actions.queue;
    actions.unshift({
      type: ActionType.INVITE,
      data: {
        inviteId: this.route.snapshot.paramMap.get('invite_id'),
      },
    });
    this.actions.save();

    const isLoggedIn = await this.login.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      try {
        this.loading = true;
        await this.loadInvite();
        await this.loadCampaign();

        if (this.invite.status !== 0) {
          this.actions.queue.pop();
          this.actions.save();
        }
      } catch (err) {
        this.actions.queue.pop();
        this.actions.save();

        await this.router
          .navigate(['home'])
          .catch((err) =>
            console.log('ROPUTE', err.name, err.message, err.stack)
          );
      }
      this.loading = false;
    }
  }

  public async accept() {
    this.accepting = true;

    try {
      await this.campaignService.acceptInvite(this.invite.id);

      this.actions.queue.pop();
      this.actions.save();
      this.router.navigate(['campaigns', this.campaign.id, 'landing']);
    } catch (err) {
      console.log('ACCERR', err);
    }

    this.accepting = true;
  }

  public async deny() {
    this.denying = true;

    try {
      await this.campaignService.denyInvite(this.invite.id);
    } catch (err) {
      console.log('ACCERR', err);
    }

    this.actions.queue.pop();
    this.actions.save();
    this.router.navigate(['home']);

    this.denying = true;
  }

  private async loadCampaign() {
    try {
      const campaign = await this.campaignService.getCampaign(
        this.invite.campaignId
      );
      this.campaign = campaign;
    } catch (err) {
      console.log('CLERR', err);
      throw err;
    }
  }

  private async loadInvite() {
    try {
      const invite = await this.campaignService.getInvite(
        this.route.snapshot.paramMap.get('invite_id')
      );
      this.invite = invite;
    } catch (err) {
      console.log('INVITE LOAD ERR', err);
      throw err;
    }
  }
}
