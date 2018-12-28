import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign-landing/campaign-landing.component';
import { CampaignComponent } from './campaign.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CampaignListComponent, CampaignLandingComponent, CampaignComponent],
  exports: [CampaignListComponent],
})
export class CampaignModule {}
