import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign-landing/campaign-landing.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { LoginPageGuard } from './login-page.guard';
import { EntityTypeSelectorComponent } from './entity-form/entity-type-selector/entity-type-selector.component';
import { EntityCreationFormComponent } from './entity-form/entity-creation-form/entity-creation-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  { path: 'callback', component: LoginComponent },
  {
    path: 'campaigns/list',
    component: CampaignListComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  {
    path: 'campaign/manage/:id',
    component: CampaignComponent,
    canActivate: [LoggedInGuard],
    children: [
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
      {
        path: 'entities/:ent_id/edit',
        component: EntityFormComponent,
      },
    ],
  },
  {
    path: 'campaigns/:id',
    component: CampaignComponent,
    canActivate: [LoggedInGuard],
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
        path: 'entities/:ent_id/edit',
        component: EntityCreationFormComponent,
      },
      {
        path: 'entities/selecttype',
        component: EntityTypeSelectorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
