import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActionQueueService, ActionType } from '../action-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService, ICampaignInvite } from '../campaign.service';
import * as Sentry from '@sentry/browser';

@Component({
  selector: 'dd-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  public loading = false;
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
        inviteId: this.route.snapshot.paramMap.get('invite_id')
      }
    });
    this.actions.save();

    const isLoggedIn = await this.login.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      try {
        this.loading = true;
        await this.loadInvite();

        if (this.invite.status !== 0) {
          this.actions.queue.pop();
          this.actions.save();
        }
      } catch (err) {
        this.actions.queue.pop();
        this.actions.save();

        await this.router.navigate(['home']);
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
      Sentry.captureException(err);
    }

    this.accepting = false;
  }

  public async deny() {
    this.denying = true;

    try {
      await this.campaignService.denyInvite(this.invite.id);
    } catch (err) {
      Sentry.captureException(err);
    }

    this.actions.queue.pop();
    this.actions.save();
    this.router.navigate(['home']);

    this.denying = false;
  }

  private async loadInvite() {
    try {
      const invite = await this.campaignService.getInvite(
        this.route.snapshot.paramMap.get('invite_id')
      );
      this.invite = invite;
    } catch (err) {
      throw err;
    }
  }

  public get campaign() {
    if (this.invite) {
      return this.invite.campaign;
    } else {
      return null;
    }
  }
}
