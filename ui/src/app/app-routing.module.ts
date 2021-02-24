import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CampaignComponent} from './campaign/campaign.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LoggedInGuard} from './logged-in.guard';
import {EntityViewComponent} from './entity/entity-view/entity-view.component';
import {CampaignListComponent} from './campaign/campaign-list/campaign-list.component';
import {CampaignSettingsComponent} from './campaign/campaign-settings/campaign-settings.component';
import {QuestManagerComponent} from './quest/quest-manager/quest-manager.component';
import {CampaignLandingComponent} from './campaign/campaign-landing/campaign-landing.component';
import {RegisterComponent} from './login/register/register.component';
import {InviteComponent} from './invite/invite.component';
import {ActionGuard} from './action.guard';
import {AboutComponent} from './about/about.component';
import {EntityComponent} from './entity/entity.component';
import {QuestFormComponent} from './quest/quest-form/quest-form.component';
import {QuestViewComponent} from './quest/quest-view/quest-view.component';
import {SpawnableManagerComponent} from './entity/spawnable-manager/spawnable-manager.component';
import {UnsavedChangesGuard} from './unsaved-changes.guard';
import {ConceptTypeEditorComponent} from './concept/concept-type-editor/concept-type-editor.component';
import {ConceptManagerComponent} from './concept/concept-manager/concept-manager.component';
import {ConceptEditorComponent} from './concept/concept-editor/concept-editor.component';
import {ConceptViewComponent} from './concept/concept-view/concept-view.component';
import {ConceptHistoryComponent} from './concept/concept-history/concept-history.component';
import {MemberManagerComponent} from './campaign/member-manager/member-manager.component';
import {ConceptEntityManagerComponent} from './concept/concept-entity-manager/concept-entity-manager.component';
import {EntityPresetEditorComponent} from './entity/entity-preset-editor/entity-preset-editor.component';
import {EntityEditorComponent} from './entity/entity-editor/entity-editor.component';
import {LoginPageGuard} from './login-page.guard';
import {EntityPurchaseListComponent} from './entity/entity-purchase-list/entity-purchase-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'invite/:invite_id', component: InviteComponent},
  {path: 'about', component: AboutComponent},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginPageGuard],
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
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
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
        data: {
          suggestable: true,
        },
      },
      {
        path: 'entities',
        component: EntityComponent,
        children: [
          {
            path: ':ent_id',
            component: EntityViewComponent,
            data: {
              suggestable: true,
            },
          },
          {
            path: ':ent_id/purchases',
            component: EntityPurchaseListComponent,
            data: {
              suggestable: true,
            },
          },
          {
            path: ':ent_id/ct/:ct_id',
            component: ConceptEntityManagerComponent,
          },
          {
            path: ':ent_type_id/create',
            component: EntityEditorComponent,
            canDeactivate: [UnsavedChangesGuard],
            data: {
              editing: false,
            },
          },
          {
            path: ':ent_type_id/:ent_id/edit',
            component: EntityEditorComponent,
            canDeactivate: [UnsavedChangesGuard],
            data: {
              editing: true,
            },
          },
        ],
      },
      {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
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
        data: {
          suggestable: true,
        },
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
        data: {
          suggestable: true,
        },
      },
      {
        path: 'concepts/:ct_id/:c_id/history',
        component: ConceptHistoryComponent,
        data: {
          suggestable: true,
        },
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
        },
      },
      {
        path: 'spawnables',
        component: SpawnableManagerComponent,
      },
      {
        path: 'settings',
        component: CampaignSettingsComponent,
        canDeactivate: [UnsavedChangesGuard],
        data: {
          editing: true,
        },
      },
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      },
      {
        path: 'quests',
        component: QuestManagerComponent,
        data: {
          suggestable: true,
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
          suggestable: true,
        },
      },
      {
        path: 'maps',
        loadChildren: () => import('./mapping/mapping.module').then(m => m.MappingModule),
      },
      {
        path: 'articles',
        loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule),
      },
      {
        path: 'members',
        component: MemberManagerComponent,
      },
      {
        path: 'sketchpad',
        loadChildren: () => import('./sketchpad/sketchpad.module').then(m => m.SketchpadModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
