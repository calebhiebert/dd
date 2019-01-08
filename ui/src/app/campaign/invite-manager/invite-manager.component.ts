import { Component, OnInit } from '@angular/core';
import {
  ICampaignInvite,
  CampaignService,
  CampaignInviteStatus,
} from 'src/app/campaign.service';
import { Chance } from 'chance';

@Component({
  selector: 'dd-invite-manager',
  templateUrl: './invite-manager.component.html',
  styleUrls: ['./invite-manager.component.css'],
})
export class InviteManagerComponent implements OnInit {
  public loading = false;
  public creatingInvite = false;

  public invites: ICampaignInvite[];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadInvites();
  }

  public async createInvite() {
    this.creatingInvite = true;

    const c = new Chance();

    try {
      const invite = await this.campaignService.createInvite(
        `${c.state({ full: true, territories: true })} ${c.animal()}`
      );
      this.invites.push(invite);
    } catch (err) {
      console.log('INVITE ERRR', err);
    }

    this.creatingInvite = false;
  }

  public async revokeInvite(invite: ICampaignInvite) {
    try {
      const toUpdate: ICampaignInvite = {
        ...invite,
        status: CampaignInviteStatus.REVOKED,
      };

      await this.campaignService.updateInvite(toUpdate);

      invite.status = toUpdate.status;
    } catch (err) {
      console.log('REVOKE ERR', err);
    }
  }

  public getInviteLink(id: string): string {
    return `${location.protocol}//${location.host}/invite/${id}`;
  }

  private async loadInvites() {
    this.loading = true;
    try {
      const invites = await this.campaignService.getInvites();
      this.invites = invites;
    } catch (err) {
      console.log('LOAD ERR', err);
    }
    this.loading = false;
  }
}
