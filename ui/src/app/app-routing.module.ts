import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { EntityFormComponent } from './entity/entity-form/entity-form.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { EntityCreationFormComponent } from './entity/entity-form/entity-creation-form/entity-creation-form.component';
import { EntityTypeSelectorComponent } from './entity/entity-form/entity-type-selector/entity-type-selector.component';
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
import { OverviewComponent } from './session/overview/overview.component';
import { MapComponent } from './map/map.component';
import { MapUploadComponent } from './map/map-upload/map-upload.component';
import { MapManagerComponent } from './map/map-manager/map-manager.component';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleViewComponent } from './article/article-view/article-view.component';
import { ArticleManagerComponent } from './article/article-manager/article-manager.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';
import { ConceptTypeEditorComponent } from './concept/concept-type-editor/concept-type-editor.component';
import { ConceptManagerComponent } from './concept/concept-manager/concept-manager.component';
import { ConceptEditorComponent } from './concept/concept-editor/concept-editor.component';
import { ConceptViewComponent } from './concept/concept-view/concept-view.component';

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
    component: AccountSettingsComponent,
    canActivate: [LoggedInGuard, ActionGuard],
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
            path: 'selecttype',
            component: EntityTypeSelectorComponent,
          },
          {
            path: ':ent_id',
            component: EntityViewComponent,
            data: {
              breadcrumb: 'Entity',
            },
          },
          {
            path: ':ent_type_id/create',
            component: EntityCreationFormComponent,
            canDeactivate: [UnsavedChangesGuard],
            data: {
              editing: false,
              breadcrumb: 'Create Entity',
            },
          },
          {
            path: ':ent_id/edit',
            component: EntityCreationFormComponent,
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
        path: 'entitytypes/create',
        component: EntityFormComponent,
        data: {
          editing: false,
        },
      },
      {
        path: 'entitytypes/:ent_id/edit',
        component: EntityFormComponent,
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
        component: OverviewComponent,
        data: {
          breadcrumb: 'Overview',
          footer: false,
        },
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
        component: MapManagerComponent,
        data: {
          breadcrumb: 'Maps',
        },
      },
      {
        path: 'maps/upload',
        component: MapUploadComponent,
        data: {
          breadcrumb: 'Upload Map',
        },
      },
      {
        path: 'maps/:m_id',
        component: MapComponent,
        data: {
          breadcrumb: 'Map View',
        },
      },
      {
        path: 'articles',
        component: ArticleManagerComponent,
        data: {
          breadcrumb: 'Articles',
        },
      },
      {
        path: 'articles/create',
        component: ArticleEditorComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: false,
          breadcrumb: 'Create Article',
        },
      },
      {
        path: 'articles/:a_id/edit',
        component: ArticleEditorComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: true,
          breadcrumb: 'Edit Article',
        },
      },
      {
        path: 'articles/:a_id',
        component: ArticleViewComponent,
        data: {
          breadcrumb: 'Article View',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
