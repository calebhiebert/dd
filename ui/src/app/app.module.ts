/* tslint:disable:max-line-length */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavComponent } from './nav/nav.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { ExperienceTableEditorComponent } from './campaign/campaign-settings/experience-table-editor/experience-table-editor.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { QuestFormComponent } from './quest/quest-form/quest-form.component';
import { RegisterComponent } from './login/register/register.component';
import { CampaignFormComponent } from './campaign/campaign-form/campaign-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { InviteManagerComponent } from './campaign/invite-manager/invite-manager.component';
import { InviteComponent } from './invite/invite.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { EntityEditorComponent } from './entity/entity-editor/entity-editor.component';
import { AboutComponent } from './about/about.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EntityComponent } from './entity/entity.component';
import { EntityAttributeEditorModalComponent } from './entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { PhraserComponent } from './phraser/phraser.component';
import { EditableEntitySelectorComponent } from './entity/editable-entity-selector/editable-entity-selector.component';
import { HealthDisplayComponent } from './entity/health-display/health-display.component';
import { QuestViewComponent } from './quest/quest-view/quest-view.component';
import { QuickViewComponent } from './quest/quick-view/quick-view.component';
import { SpawnableManagerComponent } from './entity/spawnable-manager/spawnable-manager.component';
import { OverviewComponent } from './session/overview/overview.component';
import { OverviewEntityComponent } from './session/overview-entity/overview-entity.component';
import { OverviewToolbarComponent } from './session/overview-toolbar/overview-toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { SentryErrorHandler } from './sentry.errorhandler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NumberQuickSelectComponent } from './number-quick-select/number-quick-select.component';
import { SpawnableListItemComponent } from './entity/spawnable-list-item/spawnable-list-item.component';
import { AttributeRowViewComponent } from './entity/entity-view/attribute-row-view/attribute-row-view.component';
import { AttributeTableViewComponent } from './entity/entity-view/attribute-table-view/attribute-table-view.component';
import { EntityViewMiniComponent } from './entity/entity-view-mini/entity-view-mini.component';
import { QuickDiceComponent } from './quick-dice/quick-dice.component';
import { CurrencyMapEditorComponent } from './campaign/campaign-settings/currency-map-editor/currency-map-editor.component';
import { ExporterComponent } from './campaign/campaign-settings/exporter/exporter.component';
import { ConceptEditorComponent } from './concept/concept-editor/concept-editor.component';
import { ConceptTypeEditorComponent } from './concept/concept-type-editor/concept-type-editor.component';
import { ConceptManagerComponent } from './concept/concept-manager/concept-manager.component';
import { ConceptListItemComponent } from './concept/concept-list-item/concept-list-item.component';
import { ConceptViewComponent } from './concept/concept-view/concept-view.component';
import { ConceptEntityManagerComponent } from './concept/concept-entity-manager/concept-entity-manager.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ConceptHistoryComponent } from './concept/concept-history/concept-history.component';
import { MemberManagerComponent } from './campaign/member-manager/member-manager.component';
import { LongPressDirective } from './long-press.directive';
import { LoginStatusComponent } from './login/login-status/login-status.component';
import { EntityPresetEditorComponent } from './entity/entity-preset-editor/entity-preset-editor.component';
import { ConceptEntityManagerListItemComponent } from './concept/concept-entity-manager-list-item/concept-entity-manager-list-item.component';
import { MappingModule } from './mapping/mapping.module';
import { CustomControlsModule } from './custom-controls/custom-controls.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { CustomViewsModule } from './custom-views/custom-views.module';
/* tslint:enable:max-line-length */

@NgModule({
  entryComponents: [EntityViewMiniComponent],
  declarations: [
    AppComponent,
    NavComponent,
    CampaignComponent,
    CampaignListComponent,
    CampaignLandingComponent,
    CampaignSettingsComponent,
    EntityEditorComponent,
    ConfirmationModalComponent,
    LoginComponent,
    HomeComponent,
    ExperienceTableEditorComponent,
    QuestManagerComponent,
    EntityViewComponent,
    EntityAttributeEditorModalComponent,
    QuestFormComponent,
    RegisterComponent,
    CampaignFormComponent,
    InviteManagerComponent,
    InviteComponent,
    NavSidebarComponent,
    AboutComponent,
    NotificationsComponent,
    EntityComponent,
    PhraserComponent,
    EditableEntitySelectorComponent,
    HealthDisplayComponent,
    QuestViewComponent,
    QuickViewComponent,
    SpawnableManagerComponent,
    OverviewComponent,
    OverviewEntityComponent,
    OverviewToolbarComponent,
    FooterComponent,
    NumberQuickSelectComponent,
    SpawnableListItemComponent,
    AttributeTableViewComponent,
    EntityViewMiniComponent,
    QuickDiceComponent,
    CurrencyMapEditorComponent,
    ExporterComponent,
    AttributeRowViewComponent,
    ConceptEditorComponent,
    ConceptTypeEditorComponent,
    ConceptManagerComponent,
    ConceptListItemComponent,
    ConceptViewComponent,
    ConceptEntityManagerComponent,
    ConceptHistoryComponent,
    MemberManagerComponent,
    LongPressDirective,
    LoginStatusComponent,
    EntityPresetEditorComponent,
    ConceptEntityManagerListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    TruncateModule,
    HttpClientModule,
    NotesModule,
    DragDropModule,
    MappingModule,
    CustomControlsModule,
    CustomViewsModule,
    UsersModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [EditableEntitySelectorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
