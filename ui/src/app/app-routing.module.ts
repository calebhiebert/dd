import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';

const routes: Routes = [
  { path: 'campaigns/list', component: CampaignListComponent },
  {
    path: 'campaigns/:id',
    component: CampaignComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing',
      },
      {
        path: 'landing',
        component: CampaignLandingComponent,
      },
      {
        path: 'items',
        component: ItemManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
