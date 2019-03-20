import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { RegisterComponent } from './login/register/register.component';
import { InviteComponent } from './invite/invite.component';
import { ActionGuard } from './action.guard';
import { AboutComponent } from './about/about.component';
import { EntityComponent } from './entity/entity.component';
import { QuestFormComponent } from './quest/quest-form/quest-form.component';
import { QuestViewComponent } from './quest/quest-view/quest-view.component';
import { SpawnableManagerComponent } from './entity/spawnable-manager/spawnable-manager.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';
import { ConceptTypeEditorComponent } from './concept/concept-type-editor/concept-type-editor.component';
import { ConceptManagerComponent } from './concept/concept-manager/concept-manager.component';
import { ConceptEditorComponent } from './concept/concept-editor/concept-editor.component';
import { ConceptViewComponent } from './concept/concept-view/concept-view.component';
import { ConceptHistoryComponent } from './concept/concept-history/concept-history.component';
import { MemberManagerComponent } from './campaign/member-manager/member-manager.component';
import { ConceptEntityManagerComponent } from './concept/concept-entity-manager/concept-entity-manager.component';
import { EntityPresetEditorComponent } from './entity/entity-preset-editor/entity-preset-editor.component';
import { EntityEditorComponent } from './entity/entity-editor/entity-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'invite/:invite_id', component: InviteComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'callback',
    component: LoginComponent,
  },
  {
    path: 'account',
    canActivate: [LoggedInGuard, ActionGuard],
    loadChildren: './users/users.module#UsersModule',
    data: {
      breadcrumb: 'Account',
    },
  },
  {
    path: 'campaigns/list',
    component: CampaignListComponent,
    canActivate: [LoggedInGuard, ActionGuard],
    data: {
      breadcrumb: 'Campaigns',
    },
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
        children: [
          {
            path: ':ent_id',
            component: EntityViewComponent,
            data: {
              breadcrumb: 'Entity',
            },
          },
          {
            path: ':ent_id/ct/:ct_id',
            component: ConceptEntityManagerComponent,
            data: {
              breadcrumb: 'CE',
            },
          },
          {
            path: ':ent_type_id/create',
            component: EntityEditorComponent,
            canDeactivate: [UnsavedChangesGuard],
            data: {
              editing: false,
              breadcrumb: 'Create Entity',
            },
          },
          {
            path: ':ent_type_id/:ent_id/edit',
            component: EntityEditorComponent,
            canDeactivate: [UnsavedChangesGuard],
            data: {
              editing: true,
              breadcrumb: 'Edit Entity',
            },
          },
        ],
      },
      {
        path: 'concepttypes/create',
        component: ConceptTypeEditorComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: false,
        },
      },
      {
        path: 'concepttypes/:ct_id/edit',
        component: ConceptTypeEditorComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: true,
        },
      },
      {
        path: 'concepts/:ct_id/manage',
        component: ConceptManagerComponent,
      },
      {
        path: 'concepts/:ct_id/create',
        component: ConceptEditorComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'concepts/:ct_id/:c_id/edit',
        component: ConceptEditorComponent,
        data: {
          editing: true,
        },
      },
      {
        path: 'concepts/:ct_id/:c_id/view',
        component: ConceptViewComponent,
      },
      {
        path: 'concepts/:ct_id/:c_id/history',
        component: ConceptHistoryComponent,
      },
      {
        path: 'entitytypes/create',
        component: EntityPresetEditorComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'entitytypes/:ent_id/edit',
        component: EntityPresetEditorComponent,
        data: {
          editing: true,
          breadcrumb: 'Edit Preset',
        },
      },
      {
        path: 'spawnables',
        component: SpawnableManagerComponent,
        data: {
          breadcrumb: 'Spawnables',
        },
      },
      {
        path: 'settings',
        component: CampaignSettingsComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: true,
          breadcrumb: 'Settings',
        },
      },
      {
        path: 'overview',
        loadChildren: './overview/overview.module#OverviewModule',
      },
      {
        path: 'quests',
        component: QuestManagerComponent,
        data: {
          breadcrumb: 'Quests',
        },
      },
      {
        path: 'quests/create',
        component: QuestFormComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: false,
        },
      },
      {
        path: 'quests/:q_id/edit',
        component: QuestFormComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: true,
        },
      },
      {
        path: 'quests/:q_id',
        component: QuestViewComponent,
        data: {
          breadcrumb: 'Quest View',
        },
      },
      {
        path: 'maps',
        loadChildren: './mapping/mapping.module#MappingModule',
      },
      {
        path: 'articles',
        loadChildren: './articles/articles.module#ArticlesModule',
      },
      {
        path: 'members',
        component: MemberManagerComponent,
        data: {
          breadcrumb: 'Members',
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
