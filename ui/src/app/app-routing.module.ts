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
import { ItemViewComponent } from './items/item-view/item-view.component';
import { AboutComponent } from './about/about.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EntityComponent } from './entity/entity.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'invite/:invite_id', component: InviteComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { showLoginLoading: false },
    canActivate: [LoginPageGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { showLoginLoading: false },
  },
  {
    path: 'callback',
    component: LoginComponent,
    data: {
      showLoginLoading: false,
    },
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [LoggedInGuard, ActionGuard],
  },
  {
    path: 'campaigns/list',
    component: CampaignListComponent,
    canActivate: [LoggedInGuard, ActionGuard],
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
        path: 'settings',
        component: CampaignSettingsComponent,
        data: {
          editing: true,
        },
      },
      {
        path: 'items/create',
        component: ItemEditComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'items/:item_id/edit',
        component: ItemEditComponent,
        data: {
          editing: true,
        },
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
    data: {
      breadcrumb: 'Campaign',
    },
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
        path: 'entities',
        component: EntityComponent,
        data: {
          breadcrumb: 'Entity',
        },
        children: [
          {
            path: 'selecttype',
            component: EntityTypeSelectorComponent,
          },
          {
            path: ':ent_id',
            component: EntityViewComponent,
            data: {
              breadcrumb: 'View',
            },
          },
          {
            path: ':ent_type_id/create',
            component: EntityCreationFormComponent,
            data: {
              editing: false,
              breadcrumb: 'Create',
            },
          },
          {
            path: ':ent_id/edit',
            component: EntityCreationFormComponent,
            data: {
              editing: true,
              breadcrumb: 'Edit',
            },
          },
        ],
      },
      {
        path: 'quests',
        component: QuestManagerComponent,
      },
      {
        path: 'items',
        component: ItemManagerComponent,
        data: {
          breadcrumb: 'Items',
        },
      },
      {
        path: 'items/:item_id',
        component: ItemViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
