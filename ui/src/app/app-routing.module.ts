import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign-landing/campaign-landing.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';

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
      {
        path: 'settings',
        component: CampaignSettingsComponent,
      },
      {
        path: 'items/:item_id/edit',
        component: ItemEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
