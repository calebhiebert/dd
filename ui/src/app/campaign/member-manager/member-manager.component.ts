import { Component, OnInit } from '@angular/core';
import { CampaignService, ICampaignUser } from 'src/app/campaign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'dd-member-manager',
  templateUrl: './member-manager.component.html',
  styleUrls: ['./member-manager.component.css'],
})
export class MemberManagerComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public async remove(member: ICampaignUser) {
    const confirmation = await Swal.fire({
      titleText: 'Are you sure?',
      showCancelButton: true,
    });

    if (confirmation.value === true) {
      this.campaignService.campaign.members = this.campaignService.campaign.members.filter((m) => {
        const match = m.userId === member.userId && m.campaignId === member.campaignId;

        return !match;
      });

      try {
        await this.campaignService.removeMember(member);
      } catch (err) {
        throw err;
      }
    }
  }

  public get members() {
    return this.campaignService.campaign.members;
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
