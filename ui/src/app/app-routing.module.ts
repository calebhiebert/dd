import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { LoginPageGuard } from './login-page.guard';
import { EntityFormComponent } from './entity/entity-form/entity-form.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { EntityCreationFormComponent } from './entity/entity-form/entity-creation-form/entity-creation-form.component';
import { EntityTypeSelectorComponent } from './entity/entity-form/entity-type-selector/entity-type-selector.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { ItemManagerComponent } from './items/item-manager/item-manager.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { RegisterComponent } from './login/register/register.component';
import { InviteComponent } from './invite/invite.component';
import { ActionGuard } from './action.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'invite/:invite_id', component: InviteComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'callback', component: LoginComponent },
  {
    path: 'campaigns/list',
    component: CampaignListComponent,
    canActivate: [LoggedInGuard, ActionGuard, ActionGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard, ActionGuard],
  },
  {
    path: 'campaigns/create',
    component: CampaignSettingsComponent,
    canActivate: [LoggedInGuard, ActionGuard],
    data: {
      editing: false,
    },
  },
  {
    path: 'campaign/manage/:id',
    component: CampaignComponent,
    canActivate: [LoggedInGuard, ActionGuard],
    children: [
      {
        path: 'items',
        component: ItemManagerComponent,
      },
      {
        path: 'settings',
        component: CampaignSettingsComponent,
        data: {
          editing: true,
        },
      },
      {
        path: 'quests',
        component: QuestManagerComponent,
      },
      {
        path: 'items/:item_id/edit',
        component: ItemEditComponent,
      },
      {
        path: 'entities/create',
        component: EntityFormComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'entities/:ent_id/edit',
        component: EntityFormComponent,
        data: {
          editing: true,
        },
      },
    ],
  },
  {
    path: 'campaigns/:id',
    component: CampaignComponent,
    canActivate: [LoggedInGuard, ActionGuard],
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
        path: 'entities/selecttype',
        component: EntityTypeSelectorComponent,
      },
      {
        path: 'entities/:ent_id',
        component: EntityViewComponent,
      },
      {
        path: 'entities/:ent_type_id/create',
        component: EntityCreationFormComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'entities/:ent_id/edit',
        component: EntityCreationFormComponent,
        data: {
          editing: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
